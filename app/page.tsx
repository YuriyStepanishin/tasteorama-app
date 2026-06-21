'use client';

import { useState } from 'react';
import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import LoadMoreButton from '@/components/LoadMoreBtn/LoadMoreBtn';
import { useState } from 'react';
import Loader from '@/components/Loader/Loader';

import SaveButton from '@/components/Auth/SaveButton';
import Hero from '@/components/Hero/Hero';
import { searchRecipes } from '@/src/api/recipes';
import Loader from '@/components/Loader/Loader';
import Filters from '@/components/Filters/Filters';

const Home = () => {
  // const [recipes, setRecipes] = useState([]);
  // const [filters, setFilters] = useState({
  //   // приклад
  //   // category:
  //   // time:
  // });
  // const [isEmpty, setIsEmpty] = useState(false);
  // const [query, setQuery] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [toast, setToast] = useState<string | null>(null);

  // const handleSearch = async (query: string) => {
  //   const q = query.trim();

  //   setQuery(q);
  //   // if (q.length < 2) {
  //   //   setToast('Enter at least two characters');
  //   //   return;
  //   // }
  //   try {
  //     setLoading(true);

  //     const data = await searchRecipes({
  //       query: q,
  //       filters,
  //     });

  //     const recipesArray = data.recipes;
  //     // console.log('DATA:', data);

  //     if (!recipesArray || recipesArray.length === 0) {
  //       // if (recipesArray.length === 0) {
  //       setRecipes([]);
  //       setIsEmpty(true);
  //       // setToast(`No recipes found for "${q}"`);
  //       return;
  //     }

  //     setRecipes(recipesArray);
  //     // setToast(null);
  //     setIsEmpty(false);
  //   } catch (error) {
  //     // setToast('Request error');
  //     setIsEmpty(true);
  //     setRecipes([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const [loading, setLoading] = useState<boolean>(false);
  const handleLoadMoreRecipes = async (): Promise<void> => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Recipes loaded successfully!');
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      {loading && <Loader />}
      <Container>
        <h2>Demo Save</h2>
        <SaveButton />
      </Container>
      <LoadMoreButton onLoadMore={handleLoadMoreRecipes} isLoading={loading} />
    </Section>
  );
};

// return (
//     <main>
//       <Section>
//         <Container>
//           <h2>Demo Save</h2>
//           <SaveButton />
//         </Container>
//       </Section>
//       <Section>
//         <Container>
//           <Hero onSearch={handleSearch} loading={loading} toast={toast} />
//           {query && (
//             <section>
//               <h2>Search resalt for "{query}"</h2>
//               <p>{recipes.length} recipes</p>
//               <Filters filters={filters} setFilters={setFilters} />
//             </section>
//           )}
//         </Container>
//       </Section>
//       {toast && <div className="toast">{toast}</div>}
//     </main>
//   );
// };

export default Home;
