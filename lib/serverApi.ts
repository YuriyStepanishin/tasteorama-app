import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { nextServer } from './api';
import { ServerRecipe } from '@/types/serverRecipe';
import { FetchRecipesParams, FetchRecipesResponse, MessageResponse } from './clientApi';

// ------------------------------------------------
// Users API
// ------------------------------------------------

export const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    if (!cookieStore) return null;
    const response = await nextServer.get<User>('/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return response.data;
  } catch {
    return null;
  }
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

export const createRecipe = async (data: CreateRecipeProps): Promise<ServerRecipe | null> => {
  try {
    const cookieStore = await cookies();
    if (!cookieStore) return null;
    const response = await nextServer.post<{ recipe: ServerRecipe }>('/api/recipes', data, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return response.data.recipe;
  } catch {
    return null;
  }
};

export const fetchOwnRecipes = async ({
  page,
  perPage,
  search,
  category,
  ingredient,
}: FetchRecipesParams): Promise<FetchRecipesResponse | null> => {
  try {
    const cookieStore = await cookies();
    if (!cookieStore) return null;
    const response = await nextServer.get<FetchRecipesResponse>('/api/recipes/user', {
      params: {
        page,
        perPage,
        search,
        category,
        ingredient,
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return response.data;
  } catch {
    return null;
  }
};

export const fetchFavorites = async (): Promise<ServerRecipe[] | null> => {
  try {
    const cookieStore = await cookies();
    if (!cookieStore) return null;
    const response = await nextServer.get<{ recipes: ServerRecipe[] }>('/api/recipes/favorites', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return response.data.recipes;
  } catch {
    return null;
  }
};

export const addFavorite = async (recipeId: string): Promise<MessageResponse | null> => {
  try {
    const cookieStore = await cookies();
    if (!cookieStore) return null;
    const response = await nextServer.post<MessageResponse>(
      `/api/recipes/favorites/${recipeId}`,
      undefined,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );
    return response.data;
  } catch {
    return null;
  }
};

export const removeFavorite = async (recipeId: string): Promise<MessageResponse | null> => {
  try {
    const cookieStore = await cookies();
    if (!cookieStore) return null;
    const response = await nextServer.delete<MessageResponse>(
      `/api/recipes/favorites/${recipeId}`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );
    return response.data;
  } catch {
    return null;
  }
};
