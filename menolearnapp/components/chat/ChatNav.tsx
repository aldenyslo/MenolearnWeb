import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export const ChatNav = () => {
  return (
    <header>
      <Link href="/">
        <ChevronLeft className="h-6 w-6" />
      </Link>
    </header>
  )
}
