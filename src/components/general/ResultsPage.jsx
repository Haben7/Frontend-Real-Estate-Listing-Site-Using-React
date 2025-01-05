import React, { useState } from 'react'; 
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import City from './city';
import Footer from './footer';
import { Card, Button, Modal } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faShower, faRuler, faMapMarkerAlt, faDollarSign, faBookmark } from '@fortawesome/free-solid-svg-icons';

const ResultsPage = () => {
  const location = useLocation();
  const { houses } = location.state || { houses: [] };
  const [selectedHouse, setSelectedHouse] = useState(null); 
  const [isBookmarked, setIsBookmarked] = useState(false); 
  const handleOpen = (house) => {
    setSelectedHouse(house); 
  };
  const handleClose = () => setSelectedHouse(null); 
  const onToggleBookmark = () => {
    setIsBookmarked(!isBookmarked); 
  };

  return (
    <>
      <NavBar />
      <div style={{paddingTop:'6%'}}>
        
      {houses.length === 0 ? (
        <p>No houses found matching your criteria.</p>
      ) : (
        <div className="property-list">
          {houses.map((house, index) => (
            <Card key={index} className="hover-card" style={{ marginBottom: '20px', borderRadius: '10px', border: 'none' }}>
              <div id={`carousel-${index}`} className="carousel slide">
                <div className="carousel-inner">
                  {house.images && house.images.length > 0 ? (
                    house.images.map((image, imgIndex) => (
                      <div className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`} key={imgIndex}>
                        <img
                          src={image}
                          alt={`${house.title} image ${imgIndex + 1}`}
                          style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
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
                  data-bs-target={`#carousel-${index}`}
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#carousel-${index}`}
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <Card.Body>
                <Card.Title>
                  {house.title}
                 
                </Card.Title>

                <Card.Text>
                  <Card.Title style={{ fontStyle: 'italic', fontWeight: 'lighter' }}>
                    {house.property_type}
                    <br />
                  </Card.Title>
                  <strong>Price: </strong>
                  {house.price}$, {house.negotiable ? 'Negotiable' : 'Fixed'}<br/>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {house.location}
                  <br />
                  <FontAwesomeIcon icon={faBed} style={{ marginRight: '10px' }} />
                  {house.bedrooms}
                  <FontAwesomeIcon icon={faShower} style={{ marginLeft: '20px', marginRight: '10px' }} />
                  {house.bathrooms}
                  <FontAwesomeIcon icon={faRuler} style={{ marginLeft: '20px', marginRight: '10px' }} />
                  {house.size} sq ft
                </Card.Text>
                <Button variant="primary" onClick={() => handleOpen(house)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedHouse && (
        <Modal show={true} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedHouse.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id={`carousel-selected`} className="carousel slide">
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
                    <input
                      type="text"
                      name="user_name"
                      style={{ fontSize: '18px', width: '100%', backgroundColor: 'white', color: 'black', border: '1px solid #ccc' }}
                    />
                  </div>
                  <br />
                  <div>
                    <label style={{ fontSize: '20px' }}>Email: </label>
                    <input
                      type="email"
                      name="user_email"
                      style={{ fontSize: '18px', width: '100%', backgroundColor: 'white', color: 'black', border: '1px solid #ccc' }}
                    />
                  </div>
                  <br />
                  <div>
                    <label style={{ fontSize: '20px' }}>Message: </label>
                    <textarea
                      name="message"
                      style={{ fontSize: '18px', width: '100%', height: '100px', backgroundColor: 'white', color: 'black', border: '1px solid #ccc' }}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
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
            <City />
<Footer/>
</div>
    </>
    
  );
};

export default ResultsPage;
