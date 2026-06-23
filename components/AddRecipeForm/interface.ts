export interface CategoryProps {
  _id: string;
  name: string;
}

export interface IngredientProps {
  _id: string;
  name: string;
}

export interface AddRecipePayload {
  title: string;
  description: string;
  time: string;
  cals?: number;
  category: string;
  ingredients: {
    ingredient: string;
    ingredientAmount: string;
  }[];
  instructions: string;
}
