"use client"

import Image from "next/image"
import {
  useForm,
  SubmitHandler,
} from "react-hook-form"
import { useContext, useState } from "react"
import { useParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { MessagesContext } from "@/context/messages"
import { Message, Source } from "@prisma/client"

interface ChatInputMsg {
  message: string
}

interface Msg {
  id: string
  message: string
  source: Source
}

const ChatInput = () => {
  const [typed, setTyped] = useState(false)
  const { messages, addMessage, removeMessage } =
    useContext(MessagesContext)
  const params = useParams()

  const { register, handleSubmit, reset } =
    useForm<ChatInputMsg>()

  const onSubmit: SubmitHandler<ChatInputMsg> = async (
    data
  ) => {
    try {
      const res = await fetch(
        `/api/chats/${params.chatId}/messages`,
        {
          method: "POST",
          body: JSON.stringify({
            source: "USER",
            message: data.message,
          }),
        }
      ).then((res) => res.json())
      addMessage({
        id: res.id,
        message: res.message,
        source: res.source,
      })
    } catch (err) {
      console.error("cannot post user msg")
    }

    reset()
    setTyped(false)

    try {
      const res = await fetch(
        `/api/chats/${params.chatId}/messages`,
        {
          method: "POST",
          body: JSON.stringify({
            source: "BOT",
            message: data.message,
          }),
        }
      ).then((res) => res.json())
      addMessage({
        id: res.id,
        message: res.message,
        source: res.source,
      })
    } catch (err) {
      console.error("cannot post bot msg")
    }
  }

  return (
    <div className="p-5 flex items-center border bg-secondary-200 gap-3 w-full">
      <button>
        <Image
          src="/fileIcon.svg"
          width="20"
          height="20"
          alt="file"
        />
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-3 grow"
      >
        <input
          {...register("message", {
            onChange: (e) => {
              e.target.value === ""
                ? setTyped(false)
                : setTyped(true)
            },
          })}
          type="text"
          className="grow bg-secondary-400 px-4 py-3 rounded-2xl"
          placeholder="Message"
        />
        <button type="submit">
          {typed ? (
            <Image
              src="/sendEnabled.svg"
              width="26"
              height="26"
              alt="send"
            />
          ) : (
            <Image
              src="/sendDisabled.svg"
              width="26"
              height="26"
              alt="send"
            />
          )}
        </button>
      </form>
    </div>
  )
}

export default ChatInput
