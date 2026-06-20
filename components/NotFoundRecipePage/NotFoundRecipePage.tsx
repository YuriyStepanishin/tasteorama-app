import Image from 'next/image';
import Link from 'next/link';
import styles from './NotFoundRecipePage.module.css';

export default function NotFoundRecipePage() {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src="/photos/404-notFound.jpg"
          alt="Recipe not found"
          width={361}
          height={267}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.heading}>404</h2>
        <p className={styles.text}>Recipe not found</p>
        <Link href="/" className={styles.button}>
          <span className={styles.arrow}>
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.375 4.41439L0.374956 4.41437M4.41267 0.375171L0.374956 4.41437L4.41267 8.45352"
                stroke="white"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
