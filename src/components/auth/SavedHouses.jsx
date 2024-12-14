import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBed, faShower, faRuler } from '@fortawesome/free-solid-svg-icons';
import MineNav from "./MineNav"
import Footer from "./minefooter"

const SavededHouses = () => {
  const [savedHouses, setSavedHouses] = useState([]);

  useEffect(() => {
    // Fetch the favorite houses from localStorage
    const saved = localStorage.getItem('favoriteHouses');
    setSavedHouses(saved ? JSON.parse(saved) : []);
  }, []);

  const removeFavoriteHouse = (houseId) => {
    const updatedFavorites = savedHouses.filter((house) => house.id !== houseId);
    setSavedHouses(updatedFavorites);
    localStorage.setItem('favoriteHouses', JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <>
    <MineNav/>
    <div style={{paddingTop:'6%'}}>
      <h1>Your Favorite Houses</h1>
      {savedHouses.length > 0 ? (
        <div className="property-list">
          {savedHouses.map((house) => (
            <Card
              className="hover-card"
              key={house.id}
              style={{
                marginBottom: '20px',
                borderRadius: '10px',
                overflow: 'hidden',
                border: 'none',
              }}
            >
              <div className="carousel-inner">
                {house.images.map((image, imgIndex) => (
                  <div
                    className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`}
                    key={imgIndex}
                  >
                    <img
                      src={image}
                      alt={`house ${house.title} - Image ${imgIndex + 1}`}
                      style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
              <Card.Body className="body">
                <Card.Title>Posted By: {house.real_estate_name}</Card.Title>
                <Card.Title>{house.title}</Card.Title>
                <Card.Text>
                  <strong>Price: </strong>{house.price} Birr<br />
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {house.location}
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => removeFavoriteHouse(house.id)}
                  style={{ marginTop: '10px' }}
                >
                  Remove from Favorites
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>No favorite houses yet.</p>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default SavededHouses;
