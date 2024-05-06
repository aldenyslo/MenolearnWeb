import ChatInput from "@/components/ChatInput"
import ChatLayout from "@/components/ChatLayout"

export const dynamic = "force-dynamic"

const Chat = ({
  params: { chatId },
}: {
  params: { chatId: string }
}) => {
  return (
    <main className="bg-secondary-200 relative font-inter flex flex-col w-[390px] h-[812px] border border-t-0">
      <ChatLayout chatId={chatId} />
      <ChatInput />
    </main>
  )
}

export default Chat
