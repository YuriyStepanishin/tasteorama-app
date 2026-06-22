import Image from 'next/image';
import SaveButton from '@/components/Auth/SaveButton';
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
}

interface RecipeDetailsProps {
  initialRecipe: Recipe;
  recipeId: string;
}

export default function RecipeDetails({
  initialRecipe,
}: RecipeDetailsProps) {
  return (
    <Section>
      <Container>
        <div className={styles.container}>
          <h1 className={styles.title}>{initialRecipe.title}</h1>

          <div className={styles.imageWrapper}>
            <Image
              src={initialRecipe.imageUrl}
              alt={initialRecipe.title}
              width={624}
              height={624}
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.leftColumn}>
              <section>
                <h2 className={styles.subtitle}>About recipe</h2>
                <p className={styles.text}>{initialRecipe.description}</p>
              </section>

              <section>
                <h2 className={styles.subtitle}>Ingredients</h2>

                <ul className={styles.list}>
                  {initialRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className={styles.subtitle}>Preparation Steps</h2>

                <ol className={styles.steps}>
                  {initialRecipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </section>
            </div>

            <aside className={styles.sidebar}>
              <h3 className={styles.infoTitle}>General Informations</h3>

              <p>
                <strong>Category:</strong> {initialRecipe.category}
              </p>

              <p>
                <strong>Cooking time:</strong> {initialRecipe.cookingTime}
              </p>

              <p>
                <strong>Calories:</strong> {initialRecipe.calories}
              </p>

              <div className={styles.saveButtonWrapper}>
                <SaveButton />
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </Section>
  );
}