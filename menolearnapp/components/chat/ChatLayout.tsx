"use client"
import BotDialogue from "@/components/chat/BotDialogue"
import UserDialogue from "@/components/chat/UserDialogue"
import { Options } from "@/components/chat/Options"
import Image from "next/image"
import { Message, Role } from "@prisma/client"
import { useEffect, useRef } from "react"

const ChatLayout = ({
  messages,
  newChat,
}: {
  messages: { content: string; role: Role }[]
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
          val.role == "assistant" ? (
            <BotDialogue
              response={val.content}
              key={idx}
            />
          ) : (
            <UserDialogue
              userInput={val.content}
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
