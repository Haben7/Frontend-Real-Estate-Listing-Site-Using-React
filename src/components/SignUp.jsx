import React, { useState } from 'react';
import axios from 'axios';
import './styles/signUp.css';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/register', formData);
      console.log('User registered:', response.data);
      
      // Assuming the user ID is returned in response.data.user._id
      const userId = response.data.user.id;

      // Store the user data in localStorage (optional)
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect the user to their personalized page
      navigate(`/Mine/${userId}`); // Pass userId here

    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src="./img/icons8-person-24.png" alt="person icon" />
            <input
              type="text"
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              placeholder="User Name"
              required
            />
          </div>

          <div className="input">
            <img src="./img/icons8-email-30.png" alt="email icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          <div className="input">
            <img id="password" src="./img/icons8-password-50.png" alt="password icon" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange} 
              placeholder="Password"
              required
            />
          </div>
        </div>

        <div className="submit-container">
          <button className="submit" type="submit">Sign Up</button> 
        </div>

        <div className="forgot-passwordd">
          Already have an account? <Link to="/signIn" className="login-link">Login here</Link>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
