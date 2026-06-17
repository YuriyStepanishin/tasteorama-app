'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import SaveButton from '@/components/Auth/SaveButton';

const Home = () => {
  return (
    <Section>
      <Container>
        <h2>Demo Save</h2>
        <SaveButton />
      </Container>
    </Section>
  );
};

export default Home;
