const Navbar: React.FC = () => {
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options).replace(',', '');
  };

  const currentDate = new Date();

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm flex flex-row items-center ">
      <img src="../../public/asserts/images/placay-logo.png" alt="placay logo" className="w-15 mx-3 "/>

      <div className="border-r border-l border-gray-300 px-2 h-15 flex items-center whitespace-nowrap text-black">{formatDate(currentDate)} </div>

      <div className="flex flex-row gap-3 justify-start w-full cursor-pointer ">
        <a className="px-4 hover:text-blue-400 text-gray-700">Map</a> 
        <a className="px-4 hover:text-blue-400 text-gray-700">Tours</a>
        <a href="/login" className="ml-auto px-4 hover:text-blue-400 text-gray-700">Login</a>
      </div>
      
    </div>
  );
};

export default Navbar;