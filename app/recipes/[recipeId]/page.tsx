import RecipeDetails from '@/components/Recipe/RecipeDetails';
<<<<<<< HEAD

export default function RecipePage() {
  const mockRecipe = {
    _id: '1',
    title: 'French Omelette',
    imageUrl: '/photos/404-notFound.jpg',
    description:
      'A French omelette is known for its soft texture and delicate taste.',
    category: 'Breakfast',
    cookingTime: '7 min',
    calories: '200 kcal',
    ingredients: [
      'Eggs — 3',
      'Butter — 15 g',
      'Salt — pinch',
      'Black pepper — pinch',
    ],
    steps: [
      'Crack eggs into a bowl.',
      'Whisk until smooth.',
      'Melt butter in a pan.',
      'Cook omelette gently.',
      'Fold and serve.',
    ],
=======
import NotFoundRecipePage from '@/components/NotFoundRecipePage/NotFoundRecipePage';
import { fetchRecipeById } from '@/lib/clientApi';
import { ServerRecipe } from '@/types/serverRecipe';
import { notFound } from 'next/navigation';

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
>>>>>>> main
  };

<<<<<<< HEAD
  return (
    <RecipeDetails
      initialRecipe={mockRecipe}
      recipeId={mockRecipe._id}
    />
  );
}
=======
export default async function RecipePage({ params }: RecipePageProps) {
  const { recipeId } = await params;

  try {
    const recipe = await fetchRecipeById(recipeId);
    const normalizedRecipe = normalizeRecipe(recipe);

    return <RecipeDetails initialRecipe={normalizedRecipe} recipeId={recipeId} />;
  } catch {
    return notFound();
  }
}
>>>>>>> main
