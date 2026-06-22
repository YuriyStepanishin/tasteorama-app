'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import LoadMoreButton from '@/components/LoadMoreBtn/LoadMoreBtn';
import Loader from '@/components/Loader/Loader';
import Filters from '@/components/Filters/Filters';
import RecipesList from '@/components/RecipesList/RecipesList';
import NoRecipes from '@/components/NoRecipes/NoRecipes';

import {
  fetchRecipes,
  FetchRecipesResponse,
  fetchCategories,
  fetchIngredients,
} from '@/lib/clientApi';
import { ServerRecipe } from '@/types/serverRecipe';

import { Category } from '@/types/category';
import { Ingredient } from '@/types/indredient';

// не знакодить імпорт, в components не знайшла файл
// import SaveButton from '@/components/Auth/SaveButton';
import Hero from '@/components/Hero/Hero';
import { searchRecipes } from '@/src/api/recipes';
import EmptySearch from '@/components/EmptySearch/EmptySearch';

import toast from 'react-hot-toast';

const PER_PAGE = 12;

import css from './page.module.css';

type Recipe = any;
const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [ingredient, setIngredient] = useState<string>('');

  const [recipes, setRecipes] = useState<ServerRecipe[]>([]);

  const [debounceSearchQuery] = useDebounce(search, 300);

  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>({
    // приклад
    // category:
    // time:
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  // const [isEmpty, setIsEmpty] = useState(false);
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setPage(1);
    setRecipes([]);
  }, [debounceSearchQuery, category, ingredient]);

  const { data, isLoading, isFetching, isError } = useQuery<FetchRecipesResponse>({
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

  const recipesCount = data?.totalRecipes ?? 0;

  useEffect(() => {
    if (!data) return;

    setRecipes((prev) => (page === 1 ? data.recipes : [...prev, ...data.recipes]));
  }, [data, page]);

  const handleResetFilters = () => {
    setCategory('');
    setIngredient('');
    setSearch('');
  };

  const handleLoadMoreRecipes = () => {
    setPage((prevPage) => prevPage + 1);
  };
  // const handleLoadMoreRecipes = async (): Promise<void> => {
  //     setLoading(true);

  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     console.log('Recipes loaded successfully!');
  //   } catch (error) {
  //     console.error('Error loading recipes:', error);
  //   } finally {
  //     setLoading(false)
  //   };

  const handleSearch = async (value: string) => {
    const q = value.trim();
    // console.log('SEARCH TRIGGERED:', q);
    // console.log('REQUEST PARAMS:', {
    //   search: q,
    //   filters,
    // });

    setQuery(q);
    if (q.length < 2) {
      setToastMessage('Enter at least two characters');
      return;
    }
    try {
      setLoading(true);
      setToastMessage(null);

      const data = await searchRecipes({
        query: q,
        filters,
      });
      // console.log('API RESPONSE:', data);

      const results = data?.recipes ?? [];
      //     // console.log('DATA:', data);
      setHasSearched(true);

      //     if (!recipesArray || recipesArray.length === 0) {
      if (results.length === 0) {
        setRecipes([]);
        //       setIsEmpty(true);
        setToastMessage(`No recipes found for "${q}"`);
        return;
      }

      setRecipes(results);
      //     // setToast(null);
      //     setIsEmpty(false);
    } catch (error) {
      setRecipes([]);
      setToastMessage('Request error');
      //     setIsEmpty(true);
      //
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRecipes([]);
    setQuery('');
    setFilters({});
    setHasSearched(false);
    setToastMessage(null);
  };

  const hasNextPage = data ? page < data.totalPages : false;

  const isLoadingMore = isFetching && page > 1;

  return (
    <main>
      <Section>
        <Hero onSearch={handleSearch} loading={loading} />
      </Section>
      {hasSearched && (
        <section className={css.resultSection}>
          <Container>
            {/* <div className={css.resultsHeader}> */}
            <h2 className={css.resultsTitle}>Search Results for "{query}"</h2>
            {/* <span className={css.resultsCount}>{recipes.length} recipes</span> */}
            {/* </div> */}
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

            {recipes.length > 0 ? (
              <div className={css.resultNotFound}>
                {/* <Filters /> */}

                {/* {recipes.length > 0 ? (
  <RecipeList recipes={recipes} />
) : (
  <EmptySearch onReset={handleReset} />
)} */}
                {/* {recipes.map((recipe: any, index) => (
                  <div key={index}>{recipe.title}
                  </div>
                ))} */}
              </div>
            ) : (
              <EmptySearch onReset={handleReset} />
            )}
          </Container>
          {/* <LoadMoreButton onLoadMore={handleLoadMoreRecipes} isLoading={loading} /> */}
        </section>
      )}
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

            {!isLoading && recipes.length > 0 && <RecipesList recipes={recipes} />}

            {isLoading && <Loader />}

            {!isLoading && recipes.length === 0 && <NoRecipes />}

            {recipes.length > 0 && <RecipesList recipes={recipes} />}

            {hasNextPage && (
              <LoadMoreButton onLoadMore={handleLoadMoreRecipes} isLoading={isLoadingMore} />
            )}
          </div>
        </Container>
      </Section>
      {/* {toastMessage && <div className="toast">{toastMessage}</div>} */}
    </main>
  );
};

export default Home;
