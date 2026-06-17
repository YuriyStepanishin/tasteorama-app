//components/Auth/SaveButton.tsx


"use client";

import { useState } from "react";
import AuthModal from "./AuthModal";

export default function SaveButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Save recipe
      </button>

      {open && <AuthModal onClose={() => setOpen(false)} />}
    </>
  );
}