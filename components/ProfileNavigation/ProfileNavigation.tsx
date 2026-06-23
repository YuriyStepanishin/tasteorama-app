'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProfileNavigation() {
  const pathname = usePathname();

  return (
    <nav>
      <Link
        href="/profile/own"
        style={{
          fontWeight: pathname === '/profile/own' ? '700' : '400',
          textDecoration: pathname === '/profile/own' ? 'underline' : 'none',
        }}
      >
        My recipes
      </Link>

      {' | '}

      <Link
        href="/profile/favorites"
        style={{
          fontWeight: pathname === '/profile/favorites' ? '700' : '400',
          textDecoration: pathname === '/profile/favorites' ? 'underline' : 'none',
        }}
      >
        Saved recipes
      </Link>
    </nav>
  );
}
