import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // To get the city from the URL
import axios from 'axios';
import NavBar from './NavBar';
import CityCaraousel from './CityCaraousel';

const HouseList = () => {
    const { city } = useParams(); // Get the city name from the URL
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/houses/city/${encodeURIComponent(city)}`);
                console.log(response.data); // Log the data structure to ensure correctness
                setHouses(response.data.data); // Set houses with the API response
            } catch (error) {
                console.error('Error fetching houses:', error);
            }
        };

        fetchHouses();
    }, [city]);

    const handleOpen = (house) => {
        console.log(house); // Placeholder for action when "View Details" is clicked
    };

    return (
        <>
            <NavBar />
            <CityCaraousel />
            <div>
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
                                        <strong>Bedrooms: {house.bedrooms} | Bathrooms: {house.bathrooms}</strong><br />
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
        </>
    );
};

export default HouseList;
