'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './ProfileNavigation.module.css';

export default function ProfileNavigation() {
  const pathname = usePathname();
  const isOwnPage = pathname === '/profile/own';
  const isFavoritesPage = pathname === '/profile/favorites';

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>My profile</h1>

      <nav className={styles.tabs} aria-label="Profile sections">
        <Link href="/profile/own" className={`${styles.tab} ${isOwnPage ? styles.active : ''}`}>
          My recipes
        </Link>

        <Link
          href="/profile/favorites"
          className={`${styles.tab} ${isFavoritesPage ? styles.active : ''}`}
        >
          Saved recipes
        </Link>
      </nav>
    </div>
  );
}
