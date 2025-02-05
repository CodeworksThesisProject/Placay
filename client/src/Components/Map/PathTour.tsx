import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

interface PathTourProps {
  points: { name: string; latitude: number; longitude: number }[];
}

const PathTour: React.FC<PathTourProps> = ({ points }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || points.length < 1) return;

    // Create the map
    const map = L.map(mapContainerRef.current).setView([points[0].latitude, points[0].longitude], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    // Create the routre
    const routingControl = L.Routing.control({
      waypoints: points.map(p => L.latLng(p.latitude, p.longitude)),
      routeWhileDragging: true,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      createMarker: (i: number, waypoint: L.LatLng, n: number) => {

        // Markers personalization
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
        styles: [{ color: "blue", weight: 4 }] // Personalización de la ruta: azul y grosor 4
      },
      router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" })
    }).addTo(map);

    // Remove instructions
    setTimeout(() => {
      const instructionsPanel = document.querySelector(".leaflet-routing-container");
      if (instructionsPanel) instructionsPanel.remove();
    }, 100);

    // Unmount
    return () => {
      routingControl.remove();
      map.remove();
    };
  }, [points]);

  return <div ref={mapContainerRef} className="h-full w-full rounded-lg shadow-md"></div>;
};

export default PathTour;
