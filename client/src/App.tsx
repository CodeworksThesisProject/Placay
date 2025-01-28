import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'
import Login from './Components/Login/Login';
import Register from './Components/Login/Resgister';
import Home from './Pages/Home';
import MapView from './Components/Map/MapView';
import Footer from './Components/footer';
import SearchField from './Components/SearchField';

const App: React.FC = () => {
  const [coordinates, setCoordinates] = useState<[number, number]>([51.5072178, -0.1275862]);
  const [searchedCity, setSearchedCity] = useState<string>("London");
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <SearchField setCoordinates={setCoordinates} setSearchedCity={setSearchedCity}/>
      <MapView coordinates={coordinates} searchedCity={searchedCity}/>


      <Footer />
    </Router>
  );
};

export default App;
