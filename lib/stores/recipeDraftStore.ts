import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Ingredient {
  id: string;
  name: string;
  measure: string;
}

interface RecipeDraft {
  title: string;
  category: string;
  area: string;
  instructions: string;
  description: string;
  thumb: string;
  time: string;
  ingredients: Ingredient[];
}

interface RecipeDraftStore {
  draft: RecipeDraft;
  setField: (field: keyof RecipeDraft, value: string) => void;
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (index: number) => void;
  updateIngredient: (index: number, ingredient: Partial<Ingredient>) => void;
  resetDraft: () => void;
}

const initialDraft: RecipeDraft = {
  title: '',
  category: '',
  area: '',
  instructions: '',
  description: '',
  thumb: '',
  time: '',
  ingredients: [],
};

export const useRecipeDraftStore = create<RecipeDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setField: (field, value) =>
        set((state) => ({
          draft: { ...state.draft, [field]: value },
        })),

      addIngredient: (ingredient) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ingredients: [...state.draft.ingredients, ingredient],
          },
        })),

      removeIngredient: (index) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ingredients: state.draft.ingredients.filter((_, i) => i !== index),
          },
        })),

      updateIngredient: (index, ingredient) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ingredients: state.draft.ingredients.map((item, i) =>
              i === index ? { ...item, ...ingredient } : item
            ),
          },
        })),

      resetDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'recipe-draft',
    }
  )
);
