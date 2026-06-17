'use client';

import css from './page.module.css';

import SaveButton from "@/components/Auth/SaveButton"; 

const Home = () => {
  return (
    <main className={css.main}>
          <Toaster />
          <Header />
     <Section>
        <Container>
          <h2>Demo Save</h2>
          <SaveButton />
        </Container>
      </Section>
          <Footer />
    </main>
  );
};

export default Home;
  