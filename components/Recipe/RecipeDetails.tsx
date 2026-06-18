import Image from 'next/image';
import Link from 'next/link';
import styles from './RecipeDetails.module.css';

interface Recipe {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  category: string;
  cookingTime: string;
  calories?: string;
  ingredients: string[];
  steps: string[];
}

interface RecipeDetailsProps {
  initialRecipe: Recipe;
  recipeId: string;
}

export default function RecipeDetails({ initialRecipe }: RecipeDetailsProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{initialRecipe.title}</h1>
      <div className={styles.imageWrapper}>
        <Image
          src={initialRecipe.imageUrl}
          alt={initialRecipe.title}
          width={361}
          height={267}
          className={styles.image}
        />
      </div>
      <p className={styles.text}>{initialRecipe.description}</p>
      <Link href="/" className={styles.button}>
        Back to Home
      </Link>
    </div>
  );
}
