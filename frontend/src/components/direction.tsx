import { DirectionsType } from '@/types/types';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';
import { useLocationStore } from '@/store/locationStore';

type Props = {
    map: google.maps.Map;
    directions: DirectionsType;
};

const Directions = ({ map, directions }: Props) => {
    const currentOrigin = useLocationStore((state) => state.location);
    const routesLibrary = useMapsLibrary('routes');
    const [directionService, setDirectionService] =
        useState<google.maps.DirectionsService>();

    const [directionRenderer, setDirectionRenderer] =
        useState<google.maps.DirectionsRenderer>();

    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState<number>(0);

    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    useEffect(() => {
        if (!routesLibrary || !map || !directions.destination) return;
        setDirectionService(new routesLibrary.DirectionsService());
        setDirectionRenderer(
            new routesLibrary.DirectionsRenderer({
                map,
                suppressMarkers: true,
                suppressInfoWindows: true,
            })
        );
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionRenderer || !directionService || !directions.destination)
            return;

        const origin = {
            lat: currentOrigin?.latitude ?? 0,
            lng: currentOrigin?.longitude ?? 0,
        };

        directionService
            .route({
                origin: {
                    lat: origin.lat,
                    lng: origin.lng,
                },
                destination: {
                    lat: directions.destination.lat,
                    lng: directions.destination.lng,
                },
                travelMode: google.maps.TravelMode.WALKING,
                provideRouteAlternatives: true,
            })
            .then((res) => {
                directionRenderer.setDirections(res);
                setRoutes(res.routes);
            });
    }, [directionService, directionRenderer, directions]);

    useEffect(() => {
        if (!directionRenderer) return;
        directionRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionRenderer]);

    if (!leg) return null;

    return (
        <div className='directions z-50'>
            <h2>{selected.summary}</h2>
            <p>
                from {''}
                {leg.start_address.split(',')[0]} to{' '}
                {leg.end_address.split(',')[0]}
            </p>
            <h4>Distance: {leg.distance?.text}</h4>
            <h4>Duration: {leg.duration?.text}</h4>
            <h2>Other Routes</h2>
            <ul>
                {routes.map((route, index) => (
                    <li key={route.summary}>
                        <button onClick={() => setRouteIndex(index)}>
                            {route.summary}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Directions;
