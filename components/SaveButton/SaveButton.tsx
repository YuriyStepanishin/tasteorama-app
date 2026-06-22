//components/SaveButton/SaveButton.tsx


"use client";

import { useState } from "react";
import AuthModal from "@/components/AuthModal/AuthModal";

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