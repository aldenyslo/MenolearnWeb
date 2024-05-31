import ChatHistoryCard from "@/components/ChatHistoryCard"
import { Chat } from "@prisma/client"

const ChatHistoryList = ({
  chatHistory,
}: {
  chatHistory: Chat[]
}) => {
  return (
    <ul className="grid gap-6">
      {chatHistory.map((chatItem, index) => (
        <li key={index}>
          <ChatHistoryCard {...chatItem} />
        </li>
      ))}
    </ul>
  )
}

export default ChatHistoryList
