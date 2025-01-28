import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'
import Login from './Components/Login/Login';
import Register from './Components/Login/Resgister';
import Home from './Pages/Home';
import Legal from './Pages/Legal';
import About from './Pages/About';
import Footer from './Components/footer';
import Navbar from "./Components/Navbar";
import Admin from './Admin/Admin';
import AdminRoute from './Admin/AdminMiddleware';
import SearchField from './Components/SearchField';

const App: React.FC = () => {
  const [coordinates, setCoordinates] = useState<[number, number]>([51.5072178, -0.1275862]);
  const [searchedCity, setSearchedCity] = useState<string>("London");
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <SearchField setCoordinates={setCoordinates} setSearchedCity={setSearchedCity}/>
      <MapView coordinates={coordinates} searchedCity={searchedCity}/>
      <Footer />
    </Router>
  );
};

export default App;