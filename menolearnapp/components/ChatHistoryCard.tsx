import { ChatHistoryItem } from "@/interfaces"

const ChatHistoryCard = ({
  id,
  date,
  title,
}: ChatHistoryItem) => {
  return (
    <div className="flex justify-between border border-black overflow-auto">
      <div className="grid gap-3 p-2">
        <p className="text-xs">{date}</p>
        <p className="font-volkhov text-lg">{title}</p>
        <a className="text-primary-400" href="/">
          View Chat
        </a>
      </div>
      <button className="text-primary-400 border-black border-l p-4 w-[33%]">
        Download Summary
      </button>
    </div>
  )
}

export default ChatHistoryCard
