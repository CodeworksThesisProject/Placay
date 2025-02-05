import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PathTour from "../Components/Map/PathTour";
import TourDetail from "../Components/Tour/TourDetail";

const Tour = () => {

  return (
    <div className="flex flex-row h-screen p-5 gap-4">
      {/* Map Section */}
      <div className="flex-1 relative h-full">
        <div id="map" className="h-full w-full rounded-lg shadow-md"></div>
        {mapLoaded && mapRef.current && <PathTour map={mapRef.current} points={tourPoints} />}
      </div>

      {/* Right Section: Tour Details */}
      <div className="w-[30%] max-w-md flex flex-col gap-4 overflow-y-auto max-h-screen">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">Tour Details</h2>
          <div className="flex flex-col gap-4 shadow-lg">
            <TourDetail />
            <TourDetail />
            <TourDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;
