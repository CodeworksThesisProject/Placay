import { useEffect, useState } from "react";
import ErrorAlert from "../../Components/Alert/ErrorAlert";
import { useAuth } from "../../context/AuthContext";
import TourDetail from "./TourDetail";
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
interface ListOfUserToursProps {
  profileActive: string;
}
export default function FavouritTour( {profileActive }: ListOfUserToursProps) {
  const { user } = useAuth();
  const [favourits, setFavourits] = useState<Tour[]>([]);
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
      const fetchTours = async () => {
        if (!user) return;
        try {
          const response = await fetch(`/user/likedTour/${user.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            const favouritTours = data.tours;            
            setFavourits(favouritTours);
          }
        } catch (error) {
          console.log(error);
          setErrorMsg(`Error fetching tours`)
        }
      };
      fetchTours();
    }, [user, favourits]);

  return (
    <div className={`tour flex flex-col gap-5 pb-20 ${profileActive === 'favourit' ? '': 'hidden'}`}>
        {errorMsg && <ErrorAlert message={errorMsg} onClose={() => setErrorMsg(null)} />}
          
        <div className="flex flex-row flex-wrap gap-5 justify-start">

            { favourits.length > 0 ? (
              favourits.map((favourits: Tour) => (
                <TourDetail key={favourits._id} tour={favourits} />
              ))
            ): (
              <p className="text-gray-500 text-center">No liked tour exist!</p>
            )}
        
        </div>
    </div>
  );
}