import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, setIsAuthenticated } = useAuth();
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
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const formatDate = (date: Date, locale: string = navigator.language || 'en-US'): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString(locale, options).replace(',', '');
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
// <<<<<<< HEAD
    // <div className="bg-white border-b border-gray-200 shadow-sm flex flex-row items-center ">
    //   <img src="/asserts/images/placay-just-logo.png" alt="Placay Logo" className="w-15 mx-3 cursor-pointer" onClick={() => navigate('/')} />
    //   <div className="border-r border-l border-gray-300 px-2 h-15 flex items-center whitespace-nowrap text-[#38436C]">{new Date().toLocaleDateString()}</div>
    //   <div className="flex flex-row gap-3 justify-start items-center w-full">
    //     <a className="px-4 hover:text-blue-400 text-[#38436C] cursor-pointer" onClick={() => navigate('/')}>Map</a>
    //     <a className="px-4 hover:text-blue-400 text-[#38436C] cursor-pointer" onClick={() => navigate('/tours')}>Tours</a>
        
/* ======= */
    <div className="bg-white border-b border-gray-200 shadow-sm flex items-center p-3 justify-between">
      <div className="flex items-center gap-3 px-3">
        <img
          src="/asserts/images/placay-just-logo.png"
          alt="Placay Logo"
          className="w-12 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <div className="text-[#38436C]">{formatDate(new Date())}</div>
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/')}>Map</button>
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/tours')}>Tours</button>
        {isAuthenticated && user?.role === 'admin' ? (
          <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</button>
        ) : ("")}
    </div>

      <div className="md:hidden">
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>

      <div className={`absolute top-14 left-0 w-full bg-white shadow-md p-3 flex flex-col md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/map')}>Map</button>
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/tours')}>Tours</button>
        {/* <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</button> */}
        {/* {isAuthenticated && user?.role === "admin" ? (
          <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</button>
        ) : ("")} */}
        {isAuthenticated ? (
          <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>

      <div className="relative hidden md:flex items-center">
{/* >>>>>>> develop */}
        {isAuthenticated ? (
          <div className="relative ml-auto">
            <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={toggleDropdown}>{user ? `${user.name} ` : ""}Profile</button>
            
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                {isAuthenticated && user?.role === "admin" ? (
                  <button className="block px-4 py-2 text-[#38436C] hover:bg-gray-100 w-full text-center cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</button>
                ) : ("")}
                <button className="block px-4 py-2 text-[#38436C] hover:bg-gray-100 w-full text-center cursor-pointer" onClick={() => { navigate('/profile'); closeDropdown(); }}>
                  View Profile
                </button>
                <button className="block px-4 py-2 text-[#38436C] hover:bg-gray-100 w-full text-center cursor-pointer" onClick={() => { navigate('/mytours'); closeDropdown(); }}>
                  My Tours
                </button>
                <button className="block px-4 py-2 text-[#38436C] hover:bg-gray-100 w-full text-center cursor-pointer" onClick={() => { navigate('/mylocations'); closeDropdown(); }}>
                  My Locations
                </button>
                <button className="block px-4 py-2 text-[#38436C] hover:bg-red-100 w-full text-center cursor-pointer" onClick={() => { handleLogout(); closeDropdown(); }}>
                  Logout
                </button>
              </div>
            )}
           </div>
        ) : (
          <button className="ml-auto px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;