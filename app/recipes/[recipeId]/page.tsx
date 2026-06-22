import RecipeDetails from '@/components/Recipe/RecipeDetails';

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
  };

  return (
    <RecipeDetails
      initialRecipe={mockRecipe}
      recipeId={mockRecipe._id}
    />
  );
}