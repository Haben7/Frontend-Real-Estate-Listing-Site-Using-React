import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faShower, faRuler, faMapMarkerAlt, faBookmark, faBookmark as faSolidBookmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/Chat.css'; 
import { Pagination } from "flowbite-react";


const MineProperty = () => {
  const [houses, setHouses] = useState([]);
  const [savedHouse, setSavedHouse] = useState(() => {
  const saved = localStorage.getItem('favoriteHouses');
    return saved ? JSON.parse(saved) : [];
  });  
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const carouselRefs = useRef([]);
  const [totalPages, setTotalPages] = useState(1);  
  const [currentPage, setCurrentPage] = useState(1); 
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    owner_email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/send-email', formData);
        alert(response.data.message);
    } catch (error) {
        console.error('Error sending email', error);
        alert('Failed to send email.');
    }
  };

  // Fetch houses and bookmarked houses
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
  useEffect(() => {
    fetchHouses(currentPage);
  }, [currentPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const handleOpen = (house) => setSelectedHouse(house);
  const handleClose = () => setSelectedHouse(null);


  const addFavoriteHouse = (house) => {
    if (!house.id) {
        console.error("House ID is missing:", house);
        return;
    }
    const updatedFavorites = [...savedHouse, house];
    setSavedHouse(updatedFavorites);
    localStorage.setItem('favoriteHouses', JSON.stringify(updatedFavorites));
};

  const removeFavoriteHouse = (houseId) => {
    const updatedFavorites = savedHouse.filter((favHouse) => favHouse.id !== houseId);
    setSavedHouse(updatedFavorites);
    localStorage.setItem('favoriteHouses', JSON.stringify(updatedFavorites)); 
  };

  const isFavorite = (houseId) => savedHouse.some((favHouse) => favHouse.id === houseId);


  useEffect(() => {
    
    localStorage.setItem('favoriteHouses', JSON.stringify(savedHouse));
  }, [savedHouse]);
  return (
    <div id='prop'>
      <h1 id="discover">Discover</h1>

      {houses.length > 0 ? (
        <div className="property-list">
          {houses.map((house, index) => (
            <Card className="hover-card" key={house.id || index} style={{ marginBottom: '20px', borderRadius: '10px', overflow: 'hidden', border: 'none' }}
          >
             
              <div
                id={`carousel-${house.id}`}
                className="carousel slide"
                ref={(el) => (carouselRefs.current[index] = el)}
              >
                <div className="carousel-inner">
                  {house.images.map((image, imgIndex) => (
                    <div className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`} key={`${house.id}-${imgIndex}`}>
                      <img
                        src={image}
                        alt={`house ${house.title} - Image ${imgIndex + 1}`}
                        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
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
              <Card.Body className='body'>
                <Card.Title>Posted By: { house.real_estate_name} </Card.Title>
                <p>Site Name: {house.site_name}</p>

                <Card.Title>{house.title}</Card.Title>
                <Card.Text>
               
                <strong>Price: </strong>{house.price} Birr, {house.negotiable ? 'Negotiable' : 'Fixed'}<br />
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {house.location}<br />
                  <FontAwesomeIcon icon={faBed} /> {house.bedrooms} <FontAwesomeIcon icon={faShower} /> {house.bathrooms} <FontAwesomeIcon icon={faRuler} /> {house.size} sq ft
                </Card.Text>
                <div className="buttons-container">
                       <Button variant="primary" 
                      className="text-black bg-blue-200"
                       onClick={() => handleOpen(house)}>View Details</Button> 
              <Button
                    variant="outline-secondary"
                    onClick={() =>
                      isFavorite(house.id)
                        ? removeFavoriteHouse(house.id)
                        : addFavoriteHouse(house)
                    }
                    style={{ marginLeft: '40%' }}
                  >
                    <FontAwesomeIcon
                      icon={isFavorite(house.id) ? faSolidBookmark : faBookmark}
                      color={isFavorite(house.id) ? 'gold' : 'gray'}
                    />
                  </Button>
                </div>
              </Card.Body>
            </Card>
           
          ))}
      
        </div>
      ) : (
        <p>No properties available.</p>
      )}

      {selectedHouse && (
        <Modal show={true} onHide={() => setSelectedHouse(null)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedHouse.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="carousel slide">
              <div className="carousel-inner">
                {selectedHouse.images.map((image, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <img src={image} alt={`house ${selectedHouse.title} - Image ${index + 1}`} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <div style={{ width: '50%', padding: '20px' }}>
                <div style={{ marginLeft: '40px' }}>
                  <FontAwesomeIcon icon={faBed} style={{ marginRight: '10px' }} />
                  {selectedHouse.bedrooms}
                  <FontAwesomeIcon icon={faShower} style={{ marginLeft: '20px', marginRight: '10px' }} />
                  {selectedHouse.bathrooms}
                  <FontAwesomeIcon icon={faRuler} style={{ marginLeft: '20px', marginRight: '10px' }} />
                  {selectedHouse.size} sq ft
                </div>

                <p style={{ marginLeft: '40px', marginTop: '10px' }}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '10px' }} />
                  {selectedHouse.location}
                </p>

                <p style={{ marginLeft: '40px', marginTop: '5%' }}>
                  <strong>Price:</strong> ${selectedHouse.price}
                </p>
                <p style={{ marginLeft: '40px', marginTop: '5%' }}>
                  <strong>Negotiable:</strong> {selectedHouse.negotiable ? 'Yes' : 'No'}
                </p>
                <p style={{ marginLeft: '40px', marginTop: '5%' }}>
                 <strong> Property type: </strong>
                  {selectedHouse.property_type}
                  <br />
                </p>
                <p style={{ marginLeft: '40px', marginTop: '5%' }}>
                  <strong>Contact Us:</strong> {selectedHouse.owner_contact}
                </p>
                <p style={{ marginLeft: '40px', marginTop: '5%' }}>
                  <strong>Our Email:</strong> {selectedHouse.owner_email}
                </p>
                <p style={{ marginLeft: '40px', marginTop: '5%' }}><strong>Description:</strong> {selectedHouse.description}</p>
              </div>

              <div style={{ width: '60%', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>

                <form onSubmit={handleSubmit} className="styled-form">
                  <h2 className="form-title">Send us your message</h2>
                  <label>Your name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label>Your email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label>Your message:</label>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                    <label>Owner Email:</label>
                    <input
                        type="email"
                        name="owner_email"
                        placeholder="Owner's Email"
                        onChange={handleChange}
                        value={formData.owner_email}
                        className="form-input"
                        required
                    />
                  <Button style={{backgroundColor: 'blue'}} type="submit">Send Message</Button>
                </form>
              </div>
            </div>
          </Modal.Body>
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

export default MineProperty;
