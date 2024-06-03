import { auth } from "@/auth"
import ChatInput from "@/components/chat/ChatInput"
import ChatLayout from "@/components/chat/ChatLayout"
import { ChatNav } from "@/components/chat/ChatNav"
import {
  getChatMessages,
  getChatWithMsgsByChatId,
  getNewChatStatus,
  getUserIdByChatId,
} from "@/server/queries"
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
    !chatOwnerId ||
    chatOwnerId.userId != session.user.id
  ) {
    redirect("/auth/signin")
  }

  const messages = await getChatMessages(chatId)
  const newChat = await getNewChatStatus(chatId)

  return (
    <main className="h-screen flex flex-col p-9 py-8 gap-5 bg-gradient-to-b">
      <div>
        <ChatNav />
        <h1 className="text-lg font-semibold text-center">
          MenoLearn
        </h1>
      </div>
      <ChatLayout
        messages={messages}
        newChat={newChat}
      />
      <ChatInput
        newChat={newChat}
        messages={messages}
      />
    </main>
  )
}

export default Chat
