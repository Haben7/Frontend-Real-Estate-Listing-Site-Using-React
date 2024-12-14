import React from 'react';
import NavBar from './NavBar';
import PropertyList from './PropertiesList';
import Hero from './Hero';
import Footer from './footer';
import City from './city';

function Home() {
  return (
    <>
    <Hero />
    <PropertyList/>
    <City/>
    <Footer/>
     </>
  );
}

export default Home;
