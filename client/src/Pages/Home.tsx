import React, { useState } from 'react';
import MapView from '../Components/Map/MapView';
import SearchField from '../Components/SearchField';

const Home = () => {
  const [searchedCity, setSearchedCity] = useState<{ name: string; lat: number; lng: number }>({
    name: "London",
    lat: 51.5072178,
    lng: -0.1275862,
  });

  return (
    <div className="map-container relative"> {/* Añadido relative */}
      <SearchField setSearchedCity={setSearchedCity} />
      <MapView searchedCity={searchedCity} setSearchedCity={setSearchedCity}/>
    </div>
  );
};

export default Home;
