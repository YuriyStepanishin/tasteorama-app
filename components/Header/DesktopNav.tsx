'use client';

import Link from 'next/link';
import UserMenu from '@/components/UserMenu/UserMenu';
import { User } from '@/types/user';

import css from './Header.module.css';

interface DesktopNavProps {
  isAuth: boolean;
  user: User | null;
  pathname: string;
  onLogout: () => void;
}

export default function DesktopNav({ isAuth, user, pathname, onLogout }: DesktopNavProps) {
  return (
    <ul className={css.navList}>
      <li>
        <Link href="/recipes" className={pathname === '/recipes' ? css.activeLink : css.link}>
          Recipes
        </Link>
      </li>

      {!isAuth ? (
        <>
          <li>
            <Link
              href="/auth/login"
              className={pathname === '/auth/login' ? css.activeLink : css.link}
            >
              Log in
            </Link>
          </li>
          <li>
            <Link href="/auth/register" className={css.deskRegisterBtn}>
              Register
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              href="/profile/own"
              className={pathname.startsWith('/profile') ? css.activeLink : css.link}
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link href="/recipes/add" className={css.deskAddRecipeBtn}>
              Add Recipe
            </Link>
          </li>

          {/* Інтегроване меню користувача */}
          <li>
            <UserMenu user={user} onLogout={onLogout} />
          </li>
        </>
      )}
    </ul>
  );
}
