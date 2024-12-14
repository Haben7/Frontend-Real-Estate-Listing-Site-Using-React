import React, { useEffect, useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap'; 
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MineNav from './MineNav';
import MineCity from './minecity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faShower, faRuler,faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
const MineHouse = () => {
    const { city } = useParams();
    const [house, setHouse] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState(null); 

    useEffect(() => {
        const fetchHouse = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/houses/city/${encodeURIComponent(city)}`);
                console.log(response.data); 
                setHouse(response.data.data);
            } catch (error) {
                console.error('Error fetching house:', error);
            }
        };

        fetchHouse();
    }, [city]);

    const handleOpen = (house) => {
        setSelectedHouse(house); 
    };

    const handleClose = () => setSelectedHouse(null); 

    return (
        <>
            <MineNav />
            <div style={{paddingTop:'6%'}}> 
                {house.length > 0 ? (
                    <div className="property-list">
                        {house.map(house => (
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
                <Card.Title>{house.title}</Card.Title>
                <Card.Text>
                <Card.Title style={{ fontStyle:'italic',fontWeight:'lighter' }}>
                   {house.property_type}
                  <br />
                </Card.Title>

                <strong>Price: </strong>
                  {house.price}$, {house.negotiable ? 'Negotiable': "Fixed"}
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginLeft: '20px', marginRight: '10px' }} />
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
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div className="mt-3">
                                <p><strong>Location:</strong> {selectedHouse.location}</p>
                                <p><strong>Price:</strong> ${selectedHouse.price}</p>
                                <p><strong>Bedrooms:</strong> {selectedHouse.bedrooms}</p>
                                <p><strong>Bathrooms:</strong> {selectedHouse.bathrooms}</p>
                                <p><strong>Property Type:</strong> {selectedHouse.property_type}</p>
              <p><strong>Negotiable:</strong> {selectedHouse.negotiable  ? 'Yes' : 'No'}</p> 
              <p><strong>Size:</strong> {selectedHouse.size} sq.ft</p> 
              <p><strong>Contact Us:</strong> {selectedHouse.owner_contact}</p> <p><strong>Description:</strong>{selectedHouse.description}</p>
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
            <MineCity />

        </>
    );
};

export default MineHouse;