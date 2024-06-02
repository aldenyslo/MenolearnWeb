"use client"
import { createNewChat } from "@/server/actions"
import { Chat } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { Session, User } from "next-auth"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { completeChat } from "@/server/openai"

const NewChatBtn = ({ user }: { user: User }) => {
  const router = useRouter()

  const chatMutation = useMutation({
    mutationFn: async () => {
      return fetch(`/api/chats`, {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          newChat: true,
        }),
      }).then((res) => res.json())
    },
    onSuccess: (res: Chat) => {
      router.push(`/chats/${res.id}`)
    },
  })

  return (
    <div className="grid">
      <button onClick={completeChat}>test</button>
      <Button
        onClick={() => chatMutation.mutate()}
        className="font-bold text-pink-400 bg-grey-100 hover:bg-gray-200 rounded-xl mx-16 text-center"
      >
        Chat with MenoLearn
      </Button>
    </div>
  )
}

export default NewChatBtn
