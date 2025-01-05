import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faShower, faRuler, faMapMarkerAlt, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Pagination } from "flowbite-react";
import { Carousel } from 'bootstrap'; 

const PropertiesList = ({ isLoggedIn }) => {
  const [houses, setHouses] = useState([]);
  const [bookmarkedHouses, setBookmarkedHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);  
  const [currentPage, setCurrentPage] = useState(1); 

  const fetchHouses = async (page = 1) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/houses?page=${page}&limit=12`);
      setHouses(response.data.data);
      setTotalPages(response.data.totalPages); 
    } catch (err) {
      console.error('Error fetching houses:', err);
      setError('Failed to fetch properties');
    }
  };
  
  const fetchBookmarkedHouses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/bookmarks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });
      setBookmarkedHouses(response.data);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
    }
  };

  useEffect(() => {
    fetchHouses(currentPage);
    if (isLoggedIn) {
      fetchBookmarkedHouses();
    }

    houses.forEach((house) => {
      const carousel = document.getElementById(`carousel-${house.id}`);
      if (carousel) {
        new Carousel(carousel, {
          ride: false, 
          interval: false 
        });
      }
    });
  }, [currentPage, isLoggedIn, houses]);

  const handleOpen = (house) => setSelectedHouse(house);
  const handleClose = () => setSelectedHouse(null);

  const handleBookmark = (houseId) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    axios.post('/api/bookmarks', { house_id: houseId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => {
      setBookmarkedHouses(prev => [...prev, houses.find(house => house.id === houseId)]);
    })
    .catch(err => {
      console.error('Error bookmarking house:', err);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowLoginPopup(true);
    } else {
      console.log("Message sent");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!houses || houses.length === 0) {
    return <div>No properties available</div>;
  }

  return (
    <div id='prop'>
      <h1 id="discover">Discover</h1>
      <div className="property-list">
  {houses.map((house, index) => (
    <Card
      className="hover-card"
      key={house.id || index}
      style={{ marginBottom: '20px', borderRadius: '10px', overflow: 'hidden', border: 'none', position: 'relative' }}
    >
      <div id={`carousel-${house.id}`} className="carousel slide">
        <div className="carousel-inner">
          {house.images.map((image, imgIndex) => (
            <div className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`} key={imgIndex}>
              <img
                src={image}
                alt={`${house.title} - Image ${imgIndex + 1}`}
                style={{ width: '100%', height: '190px', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${house.id}`} data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${house.id}`} data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <Card.Body>
        <Card.Title>{house.title}</Card.Title>
        <Card.Text>
          <strong>Price:</strong> {house.price} Birr, {house.negotiable ? 'Negotiable' : 'Fixed'}<br />
          <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '10px' }} /> {house.location}<br />
          <FontAwesomeIcon icon={faBed} style={{ marginRight: '10px' }} /> {house.bedrooms}
          <FontAwesomeIcon icon={faShower} style={{ marginLeft: '20px', marginRight: '10px' }} /> {house.bathrooms}
          <FontAwesomeIcon icon={faRuler} style={{ marginLeft: '20px', marginRight: '10px' }} /> {house.size} sq ft
        </Card.Text>
        <div className="buttons-container">
          <Button
            variant="primary"
            className="text-black bg-blue-200"
            onClick={() => handleOpen(house)}
          >
            View Details
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => handleBookmark(house.id)}
            style={{ marginLeft: '45%' }}
          >
            {bookmarkedHouses.some(b => b.id === house.id) ? 'Bookmarked' : ''}
            <FontAwesomeIcon icon={faBookmark} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  ))}
</div>


      <Modal show={showLoginPopup} onHide={() => setShowLoginPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please log in or sign up to do this</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginPopup(false)} style={{border: 'none', background: 'red'}}>Close</Button>
          <Link to="/SignIn">
            <Button variant="success" style={{border: 'none', background: 'blue'}}>Login</Button>
          </Link>
        </Modal.Footer>
      </Modal>

      {selectedHouse && (
        <Modal show={true} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedHouse.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="carousel slide">
              <div className="carousel-inner">
                {selectedHouse.images.map((image, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <img src={image} alt={`${selectedHouse.title} - Image ${index + 1}`} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
  <div style={{ flex: 1, marginRight: '20px' }}>
    <div><strong>Price: </strong>{selectedHouse.price} Birr</div>
    <div><strong>Location: </strong>{selectedHouse.location}</div>
    <div><strong>Bedrooms: </strong>{selectedHouse.bedrooms}</div>
    <div><strong>Bathrooms: </strong>{selectedHouse.bathrooms}</div>
    <div><strong>Size: </strong>{selectedHouse.size} sq ft</div>
  </div>
  <div style={{ flex: 1 }}>
  <form onSubmit={handleSubmit}>
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="name"><strong>Name:</strong></label>
      <input 
        type="text" 
        id="name" 
        placeholder="Your Name" 
        style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
      />
    </div>

    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="email"><strong>Email:</strong></label>
      <input 
        type="email" 
        id="email" 
        placeholder="Your Email" 
        style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
      />
    </div>

    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="ownerEmail"><strong>Owner's Email:</strong></label>
      <input 
        type="email" 
        id="ownerEmail" 
        placeholder="Owner's Email" 
        style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
      />
    </div>

    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="message"><strong>Message:</strong></label>
      <textarea 
        id="message" 
        placeholder="Send a message to the owner" 
        style={{ width: '100%', height: '100px', marginTop: '5px' }} 
      />
    </div>

    <button 
      type="submit" 
      style={{ marginTop: '10px', backgroundColor: '#0d6efd', color: 'white', border: 'none', padding: '10px' }}>
      Send Message
    </button>
  </form>
</div>
</div>

          </Modal.Body>
          <Modal.Footer>
            <Button  onClick={handleClose} style={{border: 'none', background: 'red'}}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}

<div className="flex overflow-x-auto sm:justify-center">

<Pagination
currentPage={currentPage}
totalPages={100}
onPageChange={handlePageChange}
showIcons
/>
</div>
    </div>
  );
};

export default PropertiesList;
