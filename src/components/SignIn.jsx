import React, { useState } from 'react';
import axios from 'axios';
import './styles/signUp.css';

import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', {
        email,
        password,
      });
  
      // Save the token and user data
      const userId = response.data.user.id; // Get the user ID here
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
  
      // Redirect to the home page (or another page)
      navigate(`/Mine/${userId}`); // Pass userId here
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };
  

  return (
    <form onSubmit={handleLogin}>

    <div className="container">
    <div className="header">
      <div className="text">Sign In</div>
      <div className="underline"></div>
    </div>
    <div className="inputs">
        <div className="input">
          <img src="./img/icons8-email-30.png" alt="email icon" />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
          />
        </div>
        <div className="input">
          <img id="password" src="./img/icons8-password-50.png" alt="password icon" />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'

          />
        </div>
        <div className="submit-container">
        <button type="submit" className="submit">Login</button>
        </div>
       <div className="forgot-password">
       Not having an account? <Link to="/signUp" className="signup-link">Sign Up here</Link>
       </div>
    </div>
    </div>
    </form>

  );
};

export default LoginForm;
