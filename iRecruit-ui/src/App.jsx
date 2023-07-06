import { useState, useEffect } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    userId: '',
  });
  
  //Here I would fetch the API and set the response
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3000/posts');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  //This takes care of filling the form so that the values entered is consistently updated while the form is filled
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  //This is an event handler for submission, making a POST to the server
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const newPost = await response.json();
    setPosts([newPost, ...posts]);
  };


  return (
    <>
      <div className='app'>
        <form className="new-job-form" onSubmit={handleSubmit}>
          <input 
            type="text"
            name='title'
            placeholder='Title'
            value={form.title}
            onChange={handleChange} 
          />
          <textarea 
            name="content" 
            placeholder="Content" 
            value={form.content} 
            onChange={handleChange}
          />
          <input 
            type="text" 
            name='userId'
            placeholder='User Id'
            value={form.userId}
            onChange={handleChange}
          />
          <button type='submit'>Submit</button>
        </form>
        <div className='jobs-or-posts-container'>
          {posts.map((post) => (
            <div className='post' key={post.id}>
              <h2>{post.title}</h2>
              <h4>By {post.user.username} at {new Date(post.createdAt).toLocaleString()}</h4>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
