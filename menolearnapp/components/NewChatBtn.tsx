"use client"
import { Chat } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"

const NewChatBtn = () => {
  const router = useRouter()

  const chatMutation = useMutation({
    mutationFn: () => {
      return fetch(`/api/chats`, {
        method: "POST",
        body: JSON.stringify({
          userId: "1", // to update with auth
        }),
      }).then((res) => res.json())
    },
    onSuccess: (res: Chat) => {
      router.push(`/chats/${res.id}`)
    },
  })

  return (
    <div className="">
      <Link
        onClick={() => chatMutation.mutate()}
        href="/"
        className="font-bold text-primary-400 bg-secondary-200 px-4 py-3 block text-center rounded-2xl mx-16"
      >
        Chat with MenoLearn
      </Link>
    </div>
  )
}

export default NewChatBtn
