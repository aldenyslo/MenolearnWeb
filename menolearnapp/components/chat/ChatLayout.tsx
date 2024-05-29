"use client"
import BotDialogue from "@/components/chat/BotDialogue"
import UserDialogue from "@/components/chat/UserDialogue"
import { Options } from "@/components/chat/Options"
import Image from "next/image"
import { Source } from "@prisma/client"
import { useEffect, useRef } from "react"

interface ChatLayoutProps {
  messages: {
    id: string
    date: Date
    source: Source
    message: string
    chatId: string
  }[]
}

const ChatLayout = ({ messages }: ChatLayoutProps) => {
  const chatBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({
        behavior: "smooth",
      })
    }
    console.log("useeffect")
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
          <Options />
        </>
      )}
      <div ref={chatBottomRef}></div>
    </div>
  )
}

export default ChatLayout
