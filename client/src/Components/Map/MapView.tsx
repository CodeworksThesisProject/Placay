'use strict'
import { Dialog } from "@material-tailwind/react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { getPointsOfInterest } from '../../getplacesService';
import { getPOIDetails } from '../../getPOIDetails';
   

interface MapComponentProps {
    coordinates: [number, number];
    searchedCity: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ coordinates, searchedCity }): JSX.Element | null => {
    const [locations, setLocations] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
    const mapRef = useRef<L.Map | null>(null);

    const fetchLocations = async () => {
        try {
            const data = await getPointsOfInterest(searchedCity, ...coordinates);
            const formattedLocations = data.map((item: any) => ({
                name: item.name,
                id: item.id,
                latitude: item.latitude,
                longitude: item.longitude,
                description: item.description || 'No description available',
                picture: item.picture || 'https://via.placeholder.com/200',
            }));
            setLocations(formattedLocations);
        } catch (error) {
            console.error('Error fetching points of interest:', error);
        }
    };

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView(coordinates, 14);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapRef.current);
        }
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [coordinates]);

    useEffect(() => {
        fetchLocations();
    }, [coordinates]);

    useEffect(() => {
        if (locations.length > 0 && mapRef.current) {
            locations.forEach((location) => {
                if (location.latitude && location.longitude) {
                    const marker = L.marker([location.latitude, location.longitude])
                        .addTo(mapRef.current)
                        .bindPopup(`<b>${location.name}</b>`);

                    marker.on('click', () => handleMarkerClick(location));
                } else {
                    console.warn('Invalid location coordinates:', location);
                }
            });
        }
    }, [locations]);

    // Handle marker click - fetch details and update state
    //show modal
    const handleMarkerClick = async (location: any) => {
        setLoadingDetails(true); // Show loading indicator
        try {
            const details = await getPOIDetails(location.id); // Fetch details using ID
            setSelectedLocation({
                ...location,
                name: details.name || location.name,
                description: details.description || location.description,
                phone: details.phone || 'No phone available',
                pictures: details.images.map((img: any) => img.photo_reference) || [location.picture],
            });
            setShowModal(true);
            setOpen(!open);
        } catch (error) {
            console.error('Error fetching POI details:', error);
        } finally {
            setLoadingDetails(false);
        }
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false); // Close modal
        setSelectedLocation(null); // Clear selected location
        setOpen(!open)
    };
    const [open, setOpen] = React.useState(false);


    return (
        <>
            <div id="map" style={{ height: '100%', width: '100%' }}></div>

            <Dialog 
                open={open} 
                size="sm"
                handler={handleCloseModal}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                  }}
            >
                {selectedLocation && (
                    <div className="flex flex-row justify-center p-4 rounded-lg shadow-lg">

                        {/* Left Section: Image */}

                        <div className="mr-5 flex-grow-0 flex-shrink-0 basis-[250px]">
                            <img
                                src={`http://localhost:3000/google/photo?photoReference=${selectedLocation.pictures[0]}`}
                                alt={selectedLocation.name}
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                        </div>

                        {/* Right Section: Details */}
                        
                        <div className="flex flex-col h-full">
                            <button className="ml-auto cursor-pointer" onClick={handleCloseModal} > 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
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
                                <button className="bg-blue-500 px-3 py-2 rounded-lg">Contact</button>
                                <button className="bg-blue-500 px-3 py-2 rounded-lg">Add to Favorites</button>
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>
        </>
    );
};

export default MapComponent;