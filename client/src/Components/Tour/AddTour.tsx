import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import ErrorAlert from "./ErrorAlert";

const AddTour: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    latitude: "",
    longitude: "",
    selectedLocations: [] as { label: string, latitude: string, longitude: string, googlePOIId: string }[],
  });
  const [error, setError] = useState<string | null>(null);

  
  const [favouritLocations, setFavouritLocations] = useState<
    { label?: string; latitude: string; longitude: string; googlePOIId?: string }[]
  >([]);

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!user) {
          setError(`User is not authenticated'}`); 
          return;
        }

        const response = await fetch("/user/favorite", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.log(response);
          throw new Error("Failed to fetch favorite locations");
        }

        const data = await response.json();
        setFavouritLocations(data);
      } catch (error) {
        setError(error.message || error);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (location: { label: string, latitude: string, longitude: string, googlePOIId: string }) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      selectedLocations: [...prevFormData.selectedLocations, location] 
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError(`User is not authenticated'}`); 
      return;
    }
    
    const userId = user.id;
    const tourData = {
      title: formData.title,
      duration: formData.duration,
      location: [
        ...formData.selectedLocations, // Favorited locations
        { latitude: formData.latitude, longitude: formData.longitude }, // Custom location
      ].filter(location => location.latitude && location.longitude),
    };

    try {
      const response = await fetch(`/tour/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tourData),
      });

      if (response.ok) {
        setFormData({ title: "", duration: "", latitude: "", longitude: "", selectedLocations: [] });
        navigate(-1);
      } else {
        const errorData = await response.json();
        setError(`Error creating tour: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      setError(`An error occurred while submitting the tour: ${error.message || error}`); 
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      <h1 className="text-2xl font-semibold mb-5">Create a New Tour</h1>
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
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

        <h2 className="text-lg font-semibold mt-5">Select Locations from Favorites:</h2>
        
        {favouritLocations.length > 0 ? (
          favouritLocations.map((location, index) => (
            <div className="h-40 overflow-auto border p-3 rounded-md bg-gray-50 mt-2">
            <label
              key={index}
              className="flex items-center gap-3 bg-white px-3 py-2 border border-gray-200 rounded-md text-gray-800 mb-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border-2 border-blue-500 rounded-full checked:bg-blue-500 checked:border-transparent transition-all duration-300 cursor-pointer"
                checked={formData.selectedLocations.some((loc) => loc.label === location.label)}
                onChange={() => handleCheckboxChange(location)}
              />
              {location.label}
            </label>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No favorite locations saved.</p>
        )}
        

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

        <button type="submit" className="mt-5 bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
          Create Tour
        </button>
      </form>

      
    </div>
  );
};

export default AddTour;
