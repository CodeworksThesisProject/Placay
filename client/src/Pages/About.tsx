
const About = () => {
  return (
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto p-6 max-w-6xl">
        {/* Left: Image */}
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <img 
            src="/asserts/images/placay-logo.png" 
            alt="Placay Logo" 
            className="w-200 h-auto mx-auto md:mx-0 rounded-3xl"
          />
        </div>

        {/* Right: Text */}
        <div className="text-center md:text-left md:ml-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Discover <span className="text-[#38436C] italic">city highlights </span> 
            and create <span className="text-[#38436C] italic">personalized itineraries</span>
          </h1>
          <p className="text-gray-600 mt-4">
            Explore the best attractions, restaurants, and hidden gems in your favorite destinations. 
            Plan your trips effortlessly and make unforgettable memories with Placay.
          </p>
        </div>
      </div>
  );
};

export default About;