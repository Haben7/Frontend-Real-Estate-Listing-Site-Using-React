import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // For navigation

const CityCaraousel = () => {
    const [cities, setCities] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const citiesPerPage = 12;
    const navigate = useNavigate(); // Use React Router's navigate function

    useEffect(() => {
        const fetchCities = async () => {
            const response = await fetch('http://localhost:8000/api/cities'); // Adjust the URL as necessary
            const data = await response.json();
            setCities(data);
        };
        fetchCities();
    }, []);

    const handleCityClick = (city) => {
        // Navigate to the HouseList page for the selected city
        navigate(`/houses/${city}`);
    };

    return (
        <Container fluid>
            <div className="d-flex no-scrollbar" style={{ overflowX: 'auto', whiteSpace: 'nowrap', marginTop: '2%' }}>
                {cities.slice(startIndex, startIndex + citiesPerPage).map((cityItem, index) => (
                    <div
                        key={index}
                        className="city-card text-center"
                        style={{
                            minWidth: '150px',
                            flex: '0 0 auto',
                            margin: '11px',
                        }}
                    >
                        <h4
                            onClick={() => handleCityClick(cityItem.name)}
                            style={{ cursor: 'pointer', fontSize: '14px' }}
                            className="d-flex align-items-center justify-content-between"
                        >
                            {cityItem.name}
                            
                        </h4>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default CityCaraousel;

  