import ProfileNavigation from '@/components/ProfileNavigation/ProfileNavigation';
import ProfileRecipes from '@/components/ProfileRecipes/ProfileRecipes';

interface ProfilePageProps {
  params: Promise<{
    recipeType: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { recipeType } = await params;

  return (
    <main>
      <ProfileNavigation />

      <ProfileRecipes recipesType={recipeType} />
    </main>
  );
}
