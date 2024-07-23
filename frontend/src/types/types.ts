export type LocationType = {
    latitude: number;
    longitude: number;
};

export type Poi = {
    _id: string;
    name: string;
    location: string;
    latLng: google.maps.LatLngLiteral;
    latitude?: number;
    longitude?: number;
};

export type DirectionsType = {
    destination: google.maps.LatLngLiteral;
};
