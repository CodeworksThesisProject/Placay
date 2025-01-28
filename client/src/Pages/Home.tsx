import React, { useState } from 'react'
import MapView from '../Components/Map/MapView';
import SearchField from '../Components/SearchField';

const Home: React.FC = () => {
const [coordinates, setCoordinates] = useState<[number, number]>([51.5072178, -0.1275862]);
  const [searchedCity, setSearchedCity] = useState<string>("London");
  return (
      <div className="map-container">
        <SearchField setCoordinates={setCoordinates} setSearchedCity={setSearchedCity}/>
      <MapView coordinates={coordinates} searchedCity={searchedCity}/>
      </div>
  );
};

export default Home;