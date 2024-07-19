import { LocationType } from '@/types/types';
import React from 'react';

type Props = {
    isOpen: boolean;
    closeModal: () => void;
    newPoi: () => void;
};

const ModalNewPoi = ({ isOpen, closeModal, newPoi }: Props) => {
    return (
        <dialog open={isOpen} className='z-40 fixed inset-0 p-10 rounded-md'>
            <p className='mb-5'>Add a new drinking fountain</p>
            <div className='flex justify-between opacity-100'>
                <button
                    onClick={newPoi}
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
        </dialog>
    );
};

export default ModalNewPoi;
