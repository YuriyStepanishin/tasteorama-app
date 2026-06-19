'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import css from './LoginForm.module.css';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/clientApi';
import { useAuthStore } from '../../../lib/stores/userStore';
import { LoginProps } from '@/lib/clientApi';

const Login = () => {
  console.log('Login render');

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (
    values: LoginProps,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setError(null);
    try {
      const user = await login(values);
      if (user) {
        setUser(user);
        // router.push('/profile');
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Oops... some error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Login</h2>

      <Formik<LoginProps> initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={`${css.fieldGroup} ${css.mb}`}>
              <label htmlFor="email" className={css.label}>
                Enter your email address
              </label>
              <Field id="email" name="email" type="email" className={css.input} />
              <ErrorMessage name="email" component="div" className={css.error} />
            </div>

            <div className={css.fieldGroup}>
              <label htmlFor="password" className={css.label}>
                Enter your password
              </label>
              <Field id="password" name="password" type="password" className={css.input} />
              <ErrorMessage name="password" component="div" className={css.error} />
            </div>

            <button type="submit" disabled={isSubmitting} className={css.button}>
              {isSubmitting ? 'Loading...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <div className={css.registerwrapp}>
        <p>Don&apos;t have an account?</p>
        <Link href="/auth/register" className={css.registerwrapp_link}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
