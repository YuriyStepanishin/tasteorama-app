'use client';

import Link from 'next/link';

import LogoIcon from '@/icons/LogoIcon';

import css from './Logo.module.css';

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <Link
      href="/"
      className={css.logoLink}
      onClick={onClick}
      aria-label="Go to home page"
    >
      <LogoIcon className={css.logoIcon} />
      <span className={css.logoText}>Tasteorama</span>
    </Link>
  );
}
