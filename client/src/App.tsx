import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Login/Resgister';
import Home from './Pages/Home';
import MapView from './Components/Map/MapView';
import Footer from './Components/footer';
import Admin from './Admin/Admin';
import AdminRoute from './Admin/AdminMiddleware';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <MapView />
      <Footer />
    </Router>
  );
};

export default App;