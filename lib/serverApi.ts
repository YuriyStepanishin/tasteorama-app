import { User } from '@/types/user';
import { nextServer } from './api';
import { ServerRecipe } from '@/types/serverRecipe';
import { FetchRecipesParams, FetchRecipesResponse, MessageResponse } from './clientApi';

// ------------------------------------------------
// Users API
// ------------------------------------------------

export const fetchCurrentUser = async (): Promise<User> => {
  const response = await nextServer.get<User>('/me');
  return response.data;
};

// ------------------------------------------------
// Recipes API
// ------------------------------------------------

export interface CreateRecipeProps {
  name: string;
  decr: string;
  cookiesTime: number;
  cals: number | null;
  category: string;
  ingredients: {
    ingredient: string;
    ingredientAmount: string;
  }[];
  instruction: string;
}

export const createRecipe = async (data: CreateRecipeProps): Promise<ServerRecipe> => {
  const response = await nextServer.post<{ recipe: ServerRecipe }>('/api/recipes', data);
  return response.data.recipe;
};

export const fetchOwnRecipes = async ({
  page,
  perPage,
  search,
  category,
  ingredient,
}: FetchRecipesParams): Promise<FetchRecipesResponse> => {
  const response = await nextServer.get<FetchRecipesResponse>('/api/recipes/user', {
    params: {
      page,
      perPage,
      search,
      category,
      ingredient,
    },
  });
  return response.data;
};

export const fetchFavorites = async (): Promise<ServerRecipe[]> => {
  const response = await nextServer.get<{ recipes: ServerRecipe[] }>('/api/recipes/favorites');
  return response.data.recipes;
};

export const addFavorite = async (recipeId: string): Promise<MessageResponse> => {
  const response = await nextServer.post<MessageResponse>(`/api/recipes/favorites/${recipeId}`);
  return response.data;
};

export const removeFavorite = async (recipeId: string): Promise<MessageResponse> => {
  const response = await nextServer.delete<MessageResponse>(`/api/recipes/favorites/${recipeId}`);
  return response.data;
};
