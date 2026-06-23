'use client';
import { useState } from 'react';
import SearchBox from '@/components/SearchBox/SearchBox';
// import container from '@/components/Container/Container';
import css from './Hero.module.css';

type PropsHero = {
  onSearch: (query: string) => void | Promise<void>;
  loading?: boolean;
  toast?: string | null;
};

export default function Hero({ onSearch, toast }: PropsHero) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (query: string) => {
    setLoading(true);
    await onSearch(query);
    setLoading(false);
  };

  return (
    <section className={css.hero}>
      <div className={css.heroContent}>
        <h1>
          Plan, Cook, and <br />
          Share Your Flavors
        </h1>
        <SearchBox onSearch={handleSubmit} loading={loading} />
        {toast && <div className={css.heroToast}> {toast} </div>}
      </div>
    </section>
  );
}
