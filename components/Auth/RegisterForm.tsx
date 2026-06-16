//components/Auth/RegisterForm.tsx


"use client";

import styles from "./RegisterForm.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/validation/registerSchema";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider"; 

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
const auth = useContext(AuthContext);

if (!auth) {
  throw new Error("AuthProvider missing");
}

const { setUser } = auth;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,


    onSubmit: async (values) => {
  try {
    setLoading(true);

    const data = await registerUser({
      name: values.name,
      email: values.email,
      password: values.password,
    });


    setUser(data.user); 

    toast.success("Registration successful 🎉");

    router.push("/");
  } catch (err: any) {
    toast.error(err.message || "User already exists");
  } finally {
    setLoading(false);
  }
},
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Register</h1>

        <p className={styles.subtitle}>
          Join our community of culinary enthusiasts, save your favorite recipes, and share your cooking creations
        </p>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          {/* NAME */}
          <label className={styles.label}>Enter your name</label>
          <input
            type="text"
            name="name"
            placeholder="Max"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
className={`${styles.input} ${
  formik.touched.name && formik.errors.name ? styles.inputError : ""
}`}          />
          {formik.touched.name && formik.errors.name && (
            <p className={styles.error}>{formik.errors.name}</p>
          )}

          {/* EMAIL */}
          <label className={styles.label}>Enter your email address</label>
          <input
            type="email"
            name="email"
            placeholder="email@gmail.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
className={`${styles.input} ${
  formik.touched.email && formik.errors.email ? styles.inputError : ""
}`}
        />
          {formik.touched.email && formik.errors.email && (
            <p className={styles.error}>{formik.errors.email}</p>
          )}

          {/* PASSWORD */}
          <label className={styles.label}>Create a strong password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
className={`${styles.input} ${
  formik.touched.password && formik.errors.password ? styles.inputError : ""
}`}            />
        <button
  type="button"
  className={styles.eye}
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 3L21 21" stroke="#555" strokeWidth="2"/>
      <path d="M10.58 10.58C10.21 10.95 10 11.45 10 12C10 13.1 10.9 14 12 14C12.55 14 13.05 13.79 13.42 13.42" stroke="#555" strokeWidth="2"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M1 12C3 7 7 4 12 4C17 4 21 7 23 12C21 17 17 20 12 20C7 20 3 17 1 12Z" stroke="#555" strokeWidth="2"/>
      <circle cx="12" cy="12" r="3" stroke="#555" strokeWidth="2"/>
    </svg>
  )}
</button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className={styles.error}>{formik.errors.password}</p>
          )}

          {/* CONFIRM */}
          <label className={styles.label}>Repeat your password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="********"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
className={`${styles.input} ${
  formik.touched.confirmPassword && formik.errors.confirmPassword
    ? styles.inputError
    : ""
}`}
          />
<button
  type="button"
  className={styles.eye}
  onClick={() => setShowConfirm(!showConfirm)}
>
  {showConfirm ? (
    // eye OFF
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 3L21 21" stroke="#555" strokeWidth="2"/>
      <path d="M10.58 10.58C10.21 10.95 10 11.45 10 12C10 13.1 10.9 14 12 14C12.55 14 13.05 13.79 13.42 13.42" stroke="#555" strokeWidth="2"/>
    </svg>
  ) : (
    // eye ON
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M1 12C3 7 7 4 12 4C17 4 21 7 23 12C21 17 17 20 12 20C7 20 3 17 1 12Z" stroke="#555" strokeWidth="2"/>
      <circle cx="12" cy="12" r="3" stroke="#555" strokeWidth="2"/>
    </svg>
  )}
</button>
          </div>

          {formik.touched.confirmPassword &&
            formik.errors.confirmPassword && (
              <p className={styles.error}>
                {formik.errors.confirmPassword}
              </p>
            )}

         <button
  type="submit"
  className={styles.button}
  disabled={loading}
>
  {loading ? "Loading..." : "Create account"}
</button>

          <p className={styles.loginText}>
            Already have an account?{" "}
            <Link href="/auth/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}