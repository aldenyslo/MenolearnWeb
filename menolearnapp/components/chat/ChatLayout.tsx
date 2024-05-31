"use client"
import BotDialogue from "@/components/chat/BotDialogue"
import UserDialogue from "@/components/chat/UserDialogue"
import { Options } from "@/components/chat/Options"
import Image from "next/image"
import { Chat, Message, Source } from "@prisma/client"
import { useEffect, useRef } from "react"
import { setChatTitle } from "@/server/actions"

const ChatLayout = ({
  messages,
  newChat,
}: {
  messages: Message[]
  newChat: boolean
}) => {
  const chatBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [messages])

  return (
    <div className="flex flex-col gap-5 flex-1 overflow-y-auto">
      {messages.length != 0 ? (
        messages.map((val, idx) =>
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
        )
      ) : (
        <>
          <Image
            src="/MenoLearnLogo.svg"
            width="66"
            height="66"
            alt="menolearn logo"
            className="mx-auto"
          />
          <Options newChat={newChat} />
        </>
      )}
      <div ref={chatBottomRef}></div>
    </div>
  )
}

export default ChatLayout
