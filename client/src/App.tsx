import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
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
import AuthTest from './Components/AuthTest/AuthTest';

const App: React.FC = () => {

  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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