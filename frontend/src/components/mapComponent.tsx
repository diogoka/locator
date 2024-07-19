import React, { useState, useEffect } from 'react';
import {
    Map,
    MapMouseEvent,
    Marker,
    AdvancedMarker,
    useMap,
    useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { LocationType, Poi, DirectionsType } from '@/types/types';
import PoiMarkers from './poiMarkers';
import { locations } from '@/locations/poi';
import ModalNewPoi from './modalNewPoi';
import Directions from './direction';

type Props = {
    currentPosition: LocationType;
};

const MapComponent = ({ currentPosition }: Props) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [tempPoi, setTempPoi] = useState<Poi>();

    const [hasDirection, setHasDirection] = useState<boolean>(false);
    const [directions, setDirections] = useState<DirectionsType>({
        destination: {
            lat: 0,
            lng: 0,
        },
    });

    const [isDirectionModalOpen, setIsDirectionModalOpen] =
        useState<boolean>(false);
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

    const addNewTempPoi = (location: LocationType) => {
        setTempPoi({
            key: '',
            location: {
                lat: location.latitude,
                lng: location.longitude,
            },
        });

        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const addNewPoiFn = (key: string) => {
        const newPoint: Poi = {
            key: key,
            location: {
                lat: tempPoi?.location.lat || 0,
                lng: tempPoi?.location.lng || 0,
            },
        };
        setTempMarkers((prev) => [...prev, newPoint]);
        setModalOpen(false);
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
                        addNewTempPoi({
                            latitude: event.detail.latLng?.lat!,
                            longitude: event.detail.latLng?.lng!,
                        });
                    }}
                    mapId={process.env.NEXT_PUBLIC_MAP_ID}
                    mapTypeId={'terrain'}
                >
                    <PoiMarkers
                        pois={tempMarkers}
                        setDirections={setDirections}
                        setHasDirection={setHasDirection}
                    />
                    <AdvancedMarker
                        // This is HOME. Need to change the Pin
                        position={{
                            lat: currentPosition.latitude,
                            lng: currentPosition.longitude,
                        }}
                        clickable={true}
                    />
                    {hasDirection && (
                        <Directions map={map!} directions={directions} />
                    )}
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
