import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        checkAuth();
        navigate('/login');
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm flex flex-row items-center ">
      <img src="/asserts/images/placay-just-logo.png" alt="Placay Logo" className="w-15 mx-3 cursor-pointer" onClick={() => navigate('/')} />
      <div className="border-r border-l border-gray-300 px-2 h-15 flex items-center whitespace-nowrap text-[#38436C]">{new Date().toLocaleDateString()}</div>
      <div className="flex flex-row gap-3 justify-start w-full">
        <a className="px-4 hover:text-blue-400 text-[#38436C] cursor-pointer" onClick={() => navigate('/map')}>Map</a>
        <a className="px-4 hover:text-blue-400 text-[#38436C] cursor-pointer" onClick={() => navigate('/tours')}>Tours</a>
        {isAuthenticated ? (
          <a className="ml-auto px-4 hover:text-blue-400 text-[#38436C] cursor-pointer" onClick={handleLogout}>Logout</a>
        ) : (
          <a className="ml-auto px-4 hover:text-blue-400 text-[#38436C] cursor-pointer" onClick={() => navigate('/login')}>Login</a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
