'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Loader from '@/components/Loader/Loader';
import Filters from '@/components/Filters/Filters';
import RecipesList from '@/components/RecipesList/RecipesList';
import NoRecipes from '@/components/NoRecipes/NoRecipes';
import Pagination from '@/components/Pagination/Pagination';

import {
  fetchRecipes,
  FetchRecipesResponse,
  fetchCategories,
  fetchIngredients,
} from '@/lib/clientApi';

import { Category } from '@/types/category';
import { Ingredient } from '@/types/indredient';

import toast from 'react-hot-toast';
import css from './page.module.css';

const PER_PAGE = 12;

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [ingredient, setIngredient] = useState<string>('');

  const [debounceSearchQuery] = useDebounce(search, 300);

  useEffect(() => {
    setPage(1);
  }, [debounceSearchQuery, category, ingredient]);

  const { data, isLoading, isError } = useQuery<FetchRecipesResponse>({
    queryKey: ['recipes', page, debounceSearchQuery, category, ingredient],
    queryFn: () =>
      fetchRecipes({
        page,
        perPage: PER_PAGE,
        search: debounceSearchQuery || undefined,
        category: category || undefined,
        ingredient: ingredient || undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 1;
  const recipesCount = data?.totalRecipes ?? 0;
  const recipes = data?.recipes ?? [];

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong. Please try again later.');
    }
  }, [isError]);

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

  const handleResetFilters = () => {
    setCategory('');
    setIngredient('');
    setSearch('');
  };

  return (
    <Section>
      <Container>
        <div className={css.home}>
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
              onResetFilters={handleResetFilters}
            />
          )}

          {isLoading && <Loader />}

          {!isLoading && recipes.length > 0 && <RecipesList recipes={recipes} />}

          {!isLoading && recipes.length === 0 && <NoRecipes />}

          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </div>
      </Container>
    </Section>
  );
};

export default Home;
