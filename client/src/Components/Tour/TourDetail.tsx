import React, { useEffect, useState } from "react";
import { getPOIDetails } from "../../Services/getPOIDetailsService";
import { useAuth } from '../../context/AuthContext';
import PathTour from "../Map/PathTour";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  googlePOIId: string;
  image?: string;
}

interface Tour {
  _id: string;
  user_id: string;
  title: string;
  duration: string;
  location: Location[];
}

interface TourDetailProps {
  tour: Tour;
}

const TourDetail: React.FC<TourDetailProps> = ({ tour }) => {
  const token = localStorage.getItem("token") || "";
  const { user } = useAuth();

  const [liked, setLiked] = useState<boolean>(false);
  const [numLikedTours, setNumLikedTours] = useState<number>(0);
  const [loadingImages, setLoadingImages] = useState<boolean>(true);
  const [locationsWithImages, setLocationsWithImages] = useState<Location[]>([]);

  // Obtener imágenes de cada ubicación
  useEffect(() => {
    const fetchLocationImages = async () => {
      const updatedLocations = await Promise.all(
        tour.location.map(async (location) => {
          try {
            const details = await getPOIDetails(location.googlePOIId);
            const imageUrl = details?.images?.[0]?.photo_reference
              ? `http://localhost:3000/google/photo?photoReference=${details.images[0].photo_reference}`
              : "";
            return { ...location, image: imageUrl };
          } catch (error) {
            console.error("Error fetching POI details:", error);
            return location; // Si hay error, mantener la ubicación sin imagen
          }
        })
      );
      setLocationsWithImages(updatedLocations);
      setLoadingImages(false);
    };

    fetchLocationImages();
  }, [tour]);

  // Obtener el estado de "like" del usuario y el número de likes
  useEffect(() => {
    const updateUserLike = async () => {
      try {
        const response = await fetch(`/user/like/${user.id}/${tour._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLiked(data.response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchLike = async () => {
      try {
        const response = await fetch(`/tour/liked/${tour._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNumLikedTours(data.tourLiked);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLike();
    updateUserLike();
  }, [liked]);

  const likeClickHandler = async () => {
    try {
      const response = await fetch(`/tour/liked/${user.id}/${tour._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setLiked(!liked);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-xs bg-white p-3 rounded-xs shadow-sm">
      {/* Header */}
      <div className="header flex flex-row justify-between text-gray-800 mx-5">
        <div className="flex flex-row gap-2 text-sm items-center">
          <p>{tour.title}</p>
        </div>
        <div className="flex flex-row gap-2 text-sm items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <p>{tour.duration}</p>
        </div>
      </div>

      {/* Mapa */}
      <div id="map-container" className="h-96 w-full">
        <PathTour points={tour.location} />
      </div>

      {/* Ubicaciones */}
      <div className="tour-locations grid grid-cols-2 gap-4">
        {loadingImages ? (
          <p className="text-center text-gray-500">Cargando imágenes...</p>
        ) : (
          locationsWithImages.map((loc, index) => (
            <div key={index} className="px-4 flex flex-row gap-3">
              <div className="flex flex-col">
                <p className="text-[10px] text-gray-500">{loc.name}</p>
                <img
                  src={loc.image || "/placeholder.jpg"}
                  alt={loc.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sección de likes */}
      <div className="border-t-1 border-gray-200 flex flex-row gap-3 items-center pt-3 pl-2 text-gray-600">
        <div className="cursor-pointer" onClick={likeClickHandler}>
          {!liked ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          )}
        </div>
        <p>{numLikedTours} likes</p>
      </div>
    </div>
  );
};

export default TourDetail;
