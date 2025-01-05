import React, { useEffect, useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import NavBar from './NavBar';
import City from './city';
import Footer from './footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faShower, faRuler,faMapMarkerAlt, faEnvelope, faDollarSign,faTag, faHome,faBookmark  } from '@fortawesome/free-solid-svg-icons';
const HouseList = ({isBookmarked, onToggleBookmark}) => {
    const { city } = useParams(); 
    const [houses, setHouses] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState(null); 

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/houses/city/${encodeURIComponent(city)}`);
                console.log(response.data); 
                setHouses(response.data.data); 
            } catch (error) {
                console.error('Error fetching houses:', error);
            }
        };

        fetchHouses();
    }, [city]);

    const handleOpen = (house) => {
        setSelectedHouse(house); 
    };

    const handleClose = () => setSelectedHouse(null); 
    return (
        <>
            <NavBar />
            <div style={{paddingTop:'6%'}}> 
                {houses.length > 0 ? (
                    <div className="property-list">
                        {houses.map(house => (
                            <Card key={house.id} className="hover-card" style={{ marginBottom: '20px', borderRadius: '10px', overflow: 'hidden', border: 'none' }}>
                                <div id={`carousel-${house.id}`} className="carousel slide">
                                    <div className="carousel-inner">
                                        {house.images && house.images.length > 0 ? (
                                            house.images.map((image, imgIndex) => (
                                                <div className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`} key={imgIndex}>
                                                    <img
                                                        src={image} // Access the image URL directly
                                                        alt={`House ${house.title} - Image ${imgIndex + 1}`}
                                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }} // Fixed height
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="carousel-item active">
                                                <img
                                                    src="default-image-url.jpg" 
                                                    alt="No Image Available"
                                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target={`#carousel-${house.id}`}
                                        data-bs-slide="prev"
                                    >
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target={`#carousel-${house.id}`}
                                        data-bs-slide="next"
                                    >
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                <Card.Body>
                <Card.Title>{house.title}  </Card.Title>
               

                <Card.Text>
                <Card.Title style={{ fontStyle:'italic',fontWeight:'lighter' }}>
                   {house.property_type}
                  <br />
                </Card.Title>

                <strong>Price: </strong>
                  {house.price}$, {house.negotiable ? 'Negotiable': "Fixed"}<br/>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {house.location}<br /> 

                  <FontAwesomeIcon icon={faBed} style={{ marginRight: '10px' }} />

                  { house.bedrooms }
                  <FontAwesomeIcon icon={faShower} style={{marginLeft: '20px', marginRight: '10px'}}/>

                                {house.bathrooms }
                                <FontAwesomeIcon icon={faRuler} style={{marginLeft: '20px', marginRight: '10px'}} />

                               {house.size } sq ft
                            

                </Card.Text>
                <Button variant="primary" onClick={() => handleOpen(house)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>No properties available.</p>
      )}

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
              <img
                src={image}
                alt={`house ${selectedHouse.title} - Image ${index + 1}`}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
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

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {/* Left Column: Property Description */}
        <div style={{ width: '50%', padding: '20px' }}>
          <p style={{ textAlign: 'center', fontSize: '30px', fontStyle: 'italic' }}>{selectedHouse.property_type}</p>
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
            <strong>Description:</strong> {selectedHouse.description}
          </p>
        </div>

        <div style={{ width: '45%', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
          <h2 style={{ fontSize: '30px', marginBottom: '20px' }}>Contact Us</h2>
          <form>
            <div>
              <label style={{ fontSize: '20px' }}>Name: </label>
              <input type='text' name='user_name' style={{ fontSize: '18px', width: '100%',backgroundColor: 'white',
                color: 'black',
                border: '1px solid #ccc' }} />
            </div>
            <br />
            <div>
              <label style={{ fontSize: '20px' }}>Email: </label>
              <input type='email' name='user_email' style={{ fontSize: '18px', width: '100%',backgroundColor: 'white',
                color: 'black',
                border: '1px solid #ccc' }} />
            </div>
            <br />
            <div>
              <label style={{ fontSize: '20px' }}>Message: </label>
              <br />
              <textarea name='user_message' rows='4' style={{ fontSize: '18px', width: '100%',   backgroundColor: 'white',
                color: 'black',
                border: '1px solid #ccc',}} />
            </div>
            <br />
            <input
              type='submit'
              value='Send'
              style={{
                backgroundColor: 'white',
                color: 'black',
                padding: '10px 20px',
                fontSize: '18px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            />
          </form>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
                )}
    
            </div>
            <City />
            <Footer/>
        </>
    );
};

export default HouseList;
