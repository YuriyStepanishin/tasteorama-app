'use client';

import Link from 'next/link';
import { useState } from 'react';

import AuthModal from '@/components/AuthModal/AuthModal';
import Container from '@/components/Container/Container';
import Logo from '../Logo/Logo';
import { useAuthStore } from '@/lib/stores/userStore';

import css from './Footer.module.css';

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className={css.footerBgWrapper}>
      <Container>
        <footer className={css.footer}>
          <Logo />

          <p className={css.copyright}>© 2025 CookingCompanion. All rights reserved.</p>

          <nav>
            <ul className={css.navList}>
              <li>
                <Link href="/recipes" className={css.navLink}>
                  Recipes
                </Link>
              </li>

              <li>
                {isAuthenticated ? (
                  <Link href="/profile/own" className={css.navLink}>
                    Account
                  </Link>
                ) : (
                  <button type="button" className={css.navButton} onClick={() => setIsOpen(true)}>
                    Account
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </footer>

        {isOpen && <AuthModal onClose={() => setIsOpen(false)} />}
      </Container>
    </div>
  );
}
