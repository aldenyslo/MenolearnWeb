import Image from "next/image"

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
    <main className="w-full min-h-screen border bg-gradient-to-b p-16">
      <div className="text-center text-blue-800 space-y-4 mb-10 ">
        <Image
          src="/MenoLearnLogo.svg"
          height="100"
          width="100"
          alt="MenoLearn"
          className=" mx-auto"
        />
        <h1 className="font-semibold text-4xl ">
          {title}
        </h1>
        <p className="font-medium">{description}</p>
      </div>

      {children}
    </main>
  )
}
