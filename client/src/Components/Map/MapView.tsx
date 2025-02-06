import { Dialog } from "@material-tailwind/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { getPointsOfInterest } from "../../Services/getplacesService";
import { getPOIDetails } from "../../Services/getPOIDetailsService";
import { useAuth } from "../../context/AuthContext";

interface MapComponentProps {
  searchedCity: { name: string; lat: number; lng: number };
  setSearchedCity: (city: { name: string; lat: number; lng: number }) => void;
}

const MapComponent = ({
  searchedCity,
  setSearchedCity,
}: MapComponentProps): JSX.Element | null => {
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const lastCenterRef = useRef<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favoritesList, setFavoritesList] = useState<any[]>([]);
  const { isAuthenticated } = useAuth();

  //tracks user location if allowed
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setSearchedCity({
        name: "MovedMap",
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  //Loads the city map when searched
  useEffect(() => {
    if (
      !searchedCity ||
      typeof searchedCity.lat !== "number" ||
      typeof searchedCity.lng !== "number"
    ) {
      console.error("Invalid coordinates:", searchedCity);
      return;
    }
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView(
        [searchedCity.lat, searchedCity.lng],
        14
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    } else {
      mapRef.current.setView([searchedCity.lat, searchedCity.lng], 14);
    }
  }, [searchedCity.name]);

  //Load the points of interest around the searched city
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current?.removeLayer(layer);
        }
      });
    }
    fetchLocations();
  }, [searchedCity.lat, searchedCity.lng]);

  const fetchLocations = async () => {
    try {
      const data = await getPointsOfInterest(
        searchedCity.name,
        searchedCity.lat,
        searchedCity.lng
      );      
      const formattedLocations = data.map((item: any) => ({
        name: item.name,
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        description: item.description || "No description available",
        picture: item.picture || "https://via.placeholder.com/200",
      }));
      setLocations(formattedLocations);
    } catch (error) {
      console.error("Error fetching points of interest:", error);
    }
  };

  //Loads the POI when the user moves the map and zoom <14
  useEffect(() => {
    if (!mapRef.current) return;
    const movedMap = mapRef.current;
    const handleMapMove = () => {
      const center = movedMap.getCenter();
      const zoom = movedMap.getZoom();
      const newCenter = {
        lat: parseFloat(center.lat.toFixed(5)),
        lng: parseFloat(center.lng.toFixed(5)),
      };
      if (
        zoom >= 12 &&
        (!lastCenterRef.current ||
          lastCenterRef.current.lat !== newCenter.lat ||
          lastCenterRef.current.lng !== newCenter.lng)
      ) {
        lastCenterRef.current = newCenter;
        setSearchedCity({
          name: "MovedMap",
          lat: newCenter.lat,
          lng: newCenter.lng,
        });
      } else {
        console.log("Go closer to see the points of interest");
      }
    };
    movedMap.on("moveend", handleMapMove);
    return () => {
      movedMap.off("moveend", handleMapMove);
    };
  }, [mapRef.current]);

  //Puts the markers on the map when POI are loaded
  useEffect(() => {
    if (locations.length > 0 && mapRef.current) {
      locations.forEach((location) => {
        if (location.latitude && location.longitude && mapRef.current) {
          const marker = L.marker([location.latitude, location.longitude])
            .addTo(mapRef.current)
            .bindTooltip(`<b>${location.name}</b>`, {
              permanent: false,
              direction: "top",
              opacity: 0.8,
            });
          marker.on("click", () => handleMarkerClick(location));
        } else {
          console.warn("Invalid location coordinates:", location);
        }
      });
    }
  }, [locations]);

  // Handle marker click - fetch details and update state
  //show modal
  const handleMarkerClick = async (location: any) => {
    try {
      const details = await getPOIDetails(location.id);


      if (
        !details.description ||
        !details.images ||
        details.images.length === 0
      ) {
        return;
      }

      const isFavorite = checkIfFavorite(location.id); // Check if the location is already in favorites

      setSelectedLocation({
        ...location,
        name: location.name,
        description: details.description || location.description,
        phone: details.phone || "No phone available",
        pictures: details.images.map((img: any) => img.photo_reference) || [
          location.picture,
        ],
        latitude: location.latitude,
        longitude: location.longitude,
        id: location.id,
        isFavorite, // Add isFavorite flag
      });
      setOpen(!open);
    } catch (error) {
      console.error("Error fetching POI details:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated]);

  const fetchFavorites = async () => {
    try {
      const res = await fetch("/user/favorite", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setFavoritesList(Array.isArray(data) ? data : []); 
      } else {
        setFavoritesList([]);
      }
    } catch (error) {
      console.log("Error fetching favorites: " + error);
      setFavoritesList([]);
    }
  };
  const checkIfFavorite = (googlePOIId: string) => {
    return Array.isArray(favoritesList) && favoritesList.some(
      (favorite) => favorite.googlePOIId === googlePOIId
    );
  };
  useEffect(() => {
    if (selectedLocation) {
      setIsFavorite(checkIfFavorite(selectedLocation.id));
    }
  }, [favoritesList, selectedLocation]);

  const addToFavorites = async () => {
    if (!selectedLocation) return;

    const payload = {
      name: selectedLocation.name,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      googlePOIId: selectedLocation.id,
    };

    try {
      const res = await fetch("/user/favorite", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchFavorites();
        setIsFavorite(true);
      } else {
        console.error("Error al añadir a favoritos");
      }
    } catch (error) {
      console.error("Error al añadir a favoritos:", error);
    }
  };  

  // Close modal
  const handleCloseModal = () => {
    setSelectedLocation(null); // Clear selected location
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div id="map" style={{ height: "100%", width: "100%" }}></div>

      <Dialog
        open={open}
        size="sm"
        className="custom-dialog-class"
        handler={handleCloseModal}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        {...({} as any)} //rest of necessary attributes not needed
      >
        {selectedLocation ? (
          <div className="flex flex-row justify-center p-4 rounded-lg shadow-lg">
            {/* Left Section: Image */}
            <div className="mr-5 flex-grow-0 flex-shrink-0 basis-[250px]">
              <img
                src={`http://localhost:3000/google/photo?photoReference=${selectedLocation.pictures[0]}`}
                alt={selectedLocation.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>

            {/* Right Section: Details */}
            <div className="flex flex-col h-full">
              <button
                className="ml-auto cursor-pointer"
                onClick={handleCloseModal}
              >
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex justify-between items-center text-center">
                <h1 className="font-bold">{selectedLocation.name}</h1>
              </div>

              <div className="mb-3 max-h-[150px] overflow-y-auto flex-grow">
                <p>
                  <strong>Description:</strong> {selectedLocation.description}
                </p>
              </div>

              <div className="flex flex-row gap-3 mt-10">
                <button className="bg-blue-500 px-3 py-2 rounded-lg cursor-pointer">
                  Contact
                </button>
                {isAuthenticated && (
                  <button
                    className={`bg-blue-500 px-3 py-2 rounded-lg cursor-pointer ${
                      isFavorite ? "bg-teal-500" : ""
                    }`}
                    onClick={addToFavorites}
                    disabled={isFavorite}
                  >
                    {isFavorite ? "Added to Favorites" : "Add to Favorites"}
                  </button>
                )}                
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Dialog>
    </>
  );
};

export default MapComponent;
