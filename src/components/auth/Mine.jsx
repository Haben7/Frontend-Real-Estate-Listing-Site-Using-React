import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MineProperty from './MineProperty';
import MineCity from './minecity';
import Footer from './minefooter'
import Hero from './minehero'
const Mine = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    if (!loggedInUser || loggedInUser.id !== parseInt(userId)) {
      navigate('/signIn'); 
    }
  }, [userId, loggedInUser, navigate]);
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
