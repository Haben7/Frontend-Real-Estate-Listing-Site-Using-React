import React from 'react';
import { useParams } from 'react-router-dom';
import MineProperty from './MineProperty';
import MineCity from './minecity';
import Footer from './minefooter'
import Hero from './minehero'
const Mine = () => {
  const { userId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="mine-container">
      <Hero/>
    <MineProperty/>
  <MineCity/>
<Footer/>
    </div>
  );
};

export default Mine;
