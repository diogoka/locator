import React, { Dispatch, SetStateAction, useState } from 'react';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { DirectionsType, Poi } from '@/types/types';
import ModalPoi from './modalPoi';

type Props = {
    poi: Poi;
    setDirections: Dispatch<SetStateAction<DirectionsType>>;
    setHasDirection: (status: boolean) => void;
};

const PoiMarkerItem = ({ poi, setDirections, setHasDirection }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const navigate = () => {
        setHasDirection(true);
        setDirections((prevState) => ({
            ...prevState,
            destination: {
                lat: poi.location.lat,
                lng: poi.location.lng,
            },
        }));
        setIsModalOpen(false);
    };
    return (
        <>
            <AdvancedMarker
                key={poi.key}
                position={poi.location}
                clickable={true}
                onClick={(e: any) => {
                    console.log('marker click', e.pixel);
                    setIsModalOpen(true);
                }}
            >
                <Pin
                    background={'#FBBC04'}
                    glyphColor={'#000'}
                    borderColor={'#000'}
                />
            </AdvancedMarker>
            <ModalPoi isOpen={isModalOpen} navigate={navigate} />
        </>
    );
};

export default PoiMarkerItem;
