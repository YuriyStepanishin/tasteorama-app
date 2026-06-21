import { ServerRecipe } from '@/types/serverRecipe';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Category } from '@/types/category';
import { Ingredient } from '@/types/indredient';

// ------------------------------------------------
// Auth API
// ------------------------------------------------

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

export const register = async ({ name, email, password }: RegisterProps): Promise<User> => {
  const response = await nextServer.post<User>('/auth/register', { name, email, password });
  return response.data;
};

interface LoginProps {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginProps): Promise<User> => {
  const response = await nextServer.post<User>('/auth/login', { email, password });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export interface MessageResponse {
  message?: string;
}

export const refresh = async (): Promise<MessageResponse> => {
  const response = await nextServer.post<MessageResponse>('/auth/refresh');
  return response.data;
};

// ------------------------------------------------
// Categories API
// ------------------------------------------------

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await nextServer.get<Category[]>('/api/categories');
  return response.data;
};

// ------------------------------------------------
// Ingredients API
// ------------------------------------------------

export const fetchIngredients = async (): Promise<Ingredient[]> => {
  const response = await nextServer.get<Ingredient[]>('/api/ingredients');
  return response.data;
};

// ------------------------------------------------
// Recipes API
// ------------------------------------------------

export interface FetchRecipesParams {
  page: number;
  perPage?: number;
  search?: string;
  category?: string;
  ingredient?: string;
}

export interface FetchRecipesResponse {
  page: number;
  perPage: number;
  totalRecipes: number;
  totalPages: number;
  recipes: ServerRecipe[];
}

export const fetchRecipes = async ({
  page,
  perPage,
  search,
  category,
  ingredient,
}: FetchRecipesParams): Promise<FetchRecipesResponse> => {
  const response = await nextServer.get<FetchRecipesResponse>('/api/recipes', {
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

export const fetchRecipeById = async (recipeId: string): Promise<ServerRecipe> => {
  const response = await nextServer.get<ServerRecipe>(`/api/recipes/${recipeId}`);
  return response.data;
};
