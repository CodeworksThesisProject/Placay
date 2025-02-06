import React, { useState, useEffect } from "react";
import PathTour from "../Map/PathTour";
import { getPOIDetails } from "../../Services/getPOIDetailsService";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  googlePOIId: string
  image:any
}

interface Tour {
  title: string;
  duration: string;
  locations: Location[];
}

interface TourDetailProps {
  tour: Tour;
}

const TourDetail: React.FC<TourDetailProps> = ({ tour }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [loadingImages, setLoadingImages] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocationImages = async () => {
      const updatedLocations = [...tour.locations];

      for (const location of updatedLocations) {
        try {
          const details = await getPOIDetails(location.googlePOIId);
          if (details && details.images && details.images.length > 0) {
            const imageUrl = details.images[0]?.photo_reference
              ? `http://localhost:3000/google/photo?photoReference=${details.images[0].photo_reference}`
              : null;

            if (imageUrl) {
              location.image = imageUrl;
            }
          }
        } catch (error) {
          console.error("Error fetching POI details:", error);
        }
      }

      // Después de cargar las imágenes, marcamos como "no cargando"
      setLoadingImages(false);
    };

    fetchLocationImages();
  }, [tour]);

  return (
    <div className="flex flex-col gap-3 w-xs bg-white p-3 rounded-xs shadow-sm">
      {/* Header */}
      <div className="header flex flex-row justify-between text-gray-800 mx-5">
        <div className="flex flex-row gap-2 text-sm items-center">
          <p>{tour.title}</p>
        </div>
        <div className="flex flex-row gap-2 text-sm items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p>{tour.duration}</p>
        </div>
      </div>

      {/* Map Image */}
      <div id="map-container" className="h-96 w-full ">
        <PathTour points={tour.locations} />
      </div>

      {/* Locations */}
      <div className="tour-locations grid grid-cols-2 gap-4">
        {tour.locations.map((location, index) => (
          <div key={index} className="px-4 flex flex-row gap-3">
            <div className="flex flex-col">
              <p className="text-[10px] text-gray-500">{location.name}</p>
              {/* If we have a location image, display it */}
              {location.image && (
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Like Button */}
      <div className="border-t-1 border-gray-200 flex flex-row gap-3 items-center pt-3 pl-2 text-gray-600">
        <div className="cursor-pointer" onClick={() => setLiked(!liked)}>
          {!liked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="red"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          )}
        </div>
        <p>23 likes</p>
      </div>
    </div>
  );
};

export default TourDetail;