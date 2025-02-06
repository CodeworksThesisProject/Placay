import { useEffect, useState } from "react";
import ErrorAlert from "../../Components/Alert/ErrorAlert";
import TourDetail from "../../Components/Tour/TourDetail";
import { useAuth } from "../../context/AuthContext";

// interface Tour {
//   _id: string;
//   user_id: string;
//   title: string;
//   duration?: string;
//   locations: {
//     latitude: number;
//     longitude: number;
//     label?: string;
//     googlePOIId?: string;
//   }[];
// }

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  googlePOIId: string
  image:string;
}

interface Tour {
  _id: string;
  user_id: string;
  title: string;
  duration?: string;
  locations: Location[];
}

interface ListOfUserToursProps {
  profileActive: string;
}

export default function ListOfUserTours( {profileActive }: ListOfUserToursProps) {
  const { user } = useAuth();
  const [tours, setTours] = useState<Tour[]>([]);
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const token = localStorage.getItem("token") || "";
    
  useEffect(() => {
    const fetchTours = async () => {
      if (!user) return;
      try {
        const response = await fetch(`/tour/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

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
  }, [user, profileActive]);

  return (
    <div className={`tour flex flex-col gap-5  ${profileActive === 'tour' ? '': 'hidden'}`}> 
        {errorMsg && <ErrorAlert message={errorMsg} onClose={() => setErrorMsg(null)} />}         
        
        <div className="flex flex-row flex-wrap gap-5 justify-start">
        
          {tours.map((tour: Tour) => (
            <TourDetail key={tour._id} tour={tour} />
          ))}
        </div>
    </div>
  );
}