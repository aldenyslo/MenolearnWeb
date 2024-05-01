"use client"
import ChatInput from "./ChatInput"
import BotDialogue from "./BotDialogue"
import UserDialogue from "./UserDialogue"
import useChatStore from "@/hooks/use-chat"
import { Source } from "@prisma/client"
import { useContext, useState } from "react"
import { MessagesContext } from "@/context/messages"

const ChatLayout = () => {
  const { messages } = useContext(MessagesContext)

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
