import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine"; // Import Routing Machine

const streetConnectedFavorites = [
    { name: "Berlin Hauptbahnhof", latitude: 52.5251, longitude: 13.3694 }, // Start Point
    { name: "Alexanderplatz", latitude: 52.5219, longitude: 13.4132 },
    { name: "Checkpoint Charlie", latitude: 52.5076, longitude: 13.3904 },
    { name: "Potsdamer Platz", latitude: 52.5096, longitude: 13.3759 },
    { name: "Kurfürstendamm", latitude: 52.5030, longitude: 13.3327 } // End Point
];

interface PathTourProps {
    map: L.Map | null;
}

const PathTour: React.FC<PathTourProps> = ({ map }) => {
    useEffect(() => {
        if (!map || streetConnectedFavorites.length < 2) return;

        // Create routing control WITHOUT instructions panel
        const routingControl = L.Routing.control({
            waypoints: streetConnectedFavorites.map((place) =>
                L.latLng(place.latitude, place.longitude)
            ),
            routeWhileDragging: true,
            createMarker: function (i, waypoint, n) {
                // Define colors for start, end, and waypoints
                let color = i === 0 ? "green" : i === streetConnectedFavorites.length - 1 ? "red" : "blue";

                // Use Leaflet's circle marker instead of icons
                return L.circleMarker(waypoint.latLng, {
                    radius: 10, // Size of the marker
                    fillColor: color,
                    color: "black", // Outer stroke
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.9
                }).bindTooltip(`${streetConnectedFavorites[i].name}`, { permanent: false });
            },
            lineOptions: {
                styles: [{ color: "blue", weight: 4 }]
            },
            show: false, //  Hide instructions
            addWaypoints: false,
            draggableWaypoints: false
        }).addTo(map);

        //  Remove instructions panel if it still appears
        setTimeout(() => {
            const instructionsPanel = document.querySelector(".leaflet-routing-container");
            if (instructionsPanel) instructionsPanel.remove();
        }, 500);

        return () => {
            if (routingControl) {
                map.removeControl(routingControl);
            }
        };
    }, [map]);

    return null;
};

export default PathTour;
