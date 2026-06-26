import { notFound } from 'next/navigation';
import RecipeDetails from '@/components/Recipe/RecipeDetails';
import { fetchRecipeById, fetchIngredients } from '@/lib/clientApi'; // 👈 додали
import { ServerRecipe } from '@/types/serverRecipe';
import { Ingredient } from '@/types/indredient';

export const dynamic = 'force-dynamic';

interface RecipePageProps {
  params: { recipeId: string } | Promise<{ recipeId: string }>;
}

function normalizeRecipe(recipe: ServerRecipe, ingredients: Ingredient[]) {
  return {
    _id: recipe._id,
    title: recipe.title,
    imageUrl: recipe.thumb || '/photos/404-notFound.jpg',
    description: recipe.description,
    category: recipe.category,
    cookingTime: `${recipe.time} min`,
    calories: recipe.cals?.toString() || '—',
    ingredients: recipe.ingredients.map(({ id, measure }) => {
      // 👇 Знаходимо назву інгредієнта по id
      const found = ingredients.find((ing) => ing._id === id);
      return `${found?.name ?? id} — ${measure}`;
    }),
    steps: recipe.instructions
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { recipeId } = await params;

  try {
    // 👇 Паралельно завантажуємо рецепт і всі інгредієнти
    const [recipe, ingredients] = await Promise.all([
      fetchRecipeById(recipeId),
      fetchIngredients(),
    ]);

    if (!recipe) notFound();

    const normalizedRecipe = normalizeRecipe(recipe, ingredients);

    return <RecipeDetails initialRecipe={normalizedRecipe} recipeId={recipeId} />;
  } catch {
    notFound();
  }
}
