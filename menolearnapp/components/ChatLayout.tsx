import BotDialogue from "./BotDialogue"
import UserDialogue from "./UserDialogue"
import { getChatMessages } from "@/server/queries"

const ChatLayout = async (props: {
  chatId: string
}) => {
  const messages = await getChatMessages(props.chatId)

  return (
    <div className="flex flex-col gap-5 px-8 py-7 flex-1 overflow-y-auto">
      {messages.map((val, idx) =>
        val.source == "BOT" ? (
          <BotDialogue
            response={val.message}
            key={idx}
          />
        ) : (
          <UserDialogue
            userInput={val.message}
            key={idx}
          />
        )
      )}
    </div>
  )
}

export default ChatLayout
