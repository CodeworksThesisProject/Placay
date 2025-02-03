import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthProviderProps } from '../types/allTypes';

// Check if user logged. If not, navigate to root

const AuthRoute = ({ children }: AuthProviderProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;