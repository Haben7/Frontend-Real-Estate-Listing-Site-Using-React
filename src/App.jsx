import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HouseList from './components/HouseList';
import NavBar from './components/NavBar';
import Home from './components/Home';
import CityCaraousel from './components/CityCaraousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ResultsPage from './components/ResultsPage';
import SignUp from './components/SignUp';
import LogIn from './components/SignIn';
import Mine from './components/Mine'; 

import './App.css';

function App() {
  return (

<Router>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/houses/:city" element={<HouseList />} />
  <Route path="/houses/results" element={<ResultsPage />} />
  <Route path="/SignUp" element={<SignUp/>}/>
  <Route path="/SignIn" element={<LogIn/>}/>
  <Route path="/Mine/:userId" element={<Mine />} />

</Routes>
</Router>
);
}

export default App;
