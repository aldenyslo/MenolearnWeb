import ChatInput from "@/components/ChatInput"
import ChatLayout from "@/components/ChatLayout"

const Chat = async ({
  params,
}: {
  params: { chatId: string }
}) => {
  //   const messages = await getMessages(params.chatId)
  return (
    <main className="bg-secondary-200 relative font-inter flex flex-col w-[390px] h-[812px] border border-t-0  border-red-200">
      <ChatLayout />
      <ChatInput />
    </main>
  )
}

export default Chat
