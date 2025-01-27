import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent: React.FC = () => {
    useEffect(() => {
        // Initialize the map
        const map = L.map('map').setView([41.39165, 2.164772], 14);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Data
        const locations = [
            {
                name: 'Casa Batlló',
                latitude: 41.39165,
                longitude: 2.164772,
            },
            {
                name: 'La Pepita',
                latitude: 41.397987,
                longitude: 2.161159,
            },
            {
                name: 'Brunch & Cake',
                latitude: 41.38827,
                longitude: 2.161604,
            },
            // Add more locations here
        ];

        // Add markers for each location
        locations.forEach((location) => {
            L.marker([location.latitude, location.longitude])
                .addTo(map)
                .bindPopup(`<b>${location.name}</b>`)
                .openPopup();
        });

        // Cleanup map on component unmount
        return () => {
            map.remove();
        };
    }, []);

    return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;
