'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import RecipesList from '../RecipesList/RecipesList';
import Loader from '../Loader/Loader';
import { fetchUserRecipes, fetchFavoriteRecipes } from '@/lib/clientApi';
import Pagination from '../Pagination/Pagination';
import { fetchCategories, fetchIngredients } from '@/lib/clientApi';
import { Category } from '@/types/category';
import { Ingredient } from '@/types/indredient';
import Filters from '../Filters/Filters';
import { useEffect } from 'react';

interface Props {
  recipesType: string;
}

export default function ProfileRecipes({ recipesType }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [ingredient, setIngredient] = useState('');

  useEffect(() => {
    setPage(1);
  }, [search, category, ingredient]);

  const { data, isLoading, isError } = useQuery({
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

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading recipes.</div>;
  }

 const totalPages = data?.totalPages ?? 1;
 const recipes = data?.recipes ?? [];
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
            setPage(1);
          }}
          onIngredientChange={(value) => {
            setIngredient(value);
            setPage(1);
          }}
          onResetFilters={() => {
            setCategory('');
            setIngredient('');
            setSearch('');
            setPage(1);
          }}
        />
      )}

      <RecipesList recipes={recipes} isOwn={recipesType === 'own'} />

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}
    </>
  );
}
