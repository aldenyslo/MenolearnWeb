import Image from "next/image"
import Link from "next/link"

export const ChatNav = () => {
  return (
    <header>
      <Link href="/">
        <Image
          src="/left-chevron.svg"
          width="24"
          height="24"
          alt="back button"
        />
      </Link>
    </header>
  )
}
