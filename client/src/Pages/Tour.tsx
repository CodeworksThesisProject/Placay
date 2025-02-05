import "leaflet/dist/leaflet.css";
import PathTour from "../Components/Map/PathTour";
import TourDetail from "../Components/Tour/TourDetail";
import { getTours } from "../Services/tourServices";
import { useEffect, useState } from "react";


const fetchTours = async () => {
  try {
    const data = await getTours("all");
    return data;
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
};

const Tour: React.FC = () => {
  const [tours, setTours] = useState<any[]>([]);

  const sampleTour = {
    title: "Berlin Highlights",
    duration: "2 days tour",
    image: "/asserts/images/tours/map.png",
    locations: [
      { name: "Berlin Hauptbahnhof", latitude: 52.5251, longitude: 13.3694 },
      { name: "Alexanderplatz", latitude: 52.5219, longitude: 13.4132 },
      { name: "Checkpoint Charlie", latitude: 52.5076, longitude: 13.3904 },
      { name: "Potsdamer Platz", latitude: 52.5096, longitude: 13.3759 },
      { name: "Kurfürstendamm", latitude: 52.5030, longitude: 13.3327 }
    ]
  };

  useEffect(() => {
    const loadTours = async () => {
      const fetchedTours = await fetchTours();
      setTours([...fetchedTours, sampleTour]);
      console.log(tours)
    };

    loadTours();
  }, []);

  return (
    <div className="flex flex-row h-screen p-5 gap-4">
      {/* Map Section */}
      <div className="flex-1 relative h-full">
        <div id="map" className="h-full w-full rounded-lg shadow-md">
          <PathTour points={sampleTour.locations} />
        </div>
      </div>

      {/* Right Section: Tour Details */}
      <div className="w-[30%] max-w-md flex flex-col gap-4 overflow-y-auto max-h-screen">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">Tour Details</h2>
          <div className="flex flex-col gap-4 shadow-lg">
             {/* Loop through tours and render TourDetail */}
             {tours.map((tour, index) => (
              <TourDetail key={index} tour={tour} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;
