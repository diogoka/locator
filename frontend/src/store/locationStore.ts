import { create } from 'zustand';
import { LocationType } from '@/types/types';

type LocationStore = {
    location: LocationType | null;
    setLocation: (newLocation: LocationType) => void;
};

export const useLocationStore = create<LocationStore>()((set) => ({
    location: null,
    setLocation: (newLocation) => set(() => ({ location: newLocation })),
}));
