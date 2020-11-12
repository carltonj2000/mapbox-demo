mapboxgl.accessToken = "";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation(position) {
  setupMap([-115.179153, 36.114662]);
}

function setupMap(center) {
  if (!mapboxgl.accessToken) return alert("need a mapbox token to continue");
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center,
    zoom: 14,
  });
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, "top-left");

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: "metric",
    profile: "mapbox/cycling",
  });

  map.addControl(directions, "top-left");
}
