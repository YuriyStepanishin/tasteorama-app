'use client';

import css from './page.module.css';
import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';

import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import SaveButton from "@/components/Auth/SaveButton"; 

const Home = () => {
  return (
    <main className={css.main}>
      <Section className={css.headerSection}>
        <Container>
          <Toaster />
          <Header />
        </Container>
      </Section>

     <Section>
        <Container>
          <h2>Demo Save</h2>
          <SaveButton />
        </Container>
      </Section>

      <Section className={css.footerSection}>
        <Container>
          <Footer />
        </Container>
      </Section>
    </main>
  );
};

export default Home;
  