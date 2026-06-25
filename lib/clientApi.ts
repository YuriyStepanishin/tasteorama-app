import { ServerRecipe } from '@/types/serverRecipe';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Category } from '@/types/category';
import { Ingredient } from '@/types/indredient';
import { directServer } from './api';

// ------------------------------------------------
// Auth API
// ------------------------------------------------

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

export const register = async ({
  name,
  email,
  password,
}: RegisterProps): Promise<{ user: User }> => {
  const response = await nextServer.post('auth/register', {
    name,
    email,
    password,
  });

  return response.data;
};

export interface LoginProps {
  email: string;
  password: string;
}

export const login = async (data: LoginProps): Promise<{ user: User }> => {
  const response = await nextServer.post<{ user: User }>('auth/login', data);

  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('api/auth/logout');
};

export interface MessageResponse {
  message?: string;
}

export const refresh = async (): Promise<MessageResponse> => {
  const response = await nextServer.post<MessageResponse>('auth/refresh');
  return response.data;
};

export const fetchCurrentUser = async (): Promise<User> => {
  const response = await nextServer.get<User>('me');
  return response.data;
};

// ------------------------------------------------
// Categories API
// ------------------------------------------------

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await directServer.get<Category[]>('/api/categories');
  return response.data;
};

// ------------------------------------------------
// Ingredients API
// ------------------------------------------------

export const fetchIngredients = async (): Promise<Ingredient[]> => {
  const response = await directServer.get<Ingredient[]>('/api/ingredients');
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
  const response = await directServer.get<FetchRecipesResponse>('/api/recipes', {
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
  const response = await directServer.get<{ recipe: ServerRecipe }>(`/api/recipes/${recipeId}`);
  return response.data.recipe;
};

export const addRecipe = async (payload: any): Promise<ServerRecipe> => {
  const response = await nextServer.post<{ recipe: ServerRecipe }>('/api/add-recipe', payload);

  return response.data.recipe;
};

export const fetchUserRecipes = async ({
  page,
  perPage,
  search,
  category,
  ingredient,
}: FetchRecipesParams): Promise<FetchRecipesResponse> => {
  console.log('request sent');
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

export const fetchFavoriteRecipes = async ({
  page,
  perPage,
  search,
  category,
  ingredient,
}: FetchRecipesParams): Promise<FetchRecipesResponse> => {
  const response = await nextServer.get<FetchRecipesResponse>('/api/recipes/favorites', {
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

export const deleteRecipe = async (recipeId: string): Promise<void> => {
  const response = await nextServer.delete(`/api/recipes/${recipeId}`);
  return response.data;
};

export const addFavorite = async (recipeId: string) => {
  const response = await nextServer.post(`/api/recipes/favorites/${recipeId}`);

  return response.data;
};

export const removeFavorite = async (recipeId: string) => {
  const response = await nextServer.delete(`/api/recipes/favorites/${recipeId}`);

  return response.data;
};
