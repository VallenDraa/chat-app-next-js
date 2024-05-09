import { AuthFormLayout, RegisterForm } from '../_components';

export default function SignUpPage() {
  return (
    <AuthFormLayout
      title='sign up'
      subtitle='enter your email below to sign up to Konnnect!'
      redirectTitle='already have an account?'
      redirectLink='/auth/login'
      redirectLinkText='login'
    >
      <RegisterForm />
    </AuthFormLayout>
  );
}
