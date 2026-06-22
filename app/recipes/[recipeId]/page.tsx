import { notFound } from 'next/navigation';
import RecipeDetails from '@/components/Recipe/RecipeDetails';
import { fetchRecipeById } from '@/lib/clientApi';
import { ServerRecipe } from '@/types/serverRecipe';

export const dynamic = 'force-dynamic';

interface RecipePageProps {
  params: { recipeId: string } | Promise<{ recipeId: string }>;
}

function normalizeRecipe(recipe: ServerRecipe) {
  return {
    _id: recipe._id,
    title: recipe.title,
    imageUrl: recipe.thumb || '/photos/404-notFound.jpg',
    description: recipe.description,
    category: recipe.category,
    cookingTime: `${recipe.time} min`,
    calories: recipe.cals?.toString() || '—',
    ingredients: recipe.ingredients.map(
      ({ ingredient, ingredientAmount }) => `${ingredient} — ${ingredientAmount}`
    ),
    steps: recipe.instructions
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { recipeId } = await params;

  try {
    const recipe = await fetchRecipeById(recipeId);
    if (!recipe) notFound();
    const normalizedRecipe = normalizeRecipe(recipe);
    return <RecipeDetails initialRecipe={normalizedRecipe} recipeId={recipeId} />;
  } catch {
    notFound();
  }
}
