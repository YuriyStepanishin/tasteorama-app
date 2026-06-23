'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from '../Logo/Logo';
import UserMenu from '@/components/UserMenu/UserMenu';
import { User } from '@/types/user';

import css from './Header.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuth: boolean;
  user: User | null;
  onLogout: () => void;
}

export default function MobileMenu({ isOpen, onClose, isAuth, user, onLogout }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className={css.modalMenu}>
      <div className={css.modalContainer}>
        
        {/* Шапка модалки */}

        <div className={css.menuHeader}>
            <Link href="/" className={css.logoLink} onClick={onClose}>
                <Logo />
            </Link>  
            <button 
               type="button" 
                className={css.closeButton} 
                onClick={onClose} 
                aria-label="Close menu">
                <svg 
                    width="32" 
                   height="32" 
                    viewBox="0 0 32 32" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={css.closeIcon} 
                >
                    <path 
                        d="M25.5 16C25.5 21.2467 21.2467 25.5 16 25.5C10.7533 25.5 6.5 21.2467 6.5 16C6.5 10.7533 10.7533 6.5 16 6.5C21.2467 6.5 25.5 10.7533 25.5 16Z" 
                        stroke="currentColor" 
                   />
                    <path 
                        d="M19.6993 12.3462L16.0001 16.0455M16.0001 16.0455L12.3008 19.7448M16.0001 16.0455L19.6993 19.7448M16.0001 16.0455L12.3008 12.3462" 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                    />
                </svg>
            </button>
        </div>
        

          {/* Список лінків */}
        <div className={css.menuContent}>
          <ul className={css.linksList}>
            <li>
              <Link href="/recipes" className={pathname === '/recipes' ? css.activeLink : css.link} onClick={onClose}>
                Recipes
              </Link>
            </li>
            
            {isAuth ? (
              <li>
                <Link href="/profile" className={pathname === '/profile' ? css.activeLink : css.link} onClick={onClose}>
                  My Profile
                </Link>
              </li>
            ) : (
              <>
                  <li>
                  <Link href="/auth/login" className={pathname === '/auth/login' ? css.activeLink : css.link} onClick={onClose}>
                    Log in
                  </Link>
                  </li>
                  <li>
                    <Link href="/auth/register" className={css.mobBtnRegister} onClick={onClose}>
                      Register
                    </Link>
                  </li>
              </>
            )}
          </ul>

          {/* Блок користувача рендериться ТІЛЬКИ якщо авторизований */}
          {isAuth && (
            <div className={css.userSection}>
              <UserMenu user={user} onLogout={onLogout} onCloseMenu={onClose} />
            </div>
          )}
        

        {/* Кнопка додавання рецепту */}
        {isAuth && (
          <div className={css.menuFooter}>
            <Link href="/recipes/add" className={css.mobBtnAddRecipe} onClick={onClose}>
              Add Recipe
            </Link>
          </div>
        )}

      </div>
      </div>
      </div>
  );
}

