'use client';

import { useState } from 'react';
import css from './SeardchBox.module.css';
// import { Placeholder } from 'react-select/animated';

type PropsSearchBox = {
  onSearch: (value: string) => void | Promise<void>;
  loading?: boolean;
};

export default function SearchBox({ onSearch, loading }: PropsSearchBox) {
  //   const [searchQuery, setSearchQuery] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // console.log('SUBMIT CLICKED');
    // console.log('VALUE:', value);
    event.preventDefault();
    // const err = validate(value);
    const trimedValue = value.trim();

    if (!trimedValue) {
      setError('Search field cannot be empty');
      return;
    }

    if (trimedValue.length < 2) {
      setError('Enter at least 2 characters');
      return;
    }

    setError(null);
    onSearch(trimedValue);
  };

  return (
    <form className={css.searchBox} onSubmit={handleSubmit}>
      <div className={css.inputWraper}>
        <input
          className={`${css.searchBoxInput} ${error ? css.errorInput : ''}`}
          // className={css.searchBoxInput}
          type="text"
          placeholder="Search recipes"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
        />
        {error && <div className={css.error}>{error}</div>}
      </div>

      <button className={css.searchBoxButton} type="submit" disabled={loading}>
        Search
      </button>
    </form>
  );
}
