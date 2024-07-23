import { Poi, DirectionsType } from '@/types/types';
import PoiMarkerItem from './poiMarkerItem';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    pois: Poi[];
    setDirections: Dispatch<SetStateAction<DirectionsType>>;
    setHasDirection: (status: boolean) => void;
};

const PoiMarkers = ({ pois, setDirections, setHasDirection }: Props) => {
    return (
        <>
            {pois &&
                pois.map((poi: Poi) => (
                    <PoiMarkerItem
                        poi={poi}
                        key={poi._id}
                        setDirections={setDirections}
                        setHasDirection={setHasDirection}
                    />
                ))}
        </>
    );
};

export default PoiMarkers;
