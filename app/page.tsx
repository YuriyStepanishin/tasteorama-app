'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import LoadMoreButton from '@/components/LoadMoreBtn/LoadMoreBtn';
import { useState } from 'react';
import Loader from '@/components/Loader/Loader';

import SaveButton from '@/components/Auth/SaveButton';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleLoadMoreRecipes = async (): Promise<void> => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Recipes loaded successfully!');
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Section>
      {loading && <Loader />}
      <Container>
        <h2>Demo Save</h2>
        <SaveButton />
      </Container>
      <LoadMoreButton onLoadMore={handleLoadMoreRecipes} isLoading={loading} />
    </Section>
  );
};

export default Home;
