'use client';

import { useState } from 'react';

import { User } from '@/types/user';
import LogoutModal from '@/components/LogoutModal/LogoutModal';

import css from './UserMenu.module.css'


export function LogOutIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor" 
      strokeWidth="0.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M9.80769 4.875L7.06731 4.875C5.85653 4.875 4.875 5.85653 4.875 7.06731L4.875 16.9327C4.875 18.1435 5.85653 19.125 7.06731 19.125H9.80769M8.625 12L19.5865 12M16.2981 8.71154L19.5865 12L16.2981 15.2885" />
    </svg>
  );
}

interface UserMenuProps {
  user: User | null;
  onLogout: () => void;
  onCloseMenu?: () => void; 
}

export default function UserMenu({ user, onLogout, onCloseMenu }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const firstLetter = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U';

  const handleConfirmLogout = () => {
    setIsOpen(false);
    if (onCloseMenu) onCloseMenu(); 
    onLogout(); 
  };

  return (
    <>
      <div className={css.userMenu}>

        {/* Блок користувача */}
        <div className={css.userProfile}>
          <div className={css.avatar}>{firstLetter}</div>
          <span className={css.userName}>{user?.name || 'User'}</span>
        </div>
        
        <svg 
          className={css.userDivider}
          width="1" 
          height="39" 
          viewBox="0 0 1 39" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H1V39H0V0Z" fill="currentColor" />
        </svg>
            <button
              className={css.logoutBtn}
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Log Out" 
            >
              <LogOutIcon className={css.logoutIcon} />
            </button>
          </div>
       
      {isOpen && (
        <LogoutModal
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
    </>
  );
}



