import React, { useState } from 'react';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchFilter = () => {
    const [location, setLocation] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!location && !bedrooms && !bathrooms && !priceMin && !priceMax) {
            setError('Please fill at least one field to search.');
            return; 
        }

        setError(''); 
        setLoading(true);

        try {
            const response = await axios.get('http://localhost:8000/api/houses/search', {
                params: {
                    price_min: priceMin,
                    price_max: priceMax,
                },
            });

            if (response.data.data && response.data.data.length > 0) {
                navigate('/houses/results', { state: { houses: response.data.data } });
            } else {
                setError('No houses found for the given criteria.');
            }
        } catch (error) {
            console.error('Error fetching house listings:', error);
            setError('Error fetching house listings.'); 
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="search-bar-container" >
            <div className="search-bar" id='mainsearch'>
                {error && <Alert variant="danger">{error}</Alert>} 

                <Form.Group className="search-section">
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

export default SearchFilter;