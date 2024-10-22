import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const PropertiesList = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/houses'); // Adjust API URL
        setHouses(response.data.data); // Access the 'data' property
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };
    fetchHouses();
  }, []);

  return (
    <div>
      {houses.length > 0 ? (
        <div className="property-list">
          {houses.map(house => (
            <Card className="hover-card" key={house.id} style={{ marginBottom: '20px', borderRadius: '10px', overflow: 'hidden', border: 'none' }}>
              <div id={`carousel-${house.id}`} className="carousel slide">
                <div className="carousel-inner">
                  {house.images.map((image, imgIndex) => (
                    <div className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`} key={imgIndex}>
                      <img
                        src={image} // Adjusted to access the image URL directly
                        alt={`house ${house.title} - Image ${imgIndex + 1}`}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }} // Fixed height
                      />
                    </div>
                  ))}
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
                 Location: {house.location}<br />
                  <strong>{house.house_type}</strong><br />
                  Price: ${house.price}
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
    </div>
  );
};

export default PropertiesList;
