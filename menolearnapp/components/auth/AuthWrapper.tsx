interface CardWrapperProps {
  title: string
  description: string
  children: React.ReactNode
}

export const AuthWrapper = ({
  title,
  description,
  children,
}: CardWrapperProps) => {
  return (
    <main className="grid gap-12 mx-16 w-full text-center">
      <div className="text-center text-blue-800">
        <h1 className="font-semibold text-4xl">
          {title}
        </h1>
        <p className="font-medium">{description}</p>
      </div>

      {children}
    </main>
  )
}
