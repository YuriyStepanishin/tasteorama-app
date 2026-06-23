import Image from 'next/image';
import styles from './RecipeCard.module.css';
import Link from 'next/link';
import { ServerRecipe } from '@/types/serverRecipe';

interface RecipeCardProps {
  recipe: ServerRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
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

        <button className={styles.favorite}>
          <Image src="/icons/iconFavorite.svg" alt="Favorite icon" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
