import { Chat } from "@prisma/client"
import Link from "next/link"

const ChatHistoryCard = ({
  id,
  date,
  title,
}: Chat) => {
  return (
    <div className="flex justify-between border border-black ">
      <div className="grid gap-3 p-2">
        <p className="text-xs">
          {date.toDateString()}
        </p>
        <p className="text-lg">{title}</p>
        <Link
          className="text-primary-400"
          href={`/chats/${id}`}
        >
          View Chat
        </Link>
      </div>
    </div>
  )
}

export default ChatHistoryCard
