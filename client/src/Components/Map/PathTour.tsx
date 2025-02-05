import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine"; // Import Routing Machine

interface PathTourProps {
    map: L.Map | null;
    points: { name: string; latitude: number; longitude: number }[];
}

const PathTour: React.FC<PathTourProps> = ({ map, points }) => {
    useEffect(() => {
        if (!map || points.length < 2) return;

        console.log("Creating route with points:", points); // Debugging

        // Create the route
        const routingControl = L.Routing.control({
            waypoints: points.map(place => L.latLng(place.latitude, place.longitude)),
            routeWhileDragging: true,
            fitSelectedRoutes: true, // Ensures map fits to route
            createMarker: (i, waypoint, n) => {
                const color = i === 0 ? "green" : i === points.length - 1 ? "red" : "blue";
                return L.circleMarker(waypoint.latLng, {
                    radius: 8,
                    fillColor: color,
                    color: "black",
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.9
                }).bindTooltip(points[i].name, { permanent: false });
            },
            lineOptions: {
                styles: [{ color: "blue", weight: 4 }]
            },
            show: false,
            addWaypoints: false,
            draggableWaypoints: false,
            router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" }) // OSRM routing
        }).addTo(map);

        // Manually remove instruction panel(extra safety)
        setTimeout(() => {
            const instructionsPanel = document.querySelector(".leaflet-routing-container");
            if (instructionsPanel) instructionsPanel.remove();
        }, 500);

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, points]);

    return null;
};

export default PathTour;
