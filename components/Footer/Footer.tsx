'use client';

import Link from 'next/link';
import { useState } from 'react';

import AuthModal from '@/components/Auth/AuthModal';
import Container from '@/components/Container/Container';

/*
  Footer згідно ТЗ містить:

  - логотип;
  - копірайт;
  - навігацію.

  Поки що використовується
  модальне вікно-заглушка.
*/

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Container>
        <footer>
          <Link href="/">Tasteorama</Link>

          <nav>
            <ul>
              <li>
                <Link href="/">Recipes</Link>
              </li>

              <li>
                <button type="button" onClick={() => setIsOpen(true)}>
                  Account
                </button>
              </li>
            </ul>
          </nav>

          <p>© 2025 CookingCompanion. All rights reserved.</p>
        </footer>

        {isOpen && <AuthModal onClose={() => setIsOpen(false)} />}
      </Container>
    </div>
  );
}
