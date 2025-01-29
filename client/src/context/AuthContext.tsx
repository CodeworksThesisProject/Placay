import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthToken {
  id: string;
  role: string;
  exp: number;
  iat: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: AuthToken | null;
  checkAuth: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<AuthToken | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/check-auth', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        setIsAuthenticated(false);
        setToken(null);   
        console.log("este 3");
        return;
      }

      const data = await response.json();
      console.log("esto 4", data.user)

      setIsAuthenticated(true);
      setToken(data.user);
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
