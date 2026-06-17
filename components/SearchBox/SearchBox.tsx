'use client';

import { useState } from 'react';
import styles from './SeardchBox.module.css';
import { Placeholder } from 'react-select/animated';

const handleSubmit = () => {
  event.preventDefault;
};

export default function SearchBox() {
  const [value, setValue] = useState('');
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} placeholder={placeholder} />

      <button>Search</button>
    </form>
  );
}
