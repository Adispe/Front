import MapOptions= google.maps.MapOptions;
export const MapOption:MapOptions = {
    zoom : 40,
    
    mapTypeId: "hybrid",
    maxZoom: 15,
    minZoom: 8,
    disableDefaultUI: true,
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    draggableCursor: 'grab',
    draggable: true,
    styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ visibility: 'off' }]
      }
    ],
};