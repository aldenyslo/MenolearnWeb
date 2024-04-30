"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

const NewChatBtn = () => {
  const router = useRouter()

  const handleNewChat = async () => {
    try {
      const res = await fetch("/api/chats", {
        method: "POST",
        body: JSON.stringify({ userId: "1" }), // to update with auth
      }).then((res) => res.json())

      router.push(`/chats/${res.id}`)
    } catch (err) {
      console.error("new chat cannot be created")
    }
  }
  return (
    <div className="">
      <Link
        onClick={handleNewChat}
        href="/"
        className="font-bold text-primary-400 bg-secondary-200 px-4 py-3 block text-center rounded-2xl mx-16"
      >
        Chat with MenoLearn
      </Link>
    </div>
  )
}

export default NewChatBtn
