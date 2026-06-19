'use client';

import Link from 'next/link';

/*
  Заглушка навігації.

  Зараз показує всі маршрути,
  щоб команда могла працювати.

  Після реалізації авторизації
  логіка буде оновлена.
*/

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Recipes</Link>
        </li>

        <li>
          <Link href="/login">Log in</Link>
        </li>

        <li>
          <Link href="/register">
            Register
          </Link>
        </li>

        <li>
          <Link href="/profile">
            My Profile
          </Link>
        </li>

        <li>
          <Link href="/recipes/add">
            Add Recipe
          </Link>
        </li>
      </ul>
    </nav>
  );
}

