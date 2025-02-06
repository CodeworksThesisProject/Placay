import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import ErrorAlert from "../Components/Alert/ErrorAlert";
import TourDetail from "../Components/Tour/TourDetail";

interface Tour {
  _id: string;
  user_id: string;
  title: string;
  duration?: string;
  location: {
    latitude: number;
    longitude: number;
    label?: string;
    googlePOIId?: string;
  }[];
}

const Tour: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`/tour/tours`);
        if (response.ok) {
          const data = await response.json();

          setTours(data);
        }
      } catch (error) {
        console.log(error);
        setErrorMsg(`Error fetching tours`)
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="pt-5">
      {errorMsg && <ErrorAlert message={errorMsg} onClose={() => setErrorMsg(null)} />}

      <div className="border border-gray-200 rounded-xl mb-5 inline-block mx-5 px-8 py-2 shadow-xl cursor-pointer hover:border-gray-300">
        filter
      </div>
      <div className="flex flex-row gap-3 justify-start flex-wrap mx-5 mb-20">
        {tours.map((tour: Tour) => (
          <TourDetail key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default Tour;
