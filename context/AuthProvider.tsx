"use client";

import { useEffect } from "react";
import { getMe } from "@/lib/auth";
import { useUserStore } from "@/store/userStore";

export default function AuthProvider({ children }: any) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    getMe()
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
    .catch(() => {
  setUser(null);
});
  }, []);

  return children;
}