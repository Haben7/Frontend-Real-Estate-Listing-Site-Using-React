import React, { useState } from 'react';
import { Button,Modal} from 'react-bootstrap';
import { useNavigate, useParams, Link} from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

function MineNav() {
  const { userId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [username, setUsername] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
      });
  
      // Log the response status and text for debugging
      console.log('Response Status:', response.status);
      const responseText = await response.text();
      console.log('Response Text:', responseText);
  
      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format: Expected JSON');
      }
  
      const data = JSON.parse(responseText);
  
      if (!response.ok) {
        console.error('Error response:', data);
        throw new Error(data.message || 'Profile update failed');
      }
  
      // Update user information in local storage
      localStorage.setItem('user', JSON.stringify(data.user));
      setShowProfileModal(false);
      console.log('Profile updated:', data);
    } catch (error) {
      console.error('Profile update failed:', error.message);
    }
  };
  

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Delete account error:', errorData);
          throw new Error(errorData.message || 'Delete account failed');
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/'); // Redirect to home or login page
      } catch (error) {
        console.error('Delete account failed:', error.message);
      }
    }
  };
  window.addEventListener('scroll', function() {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) { // Adjust 50 to the scroll position you want
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
    return (
        <header >
        <nav className=" border-gray-200  dark:bg-white ">
            <div className="flex flex-wrap justify-between items-center mx-auto " id='nav'>
            <a href="/Mine" className="flex items-center">
            <img 
  src="../public/images-removebg-preview (4).png" 
  alt="Placeholder Image" 
  style={{ width: '90px', height: 'auto' }} 
/>
                <h3 id='h3'><span id='R'>R</span>eal <span id='R'>E</span>state</h3>
                </a>
                <div className="flex items-center lg:order-2">
                  
                    <a className="text-white dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-white" onClick={() => setShowProfileModal(true)}>Account</a>
                    <a href="/" className="text-white  bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" id='back'>Logout
                    </a>
                    <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                        <ScrollLink to="hero" smooth={true} duration={10} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 text-white cursor-pointer">
                                        Home                            
                                        </ScrollLink>
                          </li>
                        <li>
                              <ScrollLink to="prop" smooth={true} duration={10} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 text-white cursor-pointer">
                              Properties         
                             </ScrollLink>
                          </li>
                          {/* <li>
                              <ScrollLink to="city" smooth={true} duration={100} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 text-white cursor-pointer">
                                  City
                              </ScrollLink>
                          </li> */}
                          <li>
                          <Link to="/SavedHouses"><Button className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 text-white cursor-pointer">Saved Houses</Button></Link>
                          </li>
                          <li>
                              <ScrollLink to="foot" smooth={true} duration={100} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 text-white cursor-pointer">
                                  Contact
                              </ScrollLink>
                          </li>
                    </ul>
                </div>
            </div>
            <Modal
          show={showProfileModal}
          onHide={() => setShowProfileModal(false)}
          centered
          style={{ marginLeft: '25%', width: '50%', borderRadius: '10px', backgroundColor: '#f9f9f9' }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="updateProfileForm" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Enter new username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter new email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter new password"
                  style={{ width: '100%' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
            <Button variant="primary" id="saveProfileChanges" onClick={handleUpdateProfile}>
              Save Changes
            </Button>
          </Modal.Body>
          <Modal.Footer>
          <Link to="/SavedHouses"><Button variant="success">View Saved House</Button></Link>
            <Button variant="danger" id="deleteAccount" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
            <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </nav>
    </header>
    );
};

export default MineNav;







