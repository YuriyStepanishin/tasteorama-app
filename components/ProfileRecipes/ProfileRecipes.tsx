'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import RecipesList from '../RecipesList/RecipesList';
import Loader from '../Loader/Loader';
import Filters from '../Filters/Filters';
import LoadMoreButton from '../LoadMoreBtn/LoadMoreBtn';

import {
  fetchUserRecipes,
  fetchFavoriteRecipes,
  fetchCategories,
  fetchIngredients,
} from '@/lib/clientApi';

import { Category } from '@/types/category';
import { Ingredient } from '@/types/indredient';
import { ServerRecipe } from '@/types/serverRecipe';

interface Props {
  recipesType: 'own' | 'favorites';
}

export default function ProfileRecipes({ recipesType }: Props) {
  const [page, setPage] = useState(1);

  const [recipes, setRecipes] = useState<ServerRecipe[]>([]);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [ingredient, setIngredient] = useState('');

  useEffect(() => {
    setPage(1);
    setRecipes([]);
  }, [recipesType, search, category, ingredient]);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['profileRecipes', recipesType, page, search, category, ingredient],
    queryFn: () =>
      recipesType === 'own'
        ? fetchUserRecipes({
            page,
            perPage: 12,
            search: search || undefined,
            category: category || undefined,
            ingredient: ingredient || undefined,
          })
        : fetchFavoriteRecipes({
            page,
            perPage: 12,
            search: search || undefined,
            category: category || undefined,
            ingredient: ingredient || undefined,
          }),
  });

  useEffect(() => {
    if (!data) return;

    if (page === 1) {
      setRecipes(data.recipes);
    } else {
      setRecipes((prev) => [...prev, ...data.recipes]);
    }
  }, [data, page]);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  const { data: ingredients } = useQuery<Ingredient[]>({
    queryKey: ['ingredients'],
    queryFn: fetchIngredients,
    staleTime: Infinity,
  });

  if (isLoading && page === 1) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading recipes.</div>;
  }

  const totalPages = data?.totalPages ?? 1;
  const recipesCount = data?.totalRecipes ?? 0;

  return (
    <>
      {categories && ingredients && (
        <Filters
          recipesCount={recipesCount}
          categories={categories}
          ingredients={ingredients}
          selectedCategory={category}
          selectedIngredient={ingredient}
          onCategoryChange={(value) => {
            setCategory(value);
          }}
          onIngredientChange={(value) => {
            setIngredient(value);
          }}
          onResetFilters={() => {
            setSearch('');
            setCategory('');
            setIngredient('');
          }}
        />
      )}

      <RecipesList
        recipes={recipes}
        isOwn={recipesType === 'own'}
        favoriteAction={recipesType === 'favorites' ? 'remove' : 'add'}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: '32px',
        }}
      >
        <LoadMoreButton
          hasMore={page < totalPages}
          isLoading={isFetching}
          onClick={() => setPage((prev) => prev + 1)}
        />
      </div>
    </>
  );
}
