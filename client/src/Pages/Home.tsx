import Navbar from "../Components/Navbar";
import MapView from '../Components/Map/MapView';


const Home: React.FC = () => {

  return (
    <>
      <Navbar />
      <div className="map-container">
        <MapView />
      </div>
    </>
  );
};

export default Home;