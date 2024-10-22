import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { FaUser, FaSearch } from 'react-icons/fa';
import SearchFilter from './SearchFilter';
import Modal from 'react-modal'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        padding: '20px',
    },
};
function NavBar() {
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility

  // Function to open the modal
  const openModal = () => {
      setModalIsOpen(true);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Function to close the modal
  const closeModal = () => {
      setModalIsOpen(false);
  };
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const navigate = useNavigate();



  const handleLoginSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      try {
          const response = await axios.post('http://your-backend-url/login', { email, password });
          // Assuming the backend sends back user data and token
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/dashboard'); // Redirect to dashboard or desired page
          closeModal();
      } catch (error) {
          console.error('Login failed:', error);
          // Handle error (e.g., show a message)
      }
  };

  const handleSignUpSubmit = async (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      try {
          const response = await axios.post('http://your-backend-url/register', { name, email, password });
          // Handle successful registration (e.g., automatically log in the user)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/dashboard'); // Redirect to dashboard or desired page
          closeModal();
      } catch (error) {
          console.error('Sign-up failed:', error);
          // Handle error (e.g., show a message)
      }
  };
  return (
    <Container fluid> 
    <Navbar bg="white" variant="dark" expand="lg" style={{borderBottom:' 1px solid #e0e0e0',    paddingBottom:'30px'}}> {/* Added expand="lg" for responsiveness */}
      {/* Changed to Container fluid */}
        <Navbar.Brand href="/" style={{ color: 'black', marginTop:'20px', marginLeft:'0px'}}>
        <img src="../public/img/images-removebg-preview (5).png" alt="person icon" style={{width:'60px'}}/>

          Real Estate
        </Navbar.Brand>

<SearchFilter />




               <div class="dropdown" size={14}
                style={{
                    marginRight: '30px',
                    cursor: 'pointer',
                    marginTop: '20px',
                    marginLeft: '5%',
                }}>
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
<FaUser size={24}
               />  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu2" style={{
                    cursor: 'pointer',
                    borderColor:'black',
                }}>
    <li><a href="./SignUp"class="dropdown-item" type="button">Sign Up</a></li>
    <li><a href="./SignIn"class="dropdown-item" type="button">Log In</a></li>
  </ul>
</div>



     </Navbar>
    </Container>
  );
}

export default NavBar;

              