"use client"
import { createNewChat } from "@/server/actions"
import { Chat } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { Session, User } from "next-auth"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"

const NewChatBtn = ({ user }: { user: User }) => {
  const router = useRouter()

  const chatMutation = useMutation({
    mutationFn: async () => {
      return fetch(`/api/chats`, {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
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
