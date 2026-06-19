'use client';

import { ClipLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.overlay} aria-busy="true" aria-label="Завантаження...">
      <ClipLoader loading={true} color="#808000" size={52} speedMultiplier={0.9} />
    </div>
  );
};

export default Loader;
