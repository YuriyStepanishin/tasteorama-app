'use client';

import { useRef, MouseEvent } from 'react';
import styles from './LoadMoreBtn.module.css';

interface LoadMoreButtonProps {
  onLoadMore: () => Promise<void> | void;
  isLoading: boolean;
}

export default function LoadMoreButton({ onLoadMore, isLoading }: LoadMoreButtonProps) {
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (isLoading) return;

    await onLoadMore();

    setTimeout(() => {
      scrollAnchorRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 80);
  };

  return (
    <>
      <div ref={scrollAnchorRef} className={styles.scrollAnchor} />

      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`${styles.btnLoadMore} ${isLoading ? styles.loading : ''}`}
      >
        {isLoading ? 'Loading...' : 'Load More'}
      </button>
    </>
  );
}
