'use client';
import React, { useState, useEffect } from 'react';
import { APIProvider, Map, MapMouseEvent } from '@vis.gl/react-google-maps';
import { LocationType } from '@/types/types';
import MapComponent from './mapComponent';

const MapProvider = () => {
    const [currentPosition, setCurrentPosition] = useState<LocationType>({
        latitude: 49.246292,
        longitude: -123.116226,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude, longitude } = coords;
                setCurrentPosition(() => ({
                    latitude: latitude,
                    longitude: longitude,
                }));
            },
            (error) => {
                console.error('error: ', error);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}>
            <MapComponent currentPosition={currentPosition} />
        </APIProvider>
    );
};

export default MapProvider;
