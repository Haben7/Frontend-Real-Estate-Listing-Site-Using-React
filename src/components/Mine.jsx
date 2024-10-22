import React from 'react';
import MineNav from './MineNav';
import CityCarousel from './CityCaraousel';
import PropertyList from './PropertiesList';
import { useParams } from 'react-router-dom';

const Mine = () => {
  const { userId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="mine-container">
      <MineNav />
     <CityCarousel/>
    <PropertyList/>
    </div>
  );
};

export default Mine;
