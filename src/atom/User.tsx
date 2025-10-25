import { create } from 'zustand'

interface User {
  userId: number
  name: string
  role: string
  userType: string
  teamId: number | null
}

interface UserState {
  user: User | null
  isLoading: boolean
  setUser: (user: User) => void
  clearUser: () => void
  setLoading: (loading: boolean) => void
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  isLoading: false,
  setUser: (u) => set({ user: u }),
  clearUser: () => set({ user: null }),
  setLoading: (loading) => set({ isLoading: loading }),
}))