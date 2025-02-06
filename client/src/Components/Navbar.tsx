import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm flex items-center p-3 justify-between">
      <div className="flex items-center gap-3 px-3">
        <img
          src="/asserts/images/placay-just-logo.png"
          alt="Map Logo"
          className="w-12 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <img
          src="/asserts/images/placay.svg"
          alt="Placay Logo"
          className="w-40 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <div className="hidden md:block text-[#38436C]">{formatDate(new Date())}</div>
        <button className="hidden md:block px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/')}>Map</button>
        <button className="hidden md:block px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/tours')}>Tours</button>
        {/* {isAuthenticated && user?.role === 'admin' ? (
          <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</button>
        ) : ("")} */}
      </div>

      <div className="md:hidden">
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>

      <div className={`absolute top-14 left-0 w-full bg-white shadow-md p-3 flex flex-col md:hidden ${isMenuOpen ? 'block' : 'hidden'} z-51`}>
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => { closeDropdown(); navigate('/profile'); }}>View Profile</button>
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => { closeDropdown(); navigate('/map'); }}>Map</button>     
        {isAuthenticated && user?.role === "admin" ? (
          <div>
            <button className="px-4 py-2 text-[#38436C] hover:bg-orange-100 w-full cursor-pointer" onClick={() => { closeDropdown(); navigate('/dashboard'); }}>Dashboard</button>
            <button className="px-4 py-2 text-[#38436C] hover:bg-orange-100 w-full cursor-pointer" onClick={() => { closeDropdown(); navigate('/authTest'); }}>AuthTest</button>
            <button className="px-4 py-2 text-[#38436C] hover:bg-orange-100 w-full cursor-pointer" onClick={() => { closeDropdown(); navigate('/function-test'); }}>Function Test</button>
          </div>
        ) : ("")}
        {isAuthenticated ? (
          <button className="px-4 py-2 text-[#38436C] hover:bg-red-100 cursor-pointer" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>

      <div className="relative hidden md:flex items-center">
        {isAuthenticated ? (
          <div className="relative ml-auto flex items-center gap-2 cursor-pointer"  >
            <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={toggleDropdown}>{user ? `${user.name} ` : ""}Profile</button>
            <img
              src={user?.profileImage || "/asserts/images/profilePictures/default-profile-picture.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
              onClick={toggleDropdown}
            />

            {isDropdownOpen && (
              <div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                <button className="block px-4 py-2 text-[#38436C] hover:bg-gray-100 w-full text-center cursor-pointer" onClick={() => { closeDropdown(); navigate('/profile'); }}>
                  View Profile
                </button>                
                {isAuthenticated && user?.role === "admin" ? (
                  <div>
                    <button className="block px-4 py-2 text-[#38436C] hover:bg-orange-100 w-full text-center cursor-pointer" onClick={() => { closeDropdown(); navigate('/dashboard'); }}>Dashboard</button>
                    <button className="block px-4 py-2 text-[#38436C] hover:bg-orange-100 w-full text-center cursor-pointer" onClick={() => { closeDropdown(); navigate('/authTest'); }}>AuthTest</button>
                    <button className="block px-4 py-2 text-[#38436C] hover:bg-orange-100 w-full text-center cursor-pointer" onClick={() => { closeDropdown(); navigate('/function-test'); }}>Function Test</button>
                  </div>
                ) : ("")}
                <button className="block px-4 py-2 text-[#38436C] hover:bg-red-100 w-full text-center cursor-pointer" onClick={() => { closeDropdown(); handleLogout(); }}>
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