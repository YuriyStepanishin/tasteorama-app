import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipesList.module.css';
import { ServerRecipe } from '@/types/serverRecipe';

interface RecipesListProps {
  recipes: ServerRecipe[];
  isOwn?: boolean;
  variant?: 'default' | 'profile';
  favoriteAction?: 'add' | 'remove';
}

const RecipesList = ({
  recipes,
  isOwn = false,
  variant = 'default',
  favoriteAction = 'add',
}: RecipesListProps) => {
  return (
    <ul className={`${styles.list} ${variant === 'profile' ? styles.profileList : ''}`}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          isOwn={isOwn}
          variant={variant}
          favoriteAction={favoriteAction}
        />
      ))}
    </ul>
  );
};

export default RecipesList;
