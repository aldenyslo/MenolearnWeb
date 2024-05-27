import { auth } from "@/auth"
import ChatInput from "@/components/ChatInput"
import ChatLayout from "@/components/ChatLayout"
import { getUserIdByChatId } from "@/server/queries"
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

  return (
    <main className="h-screen flex flex-col p-9 py-8 gap-5">
      <h1 className="text-lg font-semibold text-center">
        MenoLearn
      </h1>
      <ChatLayout chatId={chatId} />
      <ChatInput />
    </main>
  )
}

export default Chat
