'use strict'
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getPointsOfInterest } from '../../getplacesService';
import { getPOIDetails } from '../../getPOIDetails';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            const data = await getPointsOfInterest(searchedCity, coordinates[0], coordinates[1]);
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
    }, [coordinates, searchedCity]);

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
        } catch (error) {
            console.error('Error fetching POI details:', error);
        } finally {
            setLoadingDetails(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close modal
        setSelectedLocation(null); // Clear selected location
    };

    return (
        <>
            <div id="map" style={{ height: '100%', width: '100%' }}></div>

            {/* Modal for POI Details */}
            <Modal show={showModal} onHide={handleCloseModal} centered className="custom-modal">
                {selectedLocation && (
                    <div className="modal-content flex w-[600px] mx-auto bg-white p-4 rounded-lg shadow-lg">
                        <div className="modal-body flex flex-col md:flex-row w-full">
                            {/* Left Section: Image */}
                            <div className="modal-image" style={{ flex: '0 0 250px', marginRight: '20px' }}>
                                <img
                                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${selectedLocation.pictures[0]}&key=AIzaSyCvozyO1DrWrDC89o80QcD_v3u9um20wlc`}
                                    alt={selectedLocation.name}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                            </div>

                            {/* Right Section: Details */}
                            <div className="modal-info" style={{ flex: '1' }}>
                                <div className="modal-header d-flex justify-content-between">
                                    <h5>{selectedLocation.name}</h5>
                                    <button
                                        className="close-btn btn-close"
                                        onClick={handleCloseModal}
                                    ></button>
                                </div>
                                <div
                                    style={{
                                        maxHeight: '150px',
                                        overflowY: 'auto',
                                        marginBottom: '15px',
                                    }}
                                >
                                    <p>
                                        <strong>Description:</strong> {selectedLocation.description}
                                    </p>
                                </div>
                                <div className="modal-actions">
                                    <button className="btn btn-primary me-2">Contact</button>
                                    <button className="btn btn-secondary">Add to Favorites</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default MapComponent;
