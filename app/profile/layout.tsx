import { ReactNode } from 'react';
import ProfileNavigation from '@/components/ProfileNavigation/ProfileNavigation';
import Container from '@/components/Container/Container';
import styles from './layout.module.css';

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <main className={styles.page}>
      <Container>
        <div className={styles.content}>
          <ProfileNavigation />
          {children}
        </div>
      </Container>
    </main>
  );
}
