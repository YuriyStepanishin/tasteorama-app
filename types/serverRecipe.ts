interface ServerRecipeIngredient {
  _id: string;
  id: string;
  measure: string;
}

export interface ServerRecipe {
  _id: string;
  title: string;
  category: string;
  owner: string;
  area: string;
  instructions: string;
  description: string;
  thumb: string;
  time: string;
  cals: number | null;
  ingredients: ServerRecipeIngredient[];
  createdAt: string;
  updatedAt: string;
}
