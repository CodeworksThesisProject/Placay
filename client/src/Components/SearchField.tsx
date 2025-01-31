import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';
//npm install "@vis.gl/react-google-maps"
//npm i -D @types/google.maps
//Code source: https://developers.google.com/maps/documentation/javascript/examples/rgm-autocomplete
//https://developers.google.com/maps/documentation/javascript/get-api-key?hl=es-419

/* TODO change the key to an .env file */const API_KEY = "AIzaSyB57oCWBiCU7ET0vWR_dGrO5tIcy9ed71E";

const SearchField = ({
  setCoordinates,
  setSearchedCity,
}: {
  setCoordinates: (coords: [number, number]) => void;
  setSearchedCity: (cityName: string) => void;
}) => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    if (selectedPlace && selectedPlace.geometry?.location) {
      const lat = selectedPlace.geometry.location.lat();
      const lng = selectedPlace.geometry.location.lng();
      setCoordinates([lat, lng]);
      setSearchedCity(selectedPlace.name || "");
      console.log("El selected place es: ", selectedPlace.name)
    }
  }, [selectedPlace, setCoordinates, setSearchedCity]);


  return (
    <div className="flex justify-center  w-full">
      <APIProvider apiKey={API_KEY} solutionChannel="GMP_devsite_samples_v3_rgmautocomplete">
        <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
      </APIProvider>
    </div>
  );
};

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className=" w-80 mx-auto p-2 absolute top-[4px] left-[40px] z-[99999]">
      <input
        ref={inputRef}
        placeholder="Search a city"
        className="w-80 px-4 py-1 border border-[#38436C] rounded-lg shadow-md"
      />
    </div>
  );
};

export default SearchField;