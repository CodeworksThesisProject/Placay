import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Admin from './Admin/Admin';
import AdminRoute from './Admin/AdminMiddleware';
import Footer from './Components/footer';
import Login from './Components/Login/Login';
import Register from './Components/Login/Resgister';
import Navbar from "./Components/Navbar";
import About from './Pages/About';
import Home from './Pages/Home';
import Legal from './Pages/Legal';
import Profile from './Pages/UserProfile';


const App: React.FC = () => {

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/dashboard" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;