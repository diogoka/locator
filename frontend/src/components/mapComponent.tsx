import React, { useState, useEffect } from 'react';
import {
    Map,
    MapMouseEvent,
    AdvancedMarker,
    useMap,
} from '@vis.gl/react-google-maps';
import { LocationType, Poi, DirectionsType } from '@/types/types';
import PoiMarkers from './poiMarkers';
import ModalNewPoi from './modalNewPoi';
import Directions from './direction';

type Props = {
    currentPosition: LocationType;
};

const MapComponent = ({ currentPosition }: Props) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [tempPoi, setTempPoi] = useState<Poi>();
    const [markers, setMarkers] = useState<Poi[]>();

    const [hasDirection, setHasDirection] = useState<boolean>(false);
    const [directions, setDirections] = useState<DirectionsType>({
        destination: {
            lat: 0,
            lng: 0,
        },
    });

    const map = useMap();

    const getPois = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
        const pois = await res.json();
        setMarkers(pois);
    };

    useEffect(() => {
        getPois();
        map?.setMapTypeId(process.env.NEXT_PUBLIC_MAP_ID!);
    }, []);

    useEffect(() => {
        map?.panTo({
            lat: currentPosition.latitude,
            lng: currentPosition.longitude,
        });
    }, [currentPosition, map]);

    const addNewTempPoi = (location: LocationType) => {
        setTempPoi({
            _id: '',
            name: '',
            location: '',
            latLng: {
                lat: location.latitude,
                lng: location.longitude,
            },
        });

        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const addNewPoiFn = async (name: string, location: string) => {
        const newPoint: Poi = {
            _id: '',
            name: name,
            location: location,
            latLng: {
                lat: tempPoi?.latLng.lat || 0,
                lng: tempPoi?.latLng.lng || 0,
            },
        };

        const newPoi = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newPoint.name,
                location: newPoint.location,
                latitude: newPoint.latLng.lat,
                longitude: newPoint.latLng.lng,
            }),
        });

        const poi = await newPoi.json();
        setMarkers((prev) => [...prev!, poi.newPoi]);
        setModalOpen(false);
    };

    return (
        <div className='w-full h-full'>
            <Map
                defaultCenter={{
                    lat: currentPosition.latitude,
                    lng: currentPosition.longitude,
                }}
                defaultZoom={17}
                disableDefaultUI={true}
                gestureHandling={'greedy'}
                onClick={(event: MapMouseEvent) => {
                    addNewTempPoi({
                        latitude: event.detail.latLng?.lat!,
                        longitude: event.detail.latLng?.lng!,
                    });
                }}
                mapId={process.env.NEXT_PUBLIC_MAP_ID}
            >
                <PoiMarkers
                    pois={markers!}
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
    );
};

export default MapComponent;
