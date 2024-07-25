'use client';
import { Poi } from '@/types/types';
import React, { ChangeEvent, useEffect, useState } from 'react';

type Props = {
    poi: Poi;
    isOpen: boolean;
    navigate: () => void;
    setIsModalOpen: (status: boolean) => void;
    updatePoi: (name: string, location: string, id: string) => void;
};

const ModalPoi = ({
    isOpen,
    navigate,
    poi,
    setIsModalOpen,
    updatePoi,
}: Props) => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    useEffect(() => {}, [poi, isOpen]);

    const closeModal = () => {
        setIsUpdating(false);
        setIsModalOpen(false);
    };

    const updatingPoiFn = () => {
        updatePoi(name, location, poi._id);
        setIsUpdating(false);
    };
    return (
        <dialog
            open={isOpen || isUpdating}
            className='z-40 fixed inset-0 w-full h-full bg-transparent'
            // onClick={() => closeModal()}
        >
            <div className='flex flex-col w-full h-full justify-center items-center'>
                <div className='bg-slate-600 p-6 rounded-md relative'>
                    <button
                        className='bg-red-600 rounded-sm p-1 absolute top-3 right-3 w-5 h-5 flex justify-center items-center'
                        onClick={() => closeModal()}
                    >
                        <p className='text-center'>x</p>
                    </button>

                    {isUpdating ? (
                        <div className='mb-4 mt-3 flex flex-col'>
                            <div className='flex mb-2'>
                                <p className='min-w-[71px]'>Name: </p>
                                <input
                                    type='text'
                                    defaultValue={poi.name}
                                    className='input input-xs'
                                    onChange={(
                                        event: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setName(event.target.value);
                                    }}
                                />
                            </div>
                            <div className='flex'>
                                <p className='min-w-[71px]'>Location:</p>
                                <input
                                    type='text'
                                    defaultValue={poi.location}
                                    className='input input-xs'
                                    onChange={(
                                        event: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setLocation(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className='mb-4 mt-3'>
                            <h1>Name: {poi.name}</h1>
                            <h1>Location: {poi.location}</h1>
                        </div>
                    )}

                    <div className='flex gap-5 justify-center'>
                        {isUpdating ? (
                            <button
                                className='btn btn-success btn-sm min-w-[75px]'
                                onClick={() => updatingPoiFn()}
                            >
                                Update
                            </button>
                        ) : (
                            <>
                                <button
                                    className='btn btn-success btn-sm min-w-[75px]'
                                    onClick={navigate}
                                >
                                    Go to
                                </button>
                                <button
                                    className='btn btn-success btn-sm min-w-[75px]'
                                    onClick={() => setIsUpdating(true)}
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </dialog>
    );
};

export default ModalPoi;
