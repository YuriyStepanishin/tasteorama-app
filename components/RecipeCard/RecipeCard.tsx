import Image from 'next/image';
import styles from './RecipeCard.module.css';
import Link from 'next/link';
import { ServerRecipe } from '@/types/serverRecipe';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRecipe, addFavorite, removeFavorite } from '@/lib/clientApi';
import { toast } from 'react-hot-toast';
import { isAxiosError } from 'axios';

interface RecipeCardProps {
  recipe: ServerRecipe;
  isOwn?: boolean;
  variant?: 'default' | 'profile';
  favoriteAction?: 'add' | 'remove';
}

const RecipeCard = ({
  recipe,
  isOwn = false,
  variant = 'default',
  favoriteAction = 'add',
}: RecipeCardProps) => {
  const queryClient = useQueryClient();
  const isProfileVariant = variant === 'profile';
  const isRemovingFavorite = favoriteAction === 'remove';

  const favoriteMutation = useMutation({
    mutationFn: () => (isRemovingFavorite ? removeFavorite(recipe._id) : addFavorite(recipe._id)),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoriteRecipes'] });
      queryClient.invalidateQueries({ queryKey: ['profileRecipes'] });

      toast.success(isRemovingFavorite ? 'Removed from favorites' : 'Added to favorites');
    },

    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 409 && !isRemovingFavorite) {
        queryClient.invalidateQueries({ queryKey: ['favoriteRecipes'] });
        queryClient.invalidateQueries({ queryKey: ['profileRecipes'] });
        toast.success('Already in favorites');
        return;
      }

      toast.error('Failed to add favorite');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteRecipe(recipe._id),

    onSuccess: () => {
      toast.success('Recipe deleted');

      queryClient.invalidateQueries({
        queryKey: ['profileRecipes'],
      });
    },

    onError: () => {
      toast.error('Failed to delete recipe');
    },
  });

  return (
    <div className={`${styles.card} ${isProfileVariant ? styles.profileCard : ''}`}>
      <Image
        src={recipe.thumb || '/photos/no-image.jpg'}
        alt={recipe.title || 'Recipe image'}
        width={240}
        height={240}
        className={`${styles.image} ${isProfileVariant ? styles.profileImage : ''}`}
      />

      <div className={`${styles.header} ${isProfileVariant ? styles.profileHeader : ''}`}>
        <h3>{recipe.title}</h3>

        <div className={`${styles.time} ${isProfileVariant ? styles.profileTime : ''}`}>
          <Image
            className={`${styles.time_img} ${isProfileVariant ? styles.profileTimeImg : ''}`}
            src="/icons/iconTime.svg"
            alt="Time icon"
            width={24}
            height={24}
          />
          <p className={`${styles.time_p} ${isProfileVariant ? styles.profileTimeText : ''}`}>
            {recipe.time}
          </p>
        </div>
      </div>

      <p className={`${styles.description} ${isProfileVariant ? styles.profileDescription : ''}`}>
        {recipe.description}
      </p>

      <p className={`${styles.calories} ${isProfileVariant ? styles.profileCalories : ''}`}>
        {recipe.cals ? `~${recipe.cals} cals` : '- cals'}
      </p>

      <div className={`${styles.actions} ${isProfileVariant ? styles.profileActions : ''}`}>
        <Link
          href={`/recipes/${recipe._id}`}
          className={`${styles.learnMore} ${isProfileVariant ? styles.profileLearnMore : ''}`}
        >
          Learn More
        </Link>

        {isOwn ? (
          <button
            className={`${styles.favorite} ${isProfileVariant ? styles.profileFavorite : ''}`}
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        ) : (
          <button
            className={`${styles.favorite} ${isProfileVariant ? styles.profileFavorite : ''}`}
            onClick={() => favoriteMutation.mutate()}
            disabled={favoriteMutation.isPending}
          >
            <Image src="/icons/iconFavorite.svg" alt="Favorite icon" width={24} height={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
