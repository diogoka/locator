import { DirectionsType } from '@/types/types';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';
import { useLocationStore } from '@/store/locationStore';
import { Card, CardTitle, CardHeader } from '@/components/ui/card';
import { VscTriangleRight } from 'react-icons/vsc';

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
        <Card className='absolute top-0 right-0 p-4 rounded-lg mr-5 mt-5 shadow-2xl'>
            <CardHeader className='p-0'>
                <CardTitle className='text-lg font-bold'>
                    Selected Route:{' '}
                </CardTitle>
                <h1 className='pl-2'>
                    <strong>Route name: </strong>
                    {selected.summary}
                </h1>
            </CardHeader>
            <p className='pl-2'>
                <strong>Directions: </strong>
                {''}
                {leg.start_address.split(',')[0]} to{' '}
                {leg.end_address.split(',')[0]}
            </p>
            <h4 className='pl-2'>
                <strong>Distance: </strong> {leg.distance?.text}
            </h4>
            <h4 className='pl-2'>
                <strong>Duration: </strong>
                {leg.duration?.text}
            </h4>

            {routes.length > 1 && (
                <>
                    <h1 className='text-lg mt-3 font-bold'>Other Routes: </h1>
                    <ul>
                        {routes.map((route, index) => (
                            <li
                                key={route.summary}
                                className='flex items-center'
                            >
                                {routeIndex === index ? (
                                    <button
                                        onClick={() => setRouteIndex(index)}
                                        className='flex items-center mb-1 pl-2 bg-slate-600/20 rounded-sm pr-2'
                                    >
                                        <VscTriangleRight />
                                        {route.summary}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setRouteIndex(index)}
                                        className='flex items-center mb-1 pl-2h'
                                    >
                                        <VscTriangleRight />
                                        {route.summary}
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </Card>
    );
};

export default Directions;
