import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupForm.css';
import logoImage from '../../assets/logo-png.png';
import { UserContext } from '../../UserContext.js';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(''); // 'Student' or 'Not a student'
  const [raceEthnicity, setRaceEthnicity] = useState([]);
  const [genderSexuality, setGenderSexuality] = useState([]);
  const [name, setName] = useState('');

  const { updateUser } = useContext(UserContext);
  //eliminates redundant passing of user prop into login, main, signup & anywhere theyre called
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log('Form Data:', {
      username,
      email,
      password,
      status,
      raceEthnicity,
      genderSexuality,
      name,
    });
    
    e.preventDefault();

    // validation check for race/ethnicity and gender/sexuality checkboxes
    if (raceEthnicity.length === 0 && genderSexuality.length === 0) {
      alert('Please select at least one option for race/ethnicity and gender/sexuality.');
      return;
    }

    // Validate other form fields here...
    if (!username && !email && !password && !status && !name) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      // Make the signup API request
      const response = await fetch(`http://localhost:3000/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, status, raceEthnicity, genderSexuality, name }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const loggedInUser = data.user;

        console.log('Signup successful');

        // Reset form fields
        setUsername('');
        setEmail('');
        setPassword('');
        setStatus('');
        setRaceEthnicity([]);
        setGenderSexuality([]);
        setName('');

        // Update the user context
        updateUser(loggedInUser);

        // Navigate to the home page after successful login
        navigate('/');
      } else {
        // Handle signup failure case
        alert('Signup failed');
      }
    } catch (error) {
      // Handle any network or API request errors
      alert('Signup failed: ' + error);
    }
  };

  const handleRaceEthnicityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRaceEthnicity([...raceEthnicity, value]);
    } else {
      setRaceEthnicity(raceEthnicity.filter((option) => option !== value));
    }
  };

  const handleGenderSexualityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setGenderSexuality([...genderSexuality, value]);
    } else {
      setGenderSexuality(genderSexuality.filter((option) => option !== value));
    }
  };

  return (
    <div className="signup-form-container">
      <div className="logo-overlay" style={{ backgroundImage: `url(${logoImage})` }}></div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">-- Select Status --</option>
            <option value="Student">Student</option>
            <option value="Not a student">Not a student</option>
          </select>
        </div>
        <div className="form-label-container">
          <div className="form-label">How do you identify? (please check all that apply)</div>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="Black/Afro-Caribbean/Afro-Latinx"
                onChange={handleRaceEthnicityChange}
              />{' '}
              Black/Afro-Caribbean/Afro-Latinx
            </label>
            <label>
              <input
                type="checkbox"
                value="Hispanic/Latinx"
                onChange={handleRaceEthnicityChange}
              />{' '}
              Hispanic/Latinx
            </label>
            <label>
              <input
                type="checkbox"
                value="Asian/Asian-American"
                onChange={handleRaceEthnicityChange}
              />{' '}
              Asian/Asian-American
            </label>
            <label>
              <input
                type="checkbox"
                value="Native American/Alaska Native"
                onChange={handleRaceEthnicityChange}
              />{' '}
              Native American/Alaska Native
            </label>
          </div>
        </div>
        <div className="form-label-container">
          <div className="form-label">How do you identify? (please check all that apply)</div>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" value="Cisgender Man" onChange={handleGenderSexualityChange} />{' '}
              Cisgender Man
            </label>
            <label>
              <input type="checkbox" value="Cisgender Woman" onChange={handleGenderSexualityChange} />{' '}
              Cisgender Woman
            </label>
            <label>
              <input type="checkbox" value="Transgender Man" onChange={handleGenderSexualityChange} />{' '}
              Transgender Man
            </label>
            <label>
              <input type="checkbox" value="Transgender Woman" onChange={handleGenderSexualityChange} />{' '}
              Transgender Woman
            </label>
            <label>
              <input type="checkbox" value="Gender non-conforming/Non-Binary" onChange={handleGenderSexualityChange} />{' '}
              Gender non-conforming/Non-Binary
            </label>
            <label>
              <input type="checkbox" value="I identify as LGBTQ+" onChange={handleGenderSexualityChange} />{' '}
              I identify as LGBTQ+
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <p>
          Have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};
export default SignupForm;

