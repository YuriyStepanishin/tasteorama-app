import { ReactNode } from 'react';
import ProfileNavigation from '@/components/ProfileNavigation/ProfileNavigation';

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <main>
      <ProfileNavigation />
      {children}
    </main>
  );
}
