import React, { useState } from 'react';


const TourDetail = () => {

  const [liked, setLiked] = useState<boolean>(false);

  return (
      <div className="flex flex-col gap-3 w-xs bg-white p-3 rounded-xs shadow-sm" >

            <div className="header flex flex-row justify-between text-gray-800 mx-5">
              <div className="flex flex-row gap-2 text-sm items-center">
                <p>title of route</p>
              </div>

              <div className="flex flex-row gap-2 text-sm items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p>2 days tour</p>
              </div>

            </div>

            <div className="map">

              <img src="../../../asserts/images/tours/map.png" className="px-5" alt="map" />
              {/* TODO mapview with router should be shown here */}
            </div>

            <div className="tour-locations grid grid-cols-2 gap-4">
              <div className="px-4 flex flex-row gap-3">
                <img
                  src="../../../asserts/images/tours/tv-tower.png"
                  className="w-8 h-8 object-cover rounded-full shadow-sm"
                  alt="picture of location"
                  />
                <div className="flex flex-col">
                  <p className="text-xs">Berlin, Germany</p>
                  <p className="text-[10px] text-gray-500">TV Tower</p>
                </div>
              </div>

              <div className="px-4 flex flex-row gap-3">
                <img
                  src="../../../asserts/images/tours/brandenburg.png"
                  className="w-8 h-8 object-cover rounded-full shadow-sm"
                  alt="picture of location"
                  />
                <div className="flex flex-col">
                  <p className="text-xs">Berlin, Germany</p>
                  <p className="text-[10px] text-gray-500">Brandenburg Gate</p>
                </div>
              </div>

              <div className="px-4 flex flex-row gap-3">
                <img
                  src="../../../asserts/images/tours/catedral.png"
                  className="w-8 h-8 object-cover rounded-full shadow-sm"
                  alt="picture of location"
                  />
                <div className="flex flex-col">
                  <p className="text-xs">Berlin, Germany</p>
                  <p className="text-[10px] text-gray-500">Berlin Cathedral</p>
                </div>
              </div>

              <div className="px-4 flex flex-row gap-3">
                <img
                  src="../../../asserts/images/tours/zoo.png"
                  className="w-8 h-8 object-cover rounded-full shadow-sm"
                  alt="picture of location"
                  />
                <div className="flex flex-col">
                  <p className="text-xs">Berlin, Germany</p>
                  <p className="text-[10px] text-gray-500">Zoological Garden</p>
                </div>
              </div>

              <div className="px-4 flex flex-row gap-3">
                <img
                  src="../../../asserts/images/tours/east-side-gallery.png"
                  className="w-8 h-8 object-cover rounded-full shadow-sm"
                  alt="picture of location"
                />
                <div className="flex flex-col">
                  <p className="text-xs">Berlin, Germany</p>
                  <p className="text-[10px] text-gray-500">East Side Gallery</p>
                </div>
              </div>
            </div>

            <div className="border-t-1 border-gray-200 flex flex-row gap-3 items-center pt-3 pl-2 text-gray-600">

            <div className="cursor-pointer" onClick={() => setLiked(!liked)}>
              {!liked ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              )}
            </div>


              <p>23 likes</p>


            </div>
        </div>
  );
};

export default TourDetail
