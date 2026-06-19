export interface ServerRecipe {
  _id: string;
  name: string;
  decr: string;
  cookiesTime: number;
  cals: number | null;
  category: string;
  ingredients: {
    ingredient: string;
    ingredientAmount: string;
    _id: string;
  }[];
  instruction: string;
  recipeImg: string | null;
  owner: string;
  createdAt: string;
  updatedAt: string;
}
