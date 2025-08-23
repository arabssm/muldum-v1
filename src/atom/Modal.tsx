import { create } from 'zustand'

interface LoginModalState {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export const useLoginModalStore = create<LoginModalState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}))

export default useLoginModalStore;
