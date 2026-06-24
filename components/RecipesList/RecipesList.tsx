import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipesList.module.css';
import { ServerRecipe } from '@/types/serverRecipe';

interface RecipesListProps {
  recipes: ServerRecipe[];
  isOwn?: boolean;
}

const RecipesList = ({ recipes, isOwn = false }: RecipesListProps) => {
  return (
    <ul className={styles.list}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} isOwn={isOwn} />
      ))}
    </ul>
  );
};

export default RecipesList;
