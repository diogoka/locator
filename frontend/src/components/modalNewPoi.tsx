import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

type Props = {
    isOpen: boolean;
    closeModal: () => void;
    newPoi: (name: string, location: string) => void;
};

const ModalNewPoi = ({ isOpen, closeModal, newPoi }: Props) => {
    const [name, setName] = useState<string>();
    const [location, setLocation] = useState<string>();
    const { toast } = useToast();

    const newPoiFn = () => {
        if (!name || !location) {
            toast({
                variant: 'destructive',
                title: 'Missing information',
                description: 'Please add a valid name and location.',
            });
            return null;
        }
        newPoi(name, location);
    };

    return (
        <dialog
            open={isOpen}
            className='z-40 fixed inset-0 p-10 rounded-md shadow-lg'
        >
            <p className='mb-5 text-center font-bold text-lg'>
                New drinking fountain
            </p>
            <div className='flex justify-between flex-col opacity-100'>
                <p>Add a name for this location: </p>
                <p className='text-red-600 text-sm'>E.g.: plaza, park, etc</p>
                <Input
                    type='text'
                    required
                    className='input bg-slate-50 rounded-md text-black max-w-[200px] mb-3'
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <p>Add the location: </p>
                <p className='text-red-600 text-sm'>
                    E.g.: near of, in front of, etc
                </p>
                <Input
                    type='text'
                    required
                    className='input bg-slate-50 rounded-md text-black max-w-[200px] mb-5'
                    onChange={(e) => {
                        setLocation(e.target.value);
                    }}
                />

                <div className='flex items-center justify-evenly'>
                    <Button onClick={() => newPoiFn()} className='min-w-[75px]'>
                        Add
                    </Button>
                    <Button
                        onClick={closeModal}
                        variant='outline'
                        className='min-w-[75px]'
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </dialog>
    );
};

export default ModalNewPoi;
