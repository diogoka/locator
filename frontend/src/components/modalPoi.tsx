import React from 'react';

type Props = {
    isOpen: boolean;
    navigate: () => void;
};

const ModalPoi = ({ isOpen, navigate }: Props) => {
    return (
        <dialog open={isOpen} className='z-40 fixed inset-0 p-10 rounded-md'>
            <div className='flex justify-between flex-col opacity-100'>
                <button
                    className='btn btn-success min-w-[75px]'
                    onClick={navigate}
                >
                    Go to
                </button>
                <button className='btn btn-success min-w-[75px]'>Update</button>
            </div>
        </dialog>
    );
};

export default ModalPoi;
