import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Login/Resgister';
import Home from './Pages/Home';

import Footer from './Components/footer';
import Admin from './Admin/Admin';
import AdminRoute from './Admin/AdminMiddleware';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/" element={<Home />} />
      </Routes>
      
      <Footer />
    </Router>
  );
};

export default App;