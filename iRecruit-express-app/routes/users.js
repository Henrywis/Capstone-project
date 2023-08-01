import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { Op } from 'sequelize';

const router = express.Router();

// Route for user registration
router.post('/users', async (req, res) => {
  const { username, email, password, status, raceEthnicity, genderSexuality, name } = req.body;

  try {
    //For new user reg to have unique username and email Check if username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // if neither of the new user's username nor email exists, get a password (encrypted)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ username, email, password: hashedPassword, status, raceEthnicity, genderSexuality, name });

    // Set the user in the session
    req.session.user = newUser;

    // Return the user data in the response
    res.json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for user login
router.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  //could be email, password too

  try {
    // we want to find the username to see if we have it in our username data
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the password (with password typed by the user, also in encryted format)
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // If log in successful, Set the user in the session
    req.session.user = user;

    // Return the user data in the response
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

