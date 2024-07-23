import { Poi } from '@/types/types';
import React from 'react';

type Props = {
    poi: Poi;
    isOpen: boolean;
    navigate: () => void;
    setIsModalOpen: (status: boolean) => void;
};

const ModalPoi = ({ isOpen, navigate, poi, setIsModalOpen }: Props) => {
    return (
        <dialog
            open={isOpen}
            className='z-40 fixed inset-0 w-full h-full bg-transparent'
            onClick={() => setIsModalOpen(false)}
        >
            <div className='flex flex-col w-full h-full justify-center items-center'>
                <div className='bg-slate-600 p-6 rounded-md relative'>
                    <button
                        className='bg-red-600 rounded-sm p-1 absolute top-3 right-3 w-5 h-5 flex justify-center items-center'
                        onClick={() => setIsModalOpen(false)}
                    >
                        <p className='text-center'>x</p>
                    </button>
                    <div className='mb-4 mt-3'>
                        <h1>Name: {poi.name}</h1>
                        <h1>Location: {poi.location}</h1>
                    </div>
                    <div className='flex gap-5'>
                        <button
                            className='btn btn-success min-w-[75px]'
                            onClick={navigate}
                        >
                            Go to
                        </button>
                        <button className='btn btn-success min-w-[75px]'>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
};

export default ModalPoi;
