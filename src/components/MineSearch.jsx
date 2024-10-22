import React, { useState } from 'react';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const MineSearch = () => {
  const { userId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
    const [location, setLocation] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate();

    const handleSearch = async () => {
        // Check if at least one field is filled
        if (!location && !bedrooms && !bathrooms && !priceMin && !priceMax) {
            setError('Please fill at least one field to search.');
            return; // Prevent searching if no fields are filled
        }

        setError(''); // Reset error message if fields are filled
        setLoading(true);

        try {
            const response = await axios.get('http://localhost:8000/api/houses/search', {
                params: {
                    location,
                    bedrooms,
                    bathrooms,
                    price_min: priceMin,
                    price_max: priceMax,
                },
            });

            // Check if response contains data
            if (response.data.data && response.data.data.length > 0) {
                // Navigate to results page with the response data
                navigate('/houses/results', { state: { houses: response.data.data } });
            } else {
                setError('No houses found for the given criteria.');
            }
        } catch (error) {
            console.error('Error fetching house listings:', error);
            setError('Error fetching house listings.'); // Set error message for UI
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="search-bar-container">
        <div id='well'> 
          <h2>Welcome, {user ? user.name : 'Guest'}!</h2>
        </div>
            <div className="search-bar">
                {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
                
                <Form.Group className="search-section">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="search-input"
                    />
                </Form.Group>

                <Form.Group className="search-section">
                    <Form.Label>Bedrooms</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Number of bedrooms"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="search-input"
                    />
                </Form.Group>

                <Form.Group className="search-section">
                    <Form.Label>Bathrooms</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Number of bathrooms"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="search-input"
                    />
                </Form.Group>

                <Form.Group className="search-section">
                    <Form.Label>Price Range</Form.Label>
                    <div className="d-flex justify-content-between">
                        <Form.Control
                            type="number"
                            placeholder="Min Price"
                            value={priceMin}
                            onChange={(e) => setPriceMin(e.target.value)}
                            className="price-input"
                        />
                        <Form.Control
                            type="number"
                            placeholder="Max Price"
                            value={priceMax}
                            onChange={(e) => setPriceMax(e.target.value)}
                            className="price-input"
                        />
                    </div>
                </Form.Group>

                <Button className="search-btn" onClick={handleSearch} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : <FaSearch />}
                </Button>
            </div>
        </div>
    );
};

export default MineSearch;
