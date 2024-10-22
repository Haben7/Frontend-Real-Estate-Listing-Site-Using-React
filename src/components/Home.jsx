import React from 'react';
import NavBar from './NavBar';
import CityCarousel from './CityCaraousel';
import PropertyList from './PropertiesList';

function Home() {
  return (
    <>
     <NavBar />
     <CityCarousel/>
    <PropertyList/>
     </>
  );
}

export default Home;
