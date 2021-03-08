const MAPBOX_TOKEN = 'pk.eyJ1IjoidHJlbnRicmV3IiwiYSI6ImNrbHliamhwNTA3cG8ydm1yZzN3MHI1NTIifQ.rOLxTdO6kJNGlYsQ_2IKaA';

const DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json';

const MAP_STYLES = {
    'satellite': 'mapbox://styles/mapbox/satellite-v9',
    'dark': 'mapbox://styles/mapbox/dark-v10',
    'light': 'mapbox://styles/mapbox/light-v9'
}

const INITIAL_VIEW_STATE = {
  latitude: 37.7749,
  longitude: -122.4194,
  zoom: 11,
  maxZoom: 16,
  pitch: 45,
  bearing: 0
}

const MAPBOX_SETTINGS = {
    accessToken: MAPBOX_TOKEN,
    container: 'map',
    width: '100%',
    height: '100vh',
    style: MAP_STYLES.dark,
    interactive: false,
    center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
    zoom: INITIAL_VIEW_STATE.zoom,
    bearing: INITIAL_VIEW_STATE.bearing,
    pitch: INITIAL_VIEW_STATE.pitch
}

const DECKGL_SETTINGS = {
    canvas: "deck-canvas",
    width: "100%",
    height: "100vh",
    controller: true,
    useDevicePixels: false,
    viewState: INITIAL_VIEW_STATE,
}    

export {MAPBOX_SETTINGS, DECKGL_SETTINGS, DATA_URL}