'use client';

import { useState } from 'react';
import styles from './Filters.module.css';
import Image from 'next/image';
import FiltersModal from './FiltersModal/FiltersModal';
import { Category } from '@/types/category';
import { Ingredient } from '@/types/indredient';

interface FiltersProps {
  recipesCount: number;
  categories: Category[];
  ingredients: Ingredient[];

  selectedCategory: string;
  selectedIngredient: string;

  onCategoryChange: (value: string) => void;
  onIngredientChange: (value: string) => void;
  onResetFilters: () => void;
}

const Filters = ({
  recipesCount,
  categories,
  ingredients,
  selectedCategory,
  selectedIngredient,
  onCategoryChange,
  onIngredientChange,
  onResetFilters,
}: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.filters}>
      <p className={styles.recipesCount}>{recipesCount} recipes</p>

      {/* mobile/tablet */}

      <button type="button" className={styles.mobileFilterButton} onClick={() => setIsOpen(true)}>
        Filters
        <Image
          src="/icons/iconFilter.svg"
          alt="Filter icon"
          width={24}
          height={24}
          className={styles.filterIcon}
        />
      </button>

      {/* Desktop */}
      <div className={styles.desktopControls}>
        <button type="button" className={styles.resetButton} onClick={onResetFilters}>
          Reset filters
        </button>

        <select
          className={styles.select}
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Category</option>

          {categories?.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={selectedIngredient}
          onChange={(e) => onIngredientChange(e.target.value)}
        >
          <option value="">Ingredient</option>

          {ingredients?.map((ingredient) => (
            <option key={ingredient._id} value={ingredient._id}>
              {ingredient.name}
            </option>
          ))}
        </select>
      </div>
      {isOpen && (
        <FiltersModal
          categories={categories}
          ingredients={ingredients}
          selectedCategory={selectedCategory}
          selectedIngredient={selectedIngredient}
          onCategoryChange={onCategoryChange}
          onIngredientChange={onIngredientChange}
          onResetFilters={onResetFilters}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
export default Filters;
