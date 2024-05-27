import { AuthWrapper } from "@/components/auth/AuthWrapper"
import { LoginForm } from "@/components/auth/LoginForm"

const LoginPage = async () => {
  return (
    <AuthWrapper
      title="Welcome back"
      description="Glad to see you again!"
    >
      <LoginForm />
    </AuthWrapper>
  )
}

export default LoginPage
