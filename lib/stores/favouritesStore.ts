import { create } from 'zustand';

type Ingredient = {
  ingredient: string;
  ingredientAmount: string;
};

type Recipe = {
  _id: string;
  name: string;
  decr: string;
  cookiesTime: number;
  cals: number | null;
  category: string;
  ingredients: Ingredient[];
  instruction: string;
  recipeImg: string | null;
  owner: string;
};

type FavoritesStore = {
  favorites: Recipe[];
  setFavorites: (favorites: Recipe[]) => void;
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (recipeId: string) => void;
};

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: [],

  setFavorites: (favorites) => set({ favorites }),

  addFavorite: (recipe) =>
    set((state) => ({
      favorites: [...state.favorites, recipe],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((r) => r._id !== recipeId),
    })),
}));
