'use client';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useId, useState } from 'react';
import css from './LoginForm.module.css';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/clientApi';
import { useAuthStore } from '../../../lib/stores/userStore';
import Image from 'next/image';
import { LoginProps } from '@/lib/clientApi';
import { validationLoginSchema } from '../../../validation/LoginFormValidation';
import { AxiosError } from 'axios';
// import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';

const Login = () => {
  console.log('render Login form');

  const router = useRouter();
  // const [error, setError] = useState<string | null>(null);
  const fieldId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  // ДОДАНО: стор обраних рецептів, щоб одразу підвантажити favorites після логіну
  // const loadFavorites = useFavoritesStore((state) => state.loadFavorites);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res) {
        if (res._id) {
          localStorage.setItem('userId', res._id);
        }
        setUser(res);
        // ДОДАНО: без цього іконки favorite не відображали реальний стан до перезавантаження сторінки
        // void loadFavorites();
        toast.success('Login successful!');
        router.push('/');
      }
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      const errorMessage = error.response?.data?.error ?? error.message ?? 'Oops... some error';
      toast.error(errorMessage, { id: 'login-error' });
    },
  });

  const handleSubmit = async (values: LoginProps, actions: FormikHelpers<LoginProps>) => {
    mutation.mutate(values);
    actions.setSubmitting(false);
  };

  //   setError(null);
  //   try {
  //     mutation.mutate(values);
  //     actions.setSubmitting(false);

  //     if (user) {
  //       setUser(user);

  //       // router.push('/');
  //     }
  //   } catch (err: unknown) {
  //     setError((err as Error).message || 'Oops... some error');
  //   } finally {
  //     setSubmitting(false);
  //   }
  //   mutation.mutate(values);
  //   actions.setSubmitting(false);
  // };

  return (
    <div className={css.pageWrapper}>
      <div className={css.formContainer}>
        <h2 className={css.title}>Login</h2>

        <Formik<LoginProps>
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationLoginSchema}
          validateOnMount
        >
          {({ isValid, dirty }) => (
            <Form className={css.form}>
              <div className={css.fieldGroup}>
                <label htmlFor={`${fieldId}-email`} className={css.label}>
                  Enter your email address
                </label>
                <Field
                  id={`${fieldId}-email`}
                  name="email"
                  type="email"
                  placeholder="email@gmail.com"
                  className={css.input}
                />
                <ErrorMessage name="email" component="span" className={css.error} />
              </div>

              <div className={css.fieldGroup}>
                <label htmlFor={`${fieldId}-password`} className={css.label}>
                  Enter your password
                </label>
                <div className={css.passwordWrapper}>
                  <Field
                    id={`${fieldId}-password`}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="*********"
                    className={css.input}
                  />
                  <button
                    type="button"
                    className={css.eyeButton}
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <svg
                        width="15"
                        height="13"
                        viewBox="0 0 15 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.99039 3.05679C3.40584 3.05679 0.5 6.52272 0.5 7.40338C0.5 8.28405 3.40584 11.75 6.99039 11.75C10.5749 11.75 13.4808 8.28405 13.4808 7.40338C13.4808 6.52272 10.5749 3.05679 6.99039 3.05679ZM6.99039 3.05679C5.41319 3.05679 4.13464 4.31599 4.13464 5.86929C4.13464 7.42259 5.41322 8.68179 6.99041 8.68179C8.56761 8.68179 9.84618 7.42259 9.84618 5.86929C9.84618 4.31599 8.56758 3.05679 6.99039 3.05679ZM14 3.05682C12.0231 1.43253 9.71518 0.5 7.25 0.5C4.78482 0.5 2.47688 1.43253 0.5 3.05682"
                          stroke="black"
                          // stroke-linecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.53571 12.1124C8.72129 12.4906 7.81731 12.7368 6.86549 12.7368C3.28098 12.7368 0.375171 9.24568 0.375171 8.35862C0.375171 7.8558 1.30882 6.51631 2.7705 5.45021M12.577 9.76171C13.0737 9.16413 13.3558 8.63499 13.3558 8.35862C13.3558 7.47156 10.45 3.98049 6.86549 3.98049C8.44267 3.98049 9.7212 5.24882 9.7212 6.8134M6.86546 9.64631C5.28828 9.64631 4.00972 8.37797 4.00972 6.8134M13.875 3.98057C11.8982 2.3445 9.59025 1.4052 7.1251 1.4052C6.23658 1.4052 5.3685 1.52722 4.52897 1.75992M0.375171 3.98057C0.558415 3.82892 0.744503 3.68325 0.933297 3.54376M0.375 0.375L12.9106 13.0311"
                          stroke="black"
                          // stroke-width="0.75"
                          // stroke-linecap="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <ErrorMessage name="password" component="span" className={css.error} />
              </div>
              <button
                type="submit"
                disabled={!dirty || !isValid || mutation.isPending}
                className={css.button}
              >
                {mutation.isPending ? (
                  <p>LOADER</p>
                ) : (
                  // <Oval height={20} width={20} strokeWidth={5} color="#fff" /> // Лоадер
                  'Login'
                )}
              </button>
            </Form>
          )}
        </Formik>
        <p className={css.registerwrapp}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className={css.registerwrapp_link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
