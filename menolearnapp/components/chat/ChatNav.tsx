import Image from "next/image"
import Link from "next/link"

export const ChatNav = () => {
  return (
    <nav>
      <Link href="/">
        <Image
          src="/left-chevron.svg"
          width="24"
          height="24"
          alt="back button"
        />
      </Link>
    </nav>
  )
}
