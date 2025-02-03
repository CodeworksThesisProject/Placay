import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddTour: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    latitude: "",
    longitude: "",
    selectedLocations: [] as string[],
  });

  const locations = [
    "TV Tower, Berlin, Germany",
    "Brandenburg Gate, Berlin, Germany",
    "Berlin Cathedral, Germany",
    "East Side Gallery, Berlin, Germany",
  ];
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle checkbox selection
  const handleCheckboxChange = (location: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedLocations: prev.selectedLocations.includes(location)
        ? prev.selectedLocations.filter((item) => item !== location)
        : [...prev.selectedLocations, location],
    }));
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tour Data Submitted:", formData); 
    setFormData({ title: "", duration: "", latitude: "", longitude: "", selectedLocations: [] });
    navigate(-1)
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-semibold mb-5">Create a New Tour</h1>
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
        {/* Tour Details */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Enter Tour Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Enter Tour Duration"
            value={formData.duration}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Favorite Locations */}
        <h2 className="text-lg font-semibold mt-5">Select Locations from Favorites:</h2>
        <div className="h-40 overflow-auto border p-3 rounded-md bg-gray-50 mt-2">
          {locations.map((location, index) => (
            <label key={index} className="flex items-center gap-3 bg-white px-3 py-2 border border-gray-200 rounded-md text-gray-800 mb-2 cursor-pointer">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border-2 border-blue-500 rounded-full checked:bg-blue-500 checked:border-transparent transition-all duration-300 cursor-pointer"
                checked={formData.selectedLocations.includes(location)}
                onChange={() => handleCheckboxChange(location)}
              />
              {location}
            </label>
          ))}
        </div>

        {/* Custom Location Input */}
        <h2 className="text-lg font-semibold mt-5">Add a Custom Location:</h2>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            name="latitude"
            placeholder="Enter Latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            name="longitude"
            placeholder="Enter Longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="mt-5 bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
          Create Tour
        </button>
      </form>
    </div>
  );
};

export default AddTour;
