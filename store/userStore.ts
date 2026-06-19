//src/store/userStore.ts

import { create } from "zustand";

type User = {
  _id: string;
  email: string;
  name: string;
};

type Store = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<Store>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),
}));