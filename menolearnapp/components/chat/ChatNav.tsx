import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const ChatNav = () => {
  return (
    <header>
      <Button>
        <Link href="/">
          <ChevronLeft className="h-6 w-6" />
        </Link>
      </Button>
    </header>
  )
}
