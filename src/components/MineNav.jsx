import React, { useState } from 'react';
import { Navbar, Container, Form, Button, Dropdown, Modal } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import MineSearch from './MineSearch';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';

function MineNav() {
  const { userId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://your-backend-url/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
      setModalIsOpen(false);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://your-backend-url/register', { name, email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
      setModalIsOpen(false);
    } catch (error) {
      console.error('Sign-up failed:', error);
    }
  };

  return (
    <Container fluid>
      <Navbar bg="white" variant="dark" expand="lg" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '20px' }}>
        <Navbar.Brand href="/" style={{ color: '#9ba7a5', marginTop: '-6%', marginLeft: '20px' }}>
        <img src="../public/img/icons8-delete-64.png" alt="person icon" />
        <h3>Real Estate</h3>
        </Navbar.Brand>

        <MineSearch />

        {/* User Dropdown */}
        <Dropdown style={{ marginRight: '30px', cursor: 'pointer', marginTop: '-6%', marginLeft: '5%' }}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <FaUser size={24} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setShowProfileModal(true)}>Account</Dropdown.Item>
            <Dropdown.Item href="/">Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Profile Modal */}
        <Modal
          show={showProfileModal}
          onHide={() => setShowProfileModal(false)}
          style={{ height: '100%' ,width:'100%'}}
          dialogClassName="custom-modal" // Applying a custom class for styling
        >
          <Modal.Header closeButton>
            <Modal.Title>User Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>User Name:</strong> {user ? user.name : 'Guest'}</p>
            <p><strong>Email:</strong> {user ? user.email : 'Guest'}</p>
            <Button variant="secondary" className="mt-2">
              View Saved Houses
            </Button>
            <br /><br />
            <Button variant="primary" onClick={() => setShowUpdateModal(true)}>
              Update Profile
            </Button>
            <br /><br />
            <Button variant="danger" className="mt-2">
              Delete Account
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Update Profile Modal */}
        <Modal
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          dialogClassName="custom-modal" // Applying a custom class for styling
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="updateProfileForm">
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter new username" />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter new email" />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter new password" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
              Close
            </Button>
            <Button variant="primary" id="saveProfileChanges">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Navbar>
    </Container>
  );
}

export default MineNav;
