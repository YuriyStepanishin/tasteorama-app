'use client';

import Image from 'next/image';
import SaveButton from '@/components/SaveButton/SaveButton';
import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
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
  isFavorite?: boolean;
}

interface RecipeDetailsProps {
  initialRecipe: Recipe;
  recipeId: string;
}

export default function RecipeDetails({ initialRecipe, recipeId }: RecipeDetailsProps) {
  return (
    <Section>
      <Container>
        <div className={styles.container}>
          {/* Фото */}
          <div className={styles.imageWrapper}>
            <Image
              src={initialRecipe.imageUrl}
              alt={initialRecipe.title}
              width={624}
              height={624}
              className={styles.image}
            />
          </div>

          {/* Назва */}
          <h1 className={styles.title}>{initialRecipe.title}</h1>

          <div className={styles.comp_block}>
            {/* General informations */}
            <div className={styles.aside_block}>
              <aside className={styles.sidebar}>
                <h3 className={styles.infoTitle}>General informations</h3>

                <div className={styles.infoItem}>
                  <span className={styles.label}>Category: </span>
                  <span>{initialRecipe.category}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.label}>Cooking time: </span>
                  <span>{initialRecipe.cookingTime}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.label}>Calories: </span>
                  <span>{initialRecipe.calories}</span>
                </div>
              </aside>

              {/* Кнопка */}
              <div className={styles.saveButtonWrapper}>
                <SaveButton
                  recipeId={recipeId}
                  initialIsFavorite={initialRecipe.isFavorite ?? false}
                />
              </div>
            </div>

            <div className={styles.content_block}>
              {/* About */}
              <section className={styles.section}>
                <h2 className={styles.subtitle}>About recipe</h2>

                <p className={styles.text}>{initialRecipe.description}</p>
              </section>

              {/* Ingredients */}
              <section className={styles.section}>
                <h2 className={styles.subtitle}>Ingredients:</h2>

                <ul className={styles.list}>
                  {initialRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </section>

              {/* Steps */}
              <section className={styles.section}>
                <h2 className={styles.subtitle}>Preparation Steps:</h2>

                <ol className={styles.steps}>
                  {initialRecipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
