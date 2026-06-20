<<<<<<< HEAD
=======
//src/store/userStore.ts

>>>>>>> main
import { create } from "zustand";

type User = {
  _id: string;
  email: string;
  name: string;
};

type Store = {
  user: User | null;
  setUser: (user: User) => void;
<<<<<<< HEAD
  logout: () => void;
=======
  clearUser: () => void;
>>>>>>> main
};

export const useUserStore = create<Store>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

<<<<<<< HEAD
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
=======
  clearUser: () => set({ user: null }),
>>>>>>> main
}));