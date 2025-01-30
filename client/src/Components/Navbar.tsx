import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeDropdown = () => setIsDropdownOpen(false);
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      if (response.ok) {
        setIsAuthenticated(false); 
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="navbar bg-white border-b border-gray-200 shadow-sm flex items-center p-3">
      <div className={`w-4/12 flex items-center gap-3 px-3 ${isMenuOpen ? 'hidden' : ''}`}>
        <img
          src="/asserts/images/placay-just-logo.png"
          alt="Placay Logo"
          className="w-12 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <div className="text-[#38436C]">{new Date().toLocaleDateString()}</div>
      </div>

      <div className="w-2/12 flex justify-center md:hidden">
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>

      <div className={`w-4/12 hidden md:flex justify-center gap-3 ${isMenuOpen ? 'hidden' : ''}`}>
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/')}>Map</button>
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/tours')}>Tours</button>
      </div>

      <div className="w-2/12 hidden md:flex justify-end">
        {isAuthenticated ? (
          <div className="relative w-full flex justify-center">
            <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={toggleDropdown}>Profile</button>
            {isDropdownOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                <button className="block px-4 py-2 text-[#38436C] hover:bg-gray-100 w-full text-center" onClick={() => { navigate('/profile'); closeDropdown(); }}>
                  View Profile
                </button>
                <button className="block px-4 py-2 text-[#38436C] hover:bg-gray-100 w-full text-center" onClick={() => { navigate('/mytours'); closeDropdown(); }}>
                  My Tours
                </button>
                <button className="block px-4 py-2 text-[#38436C] hover:bg-gray-100 w-full text-center" onClick={() => { navigate('/mylocations'); closeDropdown(); }}>
                  My Locations
                </button>
                <button className="block px-4 py-2 text-[#38436C] hover:bg-red-100 w-full text-center" onClick={() => { handleLogout(); closeDropdown(); }}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>

      <div className={`w-full ${isMenuOpen ? 'flex flex-col absolute top-14 left-0 w-full bg-white shadow-md p-3' : 'hidden'}`}>
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer pl-4" onClick={() => navigate('/map')}>Map</button>
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer pl-4" onClick={() => navigate('/tours')}>Tours</button>
        {isAuthenticated && (
          <div className="flex justify-center mt-3 relative">
            <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={toggleDropdown}>Profile</button>
            {isDropdownOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                <button className="block px-4 py-2 text-[#38436C] hover:bg-gray-100 w-full text-center" onClick={() => { navigate('/profile'); closeDropdown(); }}>
                  View Profile
                </button>
                <button className="block px-4 py-2 text-[#38436C] hover:bg-gray-100 w-full text-center" onClick={() => { navigate('/mytours'); closeDropdown(); }}>
                  My Tours
                </button>
                <button className="block px-4 py-2 text-[#38436C] hover:bg-gray-100 w-full text-center" onClick={() => { navigate('/mylocations'); closeDropdown(); }}>
                  My Locations
                </button>
                <button className="block px-4 py-2 text-[#38436C] hover:bg-red-100 w-full text-center" onClick={() => { handleLogout(); closeDropdown(); }}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        {!isAuthenticated && (
          <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer pl-4" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
