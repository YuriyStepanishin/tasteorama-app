import { create } from "zustand";

type User = {
  _id: string;
  email: string;
  name: string;
};

type Store = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<Store>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));