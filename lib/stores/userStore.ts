import { create } from 'zustand';
import { getMe } from "@/lib/clientApi";
import { User } from '@/types/user';


type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  logout: () => void;

   initUser: () => Promise<void>; 
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),

  logout: () => set({ user: null, isAuthenticated: false }),

   initUser: async () => {
    try {
      const data = await getMe();
      set({
        user: data.user ?? null,
        isAuthenticated: !!data.user,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },
}));
