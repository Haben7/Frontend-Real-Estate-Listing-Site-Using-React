import React, { useEffect, useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MineCity = () => {
    const [cities, setCities] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const citiesPerPage = 4;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCities = async () => {
            const response = await fetch('http://localhost:8000/api/cities');
            const data = await response.json();
            setCities(data);
        };
        fetchCities();
    }, []);

    const handleNext = () => {
        if (startIndex + citiesPerPage < cities.length) {
            setStartIndex(startIndex + citiesPerPage);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - citiesPerPage);
        }
    };

    const handleCityClick = (city) => {
        navigate(`/house/${city}`);
    };

    return (
        <Container fluid className="d-flex flex-column align-items-center" style={{display:'flex', marginTop:'3%',marginBottom:'10%'}} id='city'>
          <h1 style={{marginBottom:'4%'}}>Explore By City</h1>
          <div className="underline"></div>

          <div style={{display:'flex'}}>
          <div style={{marginTop:'8%'}}> 
          <Button
                    variant="primary"
                    onClick={handlePrev}
                    disabled={startIndex === 0}
                    className="mx-2"
                    id='button'
                >
                    <FaChevronLeft /> 
                </Button>
                </div>
            <div className="d-flex flex-wrap justify-content-center" style={{ gap: '3rem', marginTop: '1%' }}>
            
                {cities.slice(startIndex, startIndex + citiesPerPage).map((cityItem, index) => (
                    <Card
                        key={index}
                        style={{ width: '250px', height: '300px', cursor: 'pointer', borderRadius:'30px' }}                        onClick={() => handleCityClick(cityItem.name)}
                        className="text-center"
                    >
                             <Card.Img 
            variant="top" 
            src={
                cityItem.image 
                ? `http://localhost:8000/storage/city_images/${cityItem.image}`
                : '../public/square-beautiful-border-296x300.jpg'
            }
            style={{ height: '220px', objectFit: 'cover' }}
        />
                        <Card.Body>
                            <Card.Title style={{ fontSize: '18px', fontWeight: 'bold',height: '0px' }}>
                                {cityItem.name}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                ))}
               
            </div>
            <div style={{marginTop:'8%'}}>
            <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={startIndex + citiesPerPage >= cities.length}
                    className="mx-2"
                    id='button'
                >
                    <FaChevronRight />
                </Button>
                </div>
                </div>
        </Container>
    );
};

export default MineCity;
