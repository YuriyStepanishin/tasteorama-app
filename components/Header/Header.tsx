'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import BurgerButton from './BurgerButton';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import Logo from '../Logo/Logo';
import { User } from '@/types/user';
import Container from '@/components/Container/Container';

import css from './Header.module.css';


export default function Header() {
  const pathname = usePathname();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  // --- ЗАГЛУШКИ ДЛЯ ТЕСТУВАННЯ (Змінюй на реальний стейт/хуки) ---
  const isAuthenticated = true; // true зареєстрований false ні
  const user = isAuthenticated ? ({ name: 'Max', email: 'max@test.com', _id:'mock-id' } as User) : null;
  const logout = () => alert('Вихід виконано!');
  // ------------------------------------------------

  useEffect(() => {
    document.body.style.overflow = isBurgerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isBurgerOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsBurgerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => setIsBurgerOpen(false);
  
  const handleDesktopLogout = () => { 
    logout(); 
  };

  const handleMobileLogout = () => { 
    logout(); 
    closeMenu(); 
  };

  return (
    <div>
      <Container >
        <header className={css.header}>
          
          <Logo onClick={closeMenu} />
          
          {/* Десктоп та Таблет навігація */}
          <nav className={css.desktopNavBox}>
            <DesktopNav 
              isAuth={isAuthenticated} 
              user={user} 
              pathname={pathname} 
              onLogout={handleDesktopLogout} 
            />
          </nav>
          
          {/* Бургер-кнопка для виклику модалки */}
          <BurgerButton isOpen={isBurgerOpen} setIsOpen={setIsBurgerOpen} />
          
          {/* Мобільна модалка */}
          <MobileMenu
            isOpen={isBurgerOpen}
            onClose={closeMenu}
            isAuth={isAuthenticated}
            user={user}
            onLogout={handleMobileLogout}
          />
          
        </header>
      </Container>
    </div>
  );
}
