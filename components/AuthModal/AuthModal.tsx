//components/AuthModal/AuthModal.tsx

"use client";

import styles from "./AuthModal.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  onClose: () => void;
};

export default function AuthModal({ onClose }: Props) {
    const router = useRouter();

useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  window.addEventListener("keydown", handleEsc);
  return () => window.removeEventListener("keydown", handleEsc);
}, [onClose]);

useEffect(() => {
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = "";
  };
}, []);

  return (
    <div className={styles.backdrop} onClick={onClose}>
  <div
    className={styles.modal}
     role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
    onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>

  <h2 id="auth-title">Please log in or register</h2>

  <p>
    To save this recipe, you need to authorize first
  </p>

          <div className={styles.actions}>
            
<button
  className={styles.login}
onClick={() => {
  onClose();
router.push("/auth/login");
}}
>
  Log in
</button>

<button
  className={styles.register}
onClick={() => {
  onClose();
  router.push("/auth/register");
}}
>
  Register
</button>
        </div>
      </div>
    </div>
  );
}
