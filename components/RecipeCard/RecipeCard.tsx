import Image from 'next/image';
import styles from './RecipeCard.module.css';
import Link from 'next/link';
import { ServerRecipe } from '@/types/serverRecipe';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRecipe } from '@/lib/clientApi';
import { toast } from 'react-hot-toast';

interface RecipeCardProps {
  recipe: ServerRecipe;
  isOwn?: boolean;
}

const RecipeCard = ({ recipe, isOwn = false }: RecipeCardProps) => {
  const queryClient = useQueryClient();

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
    <div className={styles.card}>
      <Image
        src={recipe.thumb || '/photos/no-image.jpg'}
        alt={recipe.title || 'Recipe image'}
        width={240}
        height={240}
        className={styles.image}
      />

      <div className={styles.header}>
        <h3>{recipe.title}</h3>

        <div className={styles.time}>
          <Image
            className={styles.time_img}
            src="/icons/iconTime.svg"
            alt="Time icon"
            width={24}
            height={24}
          />
          <p className={styles.time_p}>{recipe.time}</p>
        </div>
      </div>

      <p className={styles.description}>{recipe.description}</p>

      <p className={styles.calories}>{recipe.cals ? `~${recipe.cals} cals` : '- cals'}</p>

      <div className={styles.actions}>
        <Link href={`/recipes/${recipe._id}`} className={styles.learnMore}>
          Learn More
        </Link>

        {isOwn ? (
          <button
            className={styles.favorite}
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        ) : (
          <button className={styles.favorite}>
            <Image src="/icons/iconFavorite.svg" alt="Favorite icon" width={24} height={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
