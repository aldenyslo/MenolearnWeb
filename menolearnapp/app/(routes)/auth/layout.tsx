const AuthLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="font-poppins h-screen flex items-center justify-center bg-gradient-to-b from-grey-100 from-40% via-blue-200 via-90% to-blue-300 to-100%">
      {children}
    </div>
  )
}

export default AuthLayout
