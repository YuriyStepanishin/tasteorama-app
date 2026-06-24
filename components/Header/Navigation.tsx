'use client';

import Link from 'next/link';

import { User } from '@/types/user';
import UserMenu from '@/components/UserMenu/UserMenu';

import css from './Header.module.css';

interface NavigationProps {
  isAuth: boolean;
  user: User | null;
  pathname: string;
  onCloseMenu: () => void;
  onLogout: () => void;
}

export default function Navigation({
  isAuth,
  user,
  pathname,
  onCloseMenu,
  onLogout,
}: NavigationProps) {
  // Функція для підсвічування активного лінка
  const getLinkClass = (path: string) => {
    return pathname === path ? `${css.navLink} ${css.activeLink}` : css.navLink;
  };

  return (
    <ul className={css.navList}>
      {/* Цей лінк показуємо ЗАВЖДИ (і для гостей, і для авторизованих) */}
      <li className={css.navItem}>
        <Link href="/recipes" className={getLinkClass('/recipes')} onClick={onCloseMenu}>
          Recipes
        </Link>
      </li>

      {/* Якщо користувач НЕ авторизований */}
      {!isAuth ? (
        <>
          <li className={css.navItem}>
            <Link href="/auth/login" className={getLinkClass('/auth/login')} onClick={onCloseMenu}>
              Log in
            </Link>
          </li>
          <li className={css.navItem}>
            <Link
              href="/auth/register"
              className={`${css.navLink} ${css.btnRegister}`}
              onClick={onCloseMenu}
            >
              Register
            </Link>
          </li>
        </>
      ) : (
        // Якщо користувач АВТОРИЗОВАНИЙ
        <>
          <li className={css.navItem}>
            <Link
              href="/profile/own"
              className={getLinkClass('/profile/own')}
              onClick={onCloseMenu}
            >
              My profile
            </Link>
          </li>
          <li className={css.navItem}>
            <Link
              href="/recipes/add"
              className={getLinkClass('/recipes/add')}
              onClick={onCloseMenu}
            >
              Add Recipe
            </Link>
          </li>

          {/* Окремий компонент меню користувача */}
          <li className={css.navItem}>
            <UserMenu user={user} onLogout={onLogout} onCloseMenu={onCloseMenu} />
          </li>
        </>
      )}
    </ul>
  );
}
