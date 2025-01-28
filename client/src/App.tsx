import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Login/Resgister';
import Home from './Pages/Home';
import Legal from './Pages/Legal';
import About from './Pages/About';
import Footer from './Components/footer';
import Navbar from "./Components/Navbar";
import Admin from './Admin/Admin';
import AdminRoute from './Admin/AdminMiddleware';

const App: React.FC = () => {
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

      <Footer />
    </Router>
  );
};

export default App;