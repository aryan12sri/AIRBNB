
mapboxgl.accessToken =maptoken;
  const map = new mapboxgl.Map({
      container: 'map', // container ID
      center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 9 // starting zoom  
  });


  const popup = new mapboxgl.Popup({ offset: 25 }).setText(
    `${listing.location}`
); 


  const marker1 = new mapboxgl.Marker()
  .setLngLat(listing.geometry.coordinates)
  .setPopup(popup)
  .addTo(map);


