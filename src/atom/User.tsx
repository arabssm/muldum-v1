import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


interface User {
  userId: number
  name: string
  role: string
  userType: string
  teamId: number | null
}

interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      setUser: (u) => set({ user: u }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.hydrated !== undefined && (state.hydrated = true)
      },
    }
  )
)