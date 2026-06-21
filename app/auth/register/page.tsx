import RegisterForm from "@/components/Auth/RegisterForm";

export const generateMetadata = () => {
  return {
    title: "Register | Tasteorama",
    description: "Create your account",
  };
};

export default function RegisterPage() {
  return <RegisterForm />;
}