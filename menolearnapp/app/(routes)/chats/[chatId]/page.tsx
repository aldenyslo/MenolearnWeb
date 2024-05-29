import { auth } from "@/auth"
import ChatInput from "@/components/chat/ChatInput"
import ChatLayout from "@/components/chat/ChatLayout"
import { ChatNav } from "@/components/chat/ChatNav"
import {
  getChatMessages,
  getUserIdByChatId,
} from "@/server/queries"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

const Chat = async ({
  params: { chatId },
}: {
  params: { chatId: string }
}) => {
  const session = await auth()
  const chatOwnerId = await getUserIdByChatId(chatId)
  if (
    !session ||
    !session.user ||
    chatOwnerId?.userId != session.user.id
  ) {
    redirect("/auth/signin")
  }

  const messages = await getChatMessages(chatId)

  return (
    <main className="h-screen flex flex-col p-9 py-8 gap-5">
      <div>
        <ChatNav />
        <h1 className="text-lg font-semibold text-center">
          MenoLearn
        </h1>
      </div>
      <ChatLayout messages={messages} />
      <ChatInput />
    </main>
  )
}

export default Chat
