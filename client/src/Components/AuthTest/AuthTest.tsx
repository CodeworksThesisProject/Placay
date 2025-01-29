import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const AuthTest: React.FC = () => {
  const { isAuthenticated, token, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <div>You are not authenticated</div>;
  }

  return (
    <div>
      <h2>Welcome, your role is: {token?.role}</h2>
    </div>
  );
};

export default AuthTest;
