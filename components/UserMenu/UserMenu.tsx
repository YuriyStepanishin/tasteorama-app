
'use client';

import { useState } from 'react';
import LogoutModal from '../LogoutModal/LogoutModal';

/*
 Заглушка меню користувача.

  Реальні дані будуть
  підключені після реалізації
  авторизації.
*/


export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div>
        <div>UK</div>

        <span>User</span>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
        >
          Log Out
        </button>
      </div>

      {isOpen && (
        <LogoutModal
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

