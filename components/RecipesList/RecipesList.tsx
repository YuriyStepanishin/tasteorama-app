import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipesList.module.css';
import { ServerRecipe } from '@/types/serverRecipe';

interface RecipesListProps {
  recipes: ServerRecipe[];
}

const RecipesList = ({ recipes }: RecipesListProps) => {
  return (
    <ul className={styles.list}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </ul>
  );
};

export default RecipesList;
