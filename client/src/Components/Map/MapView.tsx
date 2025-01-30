'use strict'
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getPointsOfInterest } from '../../getplacesService';
import { getPOIDetails } from '../../getPOIDetails';

interface MapComponentProps {
    coordinates: [number, number];
    searchedCity: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ coordinates, searchedCity }): JSX.Element | null => {
    const [locations, setLocations] = useState<any[]>([]);
    const mapRef = useRef<L.Map | null>(null);

    const fetchLocations = async () => {
        try {
            const data = await getPointsOfInterest(searchedCity, coordinates[0], coordinates[1]);
            const formattedLocations = data.map((item: any) => ({
                name: item.name,
                id: item.id,
                latitude: item.latitude,
                longitude: item.longitude,
            }));
            /* TODO:Elimiar las siguientes 2 lineas */
            const details = await getPOIDetails('ChIJO5k2-JOipBIRxfDsj5VkasE')
            console.log(details);

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
                if (mapRef.current) {
                    L.marker([location.latitude, location.longitude])
                        .addTo(mapRef.current)
                        .bindPopup(`<b>${location.name}</b>`)
                }
            });
        }
    }, [locations]);

    return <div id="map" style={{
        height: '100%',
        width: '100%',
    }}></div>;
};

export default MapComponent;
