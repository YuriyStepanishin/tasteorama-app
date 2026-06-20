//app/register/page.tsx

import RegisterForm from "@/components/Auth/RegisterForm";

<<<<<<< HEAD:app/register/page.tsx
export const metadata = {
  title: "Register | Tasteorama",
=======
export const generateMetadata = () => {
  return {
    title: "Register | Tasteorama",
    description: "Create your account",
  };
>>>>>>> main:app/auth/register/page.tsx
};

export default function RegisterPage() {
return <RegisterForm />;
}
