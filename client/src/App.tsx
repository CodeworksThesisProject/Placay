import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import Home from './Pages/Home';
import Legal from './Pages/Legal';
import About from './Pages/About';
import Footer from './Components/footer';
import Navbar from "./Components/Navbar";
import Admin from './Admin/Admin';
import AdminRoute from './Admin/AdminMiddleware';
import { AuthProvider } from './context/AuthContext';
import Profile from './Pages/UserProfile';
import AuthTest from './Components/AuthTest/AuthTest';
import './App.css';

const App: React.FC = () => {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [searchedCity, setSearchedCity] = useState<string>("");

  return (
    <AuthProvider>
      <Router>
        <Navbar setCoordinates={setCoordinates} setSearchedCity={setSearchedCity}/>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/dashboard" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/" element={<Home />} />
          <Route path="/AuthTest" element={<AuthTest />} />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;