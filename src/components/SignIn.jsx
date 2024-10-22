import React, { useState } from 'react';
import './styles/signUp.css';
import { Link, useNavigate} from 'react-router-dom'; 
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
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
      const response = await axios.post('http://localhost:8000/api/user/login', formData);
      localStorage.setItem('authToken', response.data.token);  // Save token to localStorage
      console.log('User logged in:', response.data);

      const userId = response.data.user.id;

      // Redirect to user dashboard or home
      navigate(`/Mine/${userId}`); // Pass userId here
      
    } catch (error) {
      console.error('Login error:', error.response.data);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign In</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
      <form onSubmit={handleSubmit}>

        <div className="input">
          <img src="./img/icons8-person-24.png" alt="person icon" />

         <input 
         type="email" 
         name="email" 
         value={formData.email} 
         onChange={handleChange} 
         placeholder="Email" 
         required />

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
        </form>
      </div>

      <div className="submit-container">
        <button className="submit"onClick={handleSubmit} >Login</button>
      </div>
      <div className="forgot-password">
        Lost Password? <a href="./ForgotPassword"><span>Click here</span></a>
      </div>

      <div className="forgot-password">
        Not having an account? <Link to="/signUp" className="signup-link">Sign Up here</Link>
      </div>
    </div>
  );
}

export default Login;
