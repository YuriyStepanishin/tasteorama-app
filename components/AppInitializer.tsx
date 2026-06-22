// components/AppInitializer.tsx

"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/userStore";

export default function AppInitializer() {
  const initUser = useAuthStore((state) => state.initUser);

  useEffect(() => {
    initUser();
  }, [initUser]);

  return null;
}