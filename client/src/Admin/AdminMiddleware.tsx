import { Navigate } from 'react-router-dom';

// Check if user is Admin. If not, navigate to /login

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('role') === 'admin';

  if (!token || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;