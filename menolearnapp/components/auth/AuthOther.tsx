import Link from "next/link"

interface AuthOtherProps {
  href: string
  label: string
}

export const AuthOther = ({
  href,
  label,
}: AuthOtherProps) => {
  return (
    <Link
      className="text-blue-400 underline text-sm font-medium"
      href={href}
    >
      {label}
    </Link>
  )
}
