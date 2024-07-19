import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import React from 'react';
import { Poi } from '@/types/types';

type Props = {
    pois: Poi[];
};

const PoiMarkers = ({ pois }: Props) => {
    console.log('props', pois);

    return (
        <>
            {pois.map((poi: Poi) => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}
                    clickable={true}
                    onClick={() => {
                        console.log('marker click');
                    }}
                >
                    <Pin
                        background={'#FBBC04'}
                        glyphColor={'#000'}
                        borderColor={'#000'}
                    />
                </AdvancedMarker>
            ))}
        </>
    );
};

export default PoiMarkers;
