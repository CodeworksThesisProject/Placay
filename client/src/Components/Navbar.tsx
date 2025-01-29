import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const formatDate = (date: Date, locale: string = navigator.language || 'en-US'): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString(locale, options).replace(',', '');
  };

  const currentDate = new Date();

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm flex flex-row items-center ">
      <img src="/asserts/images/placay-just-logo.png" alt="Placay Logo" className="w-15 mx-3 cursor-pointer" onClick={() => navigate('/')}/>

      <div className="border-r border-l border-gray-300 px-2 h-15 flex items-center whitespace-nowrap text-[#38436C]">{formatDate(currentDate)} </div>

      <div className="flex flex-row gap-3 justify-start w-full">
        <a className="px-4 hover:text-blue-400 text-[#38436C] cursor-pointer" onClick={() => navigate('/map')}>Map</a>
        <a className="px-4 hover:text-blue-400 text-[#38436C] cursor-pointer" onClick={() => navigate('/tours')}>Tours</a>
        {/* if user is login then show username btn which redirect to profile page */}
        <a href="/profile" className="ml-auto px-4 hover:text-blue-400 text-[#38436C] cursor-pointer" onClick={() => navigate('/profile')}>profile</a>
        {/* else  show login btn */}
        {/* <a href="/login" className="ml-auto px-4 hover:text-blue-400 text-[#38436C] cursor-pointer" onClick={() => navigate('/login')}>Login</a> */}
      </div>

    </div>
  );
};

export default Navbar;