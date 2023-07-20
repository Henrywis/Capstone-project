
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import userRoutes from './routes/users.js'
import { sequelize } from './database.js';
import { User, Post, Application } from './models/index.js';
import SequelizeStoreInit from 'connect-session-sequelize';
import fetch from 'node-fetch';
import { seedDatabase } from './seed.js';
import uploadRoute from "./routes/upload.js";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  //react app address

  credentials: true
}));


// Middleware for parsing JSON bodies from HTTP requests
app.use(express.static("uploads"));
app.use(express.json()); 
app.use(morgan("dev"))

const SequelizeStore = SequelizeStoreInit(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize
});

// Session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: false,
      secure: false,
      expires: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000))
      // 1 year in milliseconds
    }
  })
);
sessionStore.sync();
//to save session particular to a user
app.use(userRoutes);

app.use("/api/upload", uploadRoute);


// Route to get all posts, with associated users
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: 'user' }],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Route for the jobs
app.post('/posts', async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Retrieve the current user from the session
    const currentUser = req.session.user;

    // Extract the necessary information from the request body
    const { title, url, company, postDate, slug } = req.body;

    // Perform any validation or additional logic as required

    // Create the post with the current user ID
    const post = await Post.create({
      title,
      url,
      company,
      postDate,
      slug,
      userId: currentUser.id
    });

    const postWithUser = await Post.findOne({
      where: { id: post.slug },
      //post.id is automatically created in the database
      include: [{ model: User, as: 'user' }]
    });

    res.status(201).json(postWithUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new Room based on job details
app.post('/rooms', async (req, res) => {
  try {
    // Again, check if user is logged in
    if (!req.session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Retrieve the current user from the session
    const currentUser = req.session.user;

    // Extract the necessary information from the request body
    // I will be using these props because I dont have a job/post id in
    // the json response.
    const { title, url, company, postDate } = req.body;

    // Perform any validation or additional logic as required

    // Create the room with the current user ID and job details
    // these are more particular props besides job  id.
    const room = await Application.create({
      userId: currentUser.id,
      jobTitle: title,
      jobUrl: url,
      company: company,
      postDate: postDate,
    });

    // Send the room details as the response
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update the route to fetch a single post in app.js to
// include the "start application" functionality

// Route to fetch a single post and start an application
app.post('/posts/:postId/apply', async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Retrieve the current user from the session
    const currentUser = req.session.user;

    // Extract the postId from the request parameters
    const { postId } = req.params;

    // Find the post in the database by postId
    const post = await Post.findByPk(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Create the application with the current user ID and post details
    const application = await Application.create({
      userId: currentUser.id,
      jobId: post.slug,
      //my post has no id as a param from API
      //testing poat.slug
      jobTitle: post.title,
      jobUrl: post.url,
      company: post.company,
      postDate: post.postDate
    });

    // Send the application details as the response
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Add a new POST route handler for /seed that calls the 
//seedDatabase function with the category received from the request query parameters.

app.post('/seed', async (req, res) => {
  try {
    const { category } = req.query;
    console.log('Received POST request to /seed with category:', category);
    await seedDatabase(category.toLowerCase());
    // Call the seedDatabase function with the category

    res.status(200).json({ message: 'Seeding completed successfully.' });
  } catch (error) {
    console.error('Error seeding data:', error);
    res.status(500).json({ error: 'An error occurred during seeding.' });
  }
});


sequelize.sync({ alter: true })
  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });