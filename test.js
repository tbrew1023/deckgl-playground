function test({ viewState }) {
    console.log(viewState);
}

test({viewState:{
    longitude: -70.4,
    latitude: 40.7,
    zoom: 11,
    bearing: 10.125,
    pitch: 0
}});