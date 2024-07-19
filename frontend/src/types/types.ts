export type LocationType = {
    latitude: number;
    longitude: number;
};

export type Poi = {
    key: string;
    location: google.maps.LatLngLiteral;
};

export type DirectionsType = {
    destination: google.maps.LatLngLiteral;
};
