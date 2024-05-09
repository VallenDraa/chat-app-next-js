import { AuthFormLayout, LoginForm } from '../_components';

export default function LoginPage() {
  return (
    <AuthFormLayout
      title='login'
      subtitle='enter your email below to login to your account!'
      redirectTitle="don't have an account?"
      redirectLink='/auth/sign-up'
      redirectLinkText='sign up'
    >
      <LoginForm />
    </AuthFormLayout>
  );
}
