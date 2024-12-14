import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HouseList from './components/general/HouseList';
import Home from './components/general/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import ResultsPage from './components/general/ResultsPage';
import SignUp from './components/SignUp';
import LoginForm from './components/SignIn';
import Mine from './components/auth/Mine'; 
import './App.css';
import Minecity from './components/auth/minecity';
import MineHouse from './components/auth/minehouse';
import Result from './components/auth/result';
import SavedHouses from './components/auth/SavedHouses';
import Chat from './components/auth/Chat';
import MineCity from './components/auth/minecity';
import MineProperty from './components/auth/MineProperty';
import ProtectedRoute from './components/styles/unauto';
function App() {
  return (

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/houses/:city" element={<HouseList />} />
  <Route path="/house/:city" element={<MineHouse />} />
  <Route path="/houses/results" element={<ResultsPage />} />
  <Route path="/houses/result" element={<Result />} />
  <Route path="/SignUp" element={<SignUp/>}/>
  <Route path="/SignIn" element={<LoginForm/>}/>
  <Route path="/Mine" element={<Mine/>}/>
  <Route path="/Mine/:userId" element={<Mine />} />
  <Route path="/SavedHouses" element={<SavedHouses/>} />
  <Route path="/Chat" element={<Chat/>}/>
  <Route path="/MineProperty" element={<MineProperty/>}/>
  <Route path="/MineCity" element={<MineCity/>}/>
  <Route path="/unauto" element={<ProtectedRoute/>} />


</Routes>
);
}

export default App;
