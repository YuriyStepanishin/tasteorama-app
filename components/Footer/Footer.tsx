'use client';

import Link from 'next/link';
import { useEffect, useState  } from 'react';

import AuthModal from '@/components/AuthModal/AuthModal';
import Container from '@/components/Container/Container';
import Logo from '../Logo/Logo';
import { useAuthStore } from '@/lib/stores/userStore';

import css from './Footer.module.css';

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const checkHeight = () => {

      const hasNoScroll = document.documentElement.scrollHeight <= window.innerHeight;
      setIsBottom(hasNoScroll);
    };

    checkHeight();
    window.addEventListener('resize', checkHeight);
    
    const timer = setTimeout(checkHeight, 500); 

    return () => {
      window.removeEventListener('resize', checkHeight);
      clearTimeout(timer);
    };
  }, []);

  const footerClass = `${ css.footerBgWrapper } ${ isBottom ?css.fixedBottom: ''}`;
  
  return (
    <div className={footerClass}>
      <Container>
        <footer className={css.footer}>
          <Logo />

          <p className={css.copyright}>© 2025 CookingCompanion. All rights reserved.</p>

          <nav>
            <ul className={css.navList}>
              <li>
                <Link href="/" className={css.navLink}>
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
