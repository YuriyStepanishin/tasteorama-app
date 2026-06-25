// import { create } from 'zustand';
// import { User } from '@/types/user';

// type AuthStore = {
//   user: User | null;
//   isAuthenticated: boolean;
//   setUser: (user: User) => void;
//   logout: () => void;
// };

// export const useAuthStore = create<AuthStore>((set) => ({
//   user: null,
//   isAuthenticated: false,

//   setUser: (user) => set({ user, isAuthenticated: true }),
//   logout: () => set({ user: null, isAuthenticated: false }),
// }));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore, [['zustand/persist', AuthStore]]>(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-store', // Название ключа в localStorage
    }
  )
);
