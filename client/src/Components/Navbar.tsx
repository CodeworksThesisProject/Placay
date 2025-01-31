import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timePeriods, setTimePeriods] = useState<{ _id: string; startDate: string; endDate: string }[]>([]);
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

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
    if (isAuthenticated) {
      fetchTimePeriod();
    }
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [isAuthenticated]);

  const fetchTimePeriod = async () => {
    try {
      const response = await fetch('/user/timeperiod', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setTimePeriods(data.timePeriods || []);
      }
    } catch (error) {
      console.error('Error fetching time period:', error);
    }
  };

  const handleSaveTimePeriod = async () => {
    console.log("Sending to API:", { startDate: newStartDate, endDate: newEndDate });

  if (!newStartDate || !newEndDate) {
    console.error("Start or End are missing");
    return;
  }
    try {
      const response = await fetch('/user/timeperiod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ startDate: newStartDate, endDate: newEndDate })
      });
      if (response.ok) {
        const data = await response.json();
        setTimePeriods(data.timePeriods);
      } else {
        console.error('Failed to save time period');
      }
    } catch (error) {
      console.error('Error saving time period:', error);
    }
  };

  return (
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
        {isAuthenticated ? (
        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={newStartDate}
            onChange={(e) => setNewStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <span>-</span>
          <input
            type="date"
            value={newEndDate}
            onChange={(e) => setNewEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={handleSaveTimePeriod}
            className="bg-[#38436C] text-white px-3 py-1 rounded hover:bg-opacity-90 cursor-pointer"
          >
            Save
          </button>
        </div>
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
        <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</button>
        {isAuthenticated && user?.role === 'admin' ? (
          <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</button>
        ) : ("")}
        {isAuthenticated ? (
          <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>

      <div className="relative hidden md:flex items-center">
        {isAuthenticated ? (
          <div className="relative">
            <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={toggleDropdown}>{user ? `${user.name} ` : ""}Profile</button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
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
          <button className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
