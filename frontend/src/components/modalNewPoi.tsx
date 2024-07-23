import React, { useState } from 'react';

type Props = {
    isOpen: boolean;
    closeModal: () => void;
    newPoi: (name: string, location: string) => void;
};

const ModalNewPoi = ({ isOpen, closeModal, newPoi }: Props) => {
    const [name, setName] = useState<string>();
    const [location, setLocation] = useState<string>();

    return (
        <dialog open={isOpen} className='z-40 fixed inset-0 p-10 rounded-md'>
            <p className='mb-5'>Add a new drinking fountain</p>
            <div className='flex justify-between flex-col opacity-100'>
                <p>Add a name for this location: E.g.: plaza, park, etc</p>
                <input
                    type='text'
                    className='input bg-slate-50 rounded-md text-black'
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <p>Add the location: E.g.: near black door, in front of, etc</p>
                <input
                    type='text'
                    className='input bg-slate-50 rounded-md text-black'
                    onChange={(e) => {
                        setLocation(e.target.value);
                    }}
                />

                <div>
                    <button
                        onClick={() => newPoi(name!, location!)}
                        className='btn btn-success min-w-[75px]'
                    >
                        Add
                    </button>
                    <button
                        onClick={closeModal}
                        className='btn btn-error min-w-[75px]'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ModalNewPoi;
