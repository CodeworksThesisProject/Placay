export default function ListOfUserTours( {profileActive }) {
  return (
    <div className={`tour flex flex-col gap-5  ${profileActive? 'hidden': ''}`}>
        <a 
        href="/" 
        className="bg-blue-500 ml-auto text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex text-center"
        >
          Add New Tour
        </a>

        <div className="divider w-full h-0.5 bg-gray-200"></div>
          
        <div className="flex flex-row flex-wrap gap-5 justify-start">
        
          {/* -------------------------------------------------- */}
          <div className="flex flex-col gap-3 w-sm bg-white p-3 rounded-xs shadow-sm" >
            
            <div className="header flex flex-row justify-between text-gray-800 mx-5">
              <div className="flex flex-row gap-2 text-sm items-center">
                <p>title of route</p>
              </div>

              <div className="flex flex-row gap-2 text-sm items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p>2 days tour</p>
              </div>

            </div>

            <div className="map">

              <img src="../../asserts/images/tours/map.png" className="px-5" alt="map" />
              {/* TODO mapview with router should be shown here */}
            </div>

            <div className="tour-locations grid grid-cols-2 gap-4">
              <div className="px-4 flex flex-row gap-3">
                <img 
                  src="../../asserts/images/tours/tv-tower.png" 
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
                  src="../../asserts/images/tours/brandenburg.png" 
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
                  src="../../asserts/images/tours/catedral.png" 
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
                  src="../../asserts/images/tours/zoo.png" 
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
                  src="../../asserts/images/tours/east-side-gallery.png" 
                  className="w-8 h-8 object-cover rounded-full shadow-sm" 
                  alt="picture of location"  
                />
                <div className="flex flex-col">
                  <p className="text-xs">Berlin, Germany</p>
                  <p className="text-[10px] text-gray-500">East Side Gallery</p>
                </div>
              </div>
            </div>
          </div>
          {/* -------------------------------------------------- */}
          <div className="flex flex-col gap-3  w-sm bg-white p-3 rounded-xs shadow-sm" >
            
            <div className="header flex flex-row justify-between text-gray-800 mx-5">
              <div className="flex flex-row gap-2 text-sm items-center">
                <p>title of route</p>
              </div>

              <div className="flex flex-row gap-2 text-sm items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p>2 days tour</p>
              </div>

            </div>

            <div className="map">
              <img src="../../asserts/images/tours/map.png" className="px-5" alt="map" />
              {/* TODO mapview with router should be shown here */}
            </div>

            <div className="tour-locations grid grid-cols-2 gap-4">
              <div className="px-4 flex flex-row gap-3">
                <img 
                  src="../../asserts/images/tours/tv-tower.png" 
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
                  src="../../asserts/images/tours/brandenburg.png" 
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
                  src="../../asserts/images/tours/catedral.png" 
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
                  src="../../asserts/images/tours/zoo.png" 
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
                  src="../../asserts/images/tours/east-side-gallery.png" 
                  className="w-8 h-8 object-cover rounded-full shadow-sm" 
                  alt="picture of location"  
                />
                <div className="flex flex-col">
                  <p className="text-xs">Berlin, Germany</p>
                  <p className="text-[10px] text-gray-500">East Side Gallery</p>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------- */}
          <div className="flex flex-col gap-3  w-sm bg-white p-3 rounded-xs shadow-sm" >
            
            <div className="header flex flex-row justify-between text-gray-800 mx-5">
              <div className="flex flex-row gap-2 text-sm items-center">
                <p>title of route</p>
              </div>

              <div className="flex flex-row gap-2 text-sm items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p>2 days tour</p>
              </div>

            </div>

            <div className="map">
              <img src="../../asserts/images/tours/map.png" className="px-5" alt="map" />
              {/* TODO mapview with router should be shown here */}
            </div>

            <div className="tour-locations grid grid-cols-2 gap-4">
              <div className="px-4 flex flex-row gap-3">
                <img 
                  src="../../asserts/images/tours/tv-tower.png" 
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
                  src="../../asserts/images/tours/brandenburg.png" 
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
                  src="../../asserts/images/tours/catedral.png" 
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
                  src="../../asserts/images/tours/zoo.png" 
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
                  src="../../asserts/images/tours/east-side-gallery.png" 
                  className="w-8 h-8 object-cover rounded-full shadow-sm" 
                  alt="picture of location"  
                />
                <div className="flex flex-col">
                  <p className="text-xs">Berlin, Germany</p>
                  <p className="text-[10px] text-gray-500">East Side Gallery</p>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------- */}
          <div className="flex flex-col gap-3  w-sm bg-white p-3 rounded-xs shadow-sm" >
            
            <div className="header flex flex-row justify-between text-gray-800 mx-5">
              <div className="flex flex-row gap-2 text-sm items-center">
                <p>title of route</p>
              </div>

              <div className="flex flex-row gap-2 text-sm items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p>2 days tour</p>
              </div>

            </div>

            <div className="map">
            <img src="../../asserts/images/tours/map.png" className="px-5" alt="map" />
              {/* TODO mapview with router should be shown here */}
            </div>

            <div className="tour-locations grid grid-cols-2 gap-4">
              <div className="px-4 flex flex-row gap-3">
                <img 
                  src="../../asserts/images/tours/tv-tower.png" 
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
                  src="../../asserts/images/tours/brandenburg.png" 
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
                  src="../../asserts/images/tours/catedral.png" 
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
                  src="../../asserts/images/tours/zoo.png" 
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
                  src="../../asserts/images/tours/east-side-gallery.png" 
                  className="w-8 h-8 object-cover rounded-full shadow-sm" 
                  alt="picture of location"  
                />
                <div className="flex flex-col">
                  <p className="text-xs">Berlin, Germany</p>
                  <p className="text-[10px] text-gray-500">East Side Gallery</p>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------- */}
          <div className="flex flex-col gap-3  w-sm bg-white p-3 rounded-xs shadow-sm" >
            
            <div className="header flex flex-row justify-between text-gray-800 mx-5">
              <div className="flex flex-row gap-2 text-sm items-center">
                <p>title of route</p>
              </div>

              <div className="flex flex-row gap-2 text-sm items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p>2 days tour</p>
              </div>

            </div>

            <div className="map">
            <img src="../../asserts/images/tours/map.png" className="px-5" alt="map" />
              {/* TODO mapview with router should be shown here */}
            </div>

            <div className="tour-locations grid grid-cols-2 gap-4">
              <div className="px-4 flex flex-row gap-3">
                <img 
                  src="../../asserts/images/tours/tv-tower.png" 
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
                  src="../../asserts/images/tours/brandenburg.png" 
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
                  src="../../asserts/images/tours/catedral.png" 
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
                  src="../../asserts/images/tours/zoo.png" 
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
                  src="../../asserts/images/tours/east-side-gallery.png" 
                  className="w-8 h-8 object-cover rounded-full shadow-sm" 
                  alt="picture of location"  
                />
                <div className="flex flex-col">
                  <p className="text-xs">Berlin, Germany</p>
                  <p className="text-[10px] text-gray-500">East Side Gallery</p>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------- */}
          <div className="flex flex-col gap-3  w-sm bg-white p-3 rounded-xs shadow-sm" >
            
            <div className="header flex flex-row justify-between text-gray-800 mx-5">
              <div className="flex flex-row gap-2 text-sm items-center">
                <p>title of route</p>
              </div>

              <div className="flex flex-row gap-2 text-sm items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p>2 days tour</p>
              </div>

            </div>

            <div className="map">
            <img src="../../asserts/images/tours/map.png" className="px-5" alt="map" />
              {/* TODO mapview with router should be shown here */}
            </div>

            <div className="tour-locations grid grid-cols-2 gap-4">
              <div className="px-4 flex flex-row gap-3">
                <img 
                  src="../../asserts/images/tours/tv-tower.png" 
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
                  src="../../asserts/images/tours/brandenburg.png" 
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
                  src="../../asserts/images/tours/catedral.png" 
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
                  src="../../asserts/images/tours/zoo.png" 
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
                  src="../../asserts/images/tours/east-side-gallery.png" 
                  className="w-8 h-8 object-cover rounded-full shadow-sm" 
                  alt="picture of location"  
                />
                <div className="flex flex-col">
                  <p className="text-xs">Berlin, Germany</p>
                  <p className="text-[10px] text-gray-500">East Side Gallery</p>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------- */}
          <div className="flex flex-col gap-3  w-sm bg-white p-3 rounded-xs shadow-sm" >
            
            <div className="header flex flex-row justify-between text-gray-800 mx-5">
              <div className="flex flex-row gap-2 text-sm items-center">
                <p>title of route</p>
              </div>

              <div className="flex flex-row gap-2 text-sm items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p>2 days tour</p>
              </div>

            </div>

            <div className="map">
            <img src="../../asserts/images/tours/map.png" className="px-5" alt="map" />
              {/* TODO mapview with router should be shown here */}
            </div>

            <div className="tour-locations grid grid-cols-2 gap-4">
              <div className="px-4 flex flex-row gap-3">
                <img 
                  src="../../asserts/images/tours/tv-tower.png" 
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
                  src="../../asserts/images/tours/brandenburg.png" 
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
                  src="../../asserts/images/tours/catedral.png" 
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
                  src="../../asserts/images/tours/zoo.png" 
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
                  src="../../asserts/images/tours/east-side-gallery.png" 
                  className="w-8 h-8 object-cover rounded-full shadow-sm" 
                  alt="picture of location"  
                />
                <div className="flex flex-col">
                  <p className="text-xs">Berlin, Germany</p>
                  <p className="text-[10px] text-gray-500">East Side Gallery</p>
                </div>
              </div>
            </div>
          </div>

        </div>
    </div>
  );
}