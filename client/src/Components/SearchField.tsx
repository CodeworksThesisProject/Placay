import { useRef, useState } from 'react';

interface SearchFieldProps {
  setSearchedCity: (city: { name: string; lat: number; lng: number }) => void;
}

const SearchField = ({setSearchedCity }: SearchFieldProps) => {
  const [suggestions, setSuggestions] = useState<{ description: string; placeId: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchSuggestions = async () => {
    if (!inputRef.current?.value.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/city/autocomplete/${inputRef.current.value}`);
      const data = await res.json();
      setSuggestions(data.predictions.map((prediction: any) => ({
        description: prediction.description,
        placeId: prediction.place_id,
      })));
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const fetchCoordinates = async (placeId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/city/details/${placeId}`);
      const data = await res.json();
      setSearchedCity({ name: data.result.formatted_address, lat: data.result.geometry.location.lat, lng: data.result.geometry.location.lng });
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  return (
    <div className="w-80 mx-auto p-2 absolute top-[4px] left-[40px] z-[99999]">
      <div className="w-80 mx-auto p-2 relative">
        <input
          ref={inputRef}
          placeholder="Search a city"
          className="w-80 px-4 py-1 border border-[#38436C] rounded-lg shadow-md bg-white"
          onChange={fetchSuggestions}
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white w-full border border-gray-300 mt-1 rounded-lg shadow-md z-50">
            {suggestions.map((place, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  fetchCoordinates(place.placeId);
                  setSuggestions([]);
                }}
              >
                {place.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchField;
