import RecipeDetails from '@/components/Recipe/RecipeDetails';
import NotFoundRecipePage from '@/components/NotFoundRecipePage/NotFoundRecipePage';
import { fetchRecipeById } from '@/lib/clientApi';
import { ServerRecipe } from '@/types/serverRecipe';

interface RecipePageProps {
  params: { recipeId: string } | Promise<{ recipeId: string }>;
}

function normalizeRecipe(recipe: ServerRecipe) {
  return {
    _id: recipe._id,
    title: recipe.name,
    imageUrl: recipe.recipeImg || '/photos/404-notFound.jpg',
    description: recipe.decr,
    category: recipe.category,
    cookingTime: `${recipe.cookiesTime} min`,
    calories: recipe.cals?.toString() || '—',
    ingredients: recipe.ingredients.map(
      ({ ingredient, ingredientAmount }) => `${ingredient} — ${ingredientAmount}`
    ),
    steps: recipe.instruction
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { recipeId } = await params;

  try {
    const recipe = await fetchRecipeById(recipeId);
    const normalizedRecipe = normalizeRecipe(recipe);

    return <RecipeDetails initialRecipe={normalizedRecipe} recipeId={recipeId} />;
  } catch {
    return <NotFoundRecipePage />;
  }
}
