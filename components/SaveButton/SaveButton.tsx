<<<<<<< HEAD:components/Auth/SaveButton.tsx
'use client';

import { useState } from 'react';
import AuthModal from './AuthModal';
=======
//components/SaveButton/SaveButton.tsx


"use client";

import { useState } from "react";
import AuthModal from "@/components/AuthModal/AuthModal";
>>>>>>> main:components/SaveButton/SaveButton.tsx

export default function SaveButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        style={{
          width: '100%',
          height: '40px',
          background: '#9b6c43',
          color: '#fff',
          borderRadius: '6px',
        }}
        onClick={() => setOpen(true)}
      >
        Save
      </button>

      {open && (
        <AuthModal onClose={() => setOpen(false)} />
      )}
    </>
  );
}