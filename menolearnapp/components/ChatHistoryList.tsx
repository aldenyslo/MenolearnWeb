import ChatHistoryCard from "@/components/ChatHistoryCard"
import { ChatHistoryItem } from "@/interfaces"

const ChatHistoryList = ({
  chatHistory,
}: {
  chatHistory: ChatHistoryItem[]
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
