import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import CityCaraousel from './CityCaraousel';
import { Card, Button } from 'react-bootstrap';

const ResultsPage = () => {
    const location = useLocation();
    const { houses } = location.state || { houses: [] };

    return (
        <div>
            <NavBar />
            <CityCaraousel />
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
                                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }} // Fixed height for images
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="carousel-item active">
                                            <img
                                                src="default-image-url.jpg" // Fallback image when there are no images
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
                                <Card.Title>{house.title}</Card.Title>
                                <Card.Text>
                                    Location: {house.location}<br />
                                    <strong>Bedrooms: {house.bedrooms} | Bathrooms: {house.bathrooms}</strong><br />
                                    Price: ${house.price}
                                </Card.Text>
                                <Button variant="primary" onClick={() => console.log(house)}>
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResultsPage;
