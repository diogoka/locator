import React, { Dispatch, SetStateAction, useState } from 'react';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { DirectionsType, Poi } from '@/types/types';
import ModalPoi from './modalPoi';
import { TbFountainFilled } from 'react-icons/tb';

type Props = {
    poi: Poi;
    setDirections: Dispatch<SetStateAction<DirectionsType>>;
    setHasDirection: (status: boolean) => void;
};

const PoiMarkerItem = ({ poi, setDirections, setHasDirection }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [actualPoi, setActualPoi] = useState<Poi>(poi);

    const updatePoi = async (name: string, location: string, id: string) => {
        const updatingPoi = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    newName: name,
                    newLocation: location,
                }),
            }
        );

        const updatedPoi = await updatingPoi.json();
        setActualPoi(updatedPoi);
    };

    const navigate = () => {
        setHasDirection(true);
        setDirections((prevState) => ({
            ...prevState,
            destination: {
                lat: poi.latitude!,
                lng: poi.longitude!,
            },
        }));
        setIsModalOpen(false);
    };
    return (
        <>
            <AdvancedMarker
                key={poi._id}
                position={{ lat: poi.latitude!, lng: poi.longitude! }}
                clickable={true}
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                <TbFountainFilled size={30} />
            </AdvancedMarker>
            <ModalPoi
                isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                navigate={navigate}
                poi={actualPoi}
                updatePoi={updatePoi}
            />
        </>
    );
};

export default PoiMarkerItem;
