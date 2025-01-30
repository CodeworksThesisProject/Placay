import React, { useEffect } from "react";

interface LocateMeProps {
  setCoordinates: (coords: [number, number]) => void;
  setSearchedCity: (cityName: string) => void;
}

const LocateMe: React.FC<LocateMeProps> = ({ setCoordinates, setSearchedCity }) => {

  useEffect(() => {

    const fetchApproximateLocation = async () => {
      try {
        const response = await fetch("http://ip-api.com/json");
        const data = await response.json();
        if (data.lat && data.lon) {
          setCoordinates([data.lat, data.lon]);
          setSearchedCity(data.city || "Unknown City");
        }
      } catch (error) {
        console.error("Could not get a approximate Location:", error);
      }
    };

    fetchApproximateLocation();
  }, [setCoordinates, setSearchedCity]);

  const getExactLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates([position.coords.latitude, position.coords.longitude]);
          setSearchedCity("Your current Location");
        },
        (error) => console.error("Error getting a Location:", error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      console.error("Sadly no Location available");
    }
  };

  return (
    <button onClick={getExactLocation} className="px-4 py-2 text-[#38436C] hover:text-blue-400 cursor-pointer">
      Locate me
    </button>
  );
};

export default LocateMe;