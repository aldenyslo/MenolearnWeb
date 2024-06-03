import { AuthWrapper } from "@/components/auth/AuthWrapper"
import { LoginForm } from "@/components/auth/LoginForm"

const LoginPage = async () => {
  return (
    <AuthWrapper
      title="Welcome to MenoLearn"
      description="Navigating Menopause Together —
      Your Personal Guide for Every Step."
    >
      <LoginForm />
    </AuthWrapper>
  )
}

export default LoginPage
