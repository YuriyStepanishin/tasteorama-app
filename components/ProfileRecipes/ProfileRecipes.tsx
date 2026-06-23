'use client';

import { useQuery } from '@tanstack/react-query';
import RecipesList from '../RecipesList/RecipesList';
import Loader from '../Loader/Loader';
import { fetchUserRecipes, fetchFavoriteRecipes } from '@/lib/clientApi';

interface Props {
  recipesType: string;
}

export default function ProfileRecipes({ recipesType }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [recipesType],
    queryFn: recipesType === 'own' ? fetchUserRecipes : fetchFavoriteRecipes,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading recipes.</div>;
  }

  return <RecipesList recipes={data?.recipes ?? []} />;
}
