import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminRouteProps } from '../types/allTypes';

// Check if user is Admin. If not, navigate to root

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;