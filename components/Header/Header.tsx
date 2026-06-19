'use client';

import Link from 'next/link';

import Navigation from '@/components/Navigation/Navigation';
import Container from '../Container/Container';

/*
  Header згідно ТЗ містить:

  - логотип;
  - навігацію;
  - інформацію про користувача.

  Авторизація поки не реалізована,
  тому використовується заглушка.
*/

export default function Header() {
  return (
    <div>
      <Container>
        <header>
          <Link href="/">Tasteorama</Link>

          <Navigation />
        </header>
      </Container>
    </div>
  );
}
