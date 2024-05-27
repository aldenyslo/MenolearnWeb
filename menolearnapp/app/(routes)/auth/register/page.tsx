import { AuthOther } from "@/components/auth/AuthOther"
import { AuthWrapper } from "@/components/auth/AuthWrapper"
import { RegisterForm } from "@/components/auth/RegisterForm"
const RegisterPage = () => {
  return (
    <AuthWrapper
      title="Welcome"
      description="Ready to document your journey? We’re here to guide you every step of the way."
    >
      <RegisterForm />
    </AuthWrapper>
  )
}

export default RegisterPage
