import React, { useState, useEffect } from 'react';
import {
    Map,
    MapMouseEvent,
    Marker,
    AdvancedMarker,
    useMap,
    useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { LocationType, Poi } from '@/types/types';
import PoiMarkers from './poiMarkers';
import { locations } from '@/locations/poi';
import ModalNewPoi from './modalNewPoi';

type Props = {
    currentPosition: LocationType;
};

const MapComponent = ({ currentPosition }: Props) => {
    console.log('current', currentPosition);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [tempPoi, setTempPoi] = useState<LocationType>();
    const map = useMap();

    const [tempMarkers, setTempMarkers] = useState<Poi[]>([
        {
            key: 'steamClock',
            location: { lat: 49.284416, lng: -123.108978 },
        },
    ]);

    useEffect(() => {
        map?.panTo({
            lat: currentPosition.latitude,
            lng: currentPosition.longitude,
        });
    }, [currentPosition, map]);

    const newPoi = (location: LocationType) => {
        console.log('poi', location);
        setTempPoi(location);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const addNewPoiFn = () => {
        const newPoint: Poi = {
            key: 'new',
            location: {
                lat: tempPoi?.latitude || 0,
                lng: tempPoi?.longitude || 0,
            },
        };
        setTempMarkers((prev) => [...prev, newPoint]);
        setModalOpen(false);
    };

    const Directions = () => {
        const routesLibrary = useMapsLibrary('routes');
        const [directionService, setDirectionService] =
            useState<google.maps.DirectionsService>();

        const [directionRenderer, setDirectionRenderer] =
            useState<google.maps.DirectionsRenderer>();

        const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);

        useEffect(() => {
            if (!routesLibrary || !map) return;
            setDirectionService(new routesLibrary.DirectionsService());
            setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
        }, [routesLibrary, map]);

        useEffect(() => {
            if (!directionRenderer || !directionService) return;

            directionService
                .route({
                    origin: {
                        lat: 49.281044,
                        lng: -123.1200799,
                    },
                    destination: {
                        lat: 49.284066600430286,
                        lng: -123.11575064404046,
                    },
                    travelMode: google.maps.TravelMode.WALKING,
                    provideRouteAlternatives: true,
                })
                .then((res) => {
                    directionRenderer.setDirections(res);
                    setRoutes(res.routes);
                });
        }, [directionService, directionRenderer]);

        console.log('directionsService', directionService);
        console.log('routes', routes);

        return null;
    };

    return (
        <>
            <div className='w-full'>
                <Map
                    style={{ width: '100%', height: '80vh' }}
                    defaultCenter={{
                        lat: currentPosition.latitude,
                        lng: currentPosition.longitude,
                    }}
                    defaultZoom={17}
                    disableDefaultUI={true}
                    gestureHandling={'greedy'}
                    onClick={(event: MapMouseEvent) => {
                        console.log('event', event);

                        if (!event.detail.placeId) {
                            newPoi({
                                latitude: event.detail.latLng?.lat!,
                                longitude: event.detail.latLng?.lng!,
                            });
                        } else {
                            console.log('Open options');
                        }
                    }}
                    mapId={process.env.NEXT_PUBLIC_MAP_ID}
                    mapTypeId={'terrain'}
                >
                    <PoiMarkers pois={tempMarkers} />
                    <AdvancedMarker
                        position={{
                            lat: currentPosition.latitude,
                            lng: currentPosition.longitude,
                        }}
                        clickable={true}
                    />
                    <Directions />
                </Map>
                <ModalNewPoi
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    newPoi={addNewPoiFn}
                />
            </div>
        </>
    );
};

export default MapComponent;
