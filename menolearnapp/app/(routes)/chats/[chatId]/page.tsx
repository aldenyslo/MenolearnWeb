import ChatInput from "@/components/ChatInput"
import ChatLayout from "@/components/ChatLayout"

const Chat = async ({
  params,
}: {
  params: { chatId: string }
}) => {
  return (
    <main className="bg-secondary-200 relative font-inter flex flex-col w-[390px] h-[812px] border border-t-0">
      <ChatLayout />
      <ChatInput />
    </main>
  )
}

export default Chat
