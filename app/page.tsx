'use client';

import { useState } from 'react';
import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import LoadMoreButton from '@/components/LoadMoreBtn/LoadMoreBtn';
import Loader from '@/components/Loader/Loader';

import SaveButton from '@/components/Auth/SaveButton';
import Hero from '@/components/Hero/Hero';
import { searchRecipes } from '@/src/api/recipes';
import Filters from '@/components/Filters/Filters';
import EmptySearch from '@/components/EmptySearch/EmptySearch';

import css from './page.module.css';

type Recipe = any;
const Home = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filters, setFilters] = useState<any>({
    // приклад
    // category:
    // time:
  });
  const [toast, setToast] = useState<string | null>(null);
  // const [isEmpty, setIsEmpty] = useState(false);
  const [query, setQuery] = useState('');
  // console.log('QUERY STATE:', query);
  const [hasSearched, setHasSearched] = useState(false);
  // main version++++++++++++++++
  // const handleLoadMoreRecipes = async (): Promise<void> => {
  //   setLoading(true);
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     console.log('Recipes loaded successfully!');
  //   } catch (error) {
  //     console.error('Error loading recipes:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //++++++++++++

  const handleSearch = async (value: string) => {
    const q = value.trim();
    // console.log('SEARCH TRIGGERED:', q);
    // console.log('REQUEST PARAMS:', {
    //   search: q,
    //   filters,
    // });

    setQuery(q);
    if (q.length < 2) {
      setToast('Enter at least two characters');
      return;
    }
    try {
      setLoading(true);
      setToast(null);

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
        setToast(`No recipes found for "${q}"`);
        return;
      }

      setRecipes(results);
      //     // setToast(null);
      //     setIsEmpty(false);
    } catch (error) {
      setRecipes([]);
      setToast('Request error');
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
    setToast(null);
  };

  return (
    <main>
      {/* main version */}
      {/* <Section>
        {loading && <Loader />}
        <Container>
          <h2>Demo Save</h2>
          <SaveButton />
        </Container>
        <LoadMoreButton onLoadMore={handleLoadMoreRecipes} isLoading={loading} />
      </Section> */}
      {/* main version */}
      <Section>
        {/* <Container> */}
        <Hero onSearch={handleSearch} loading={loading} />
        {/* </Container> */}
      </Section>
      {hasSearched && (
        <Section className={css.resultSection}>
          <Container>
            <div className={css.resultsHeader}>
              <h2 className={css.resultsTitle}>Search Results for "{query}"</h2>
              <span className={css.resultsCount}>{recipes.length} recipes</span>
            </div>

            {recipes.length > 0 ? (
              <div>
                <Filters />

                {/* {recipes.length > 0 ? (
  <RecipeList recipes={recipes} />
) : (
  <EmptySearch onReset={handleReset} />
)} */}
                {recipes.map((recipe: any, index) => (
                  <div key={index}>{recipe.title}</div>
                ))}
              </div>
            ) : (
              <EmptySearch onReset={handleReset} />
            )}
          </Container>
        </Section>
      )}
      {loading && <Loader />}

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
};

export default Home;
