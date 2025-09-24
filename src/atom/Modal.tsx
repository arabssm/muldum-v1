import { create } from 'zustand';
import { atom } from 'recoil';

// Zustand stores
interface LoginModalState {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export const useLoginModalStore = create<LoginModalState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}))

interface SettingModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useSettingModalStore = create<SettingModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

// Recoil atoms for compatibility
export const loginModalState = atom({
  key: 'loginModalState',
  default: false,
});

export const whereismypasswordModalState = atom({
  key: 'whereismypasswordModalState',
  default: false,
});

export default useLoginModalStore;
