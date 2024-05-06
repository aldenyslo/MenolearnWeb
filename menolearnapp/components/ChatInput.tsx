"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { Source } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  chatInputSchema,
  chatInputType,
} from "@/lib/types"

const ChatInput = () => {
  const [typed, setTyped] = useState(false)

  const params = useParams()
  const router = useRouter()

  const { register, handleSubmit, reset } =
    useForm<chatInputType>({
      resolver: zodResolver(chatInputSchema),
    })

  const messageMutation = useMutation({
    mutationFn: ({
      input,
      source,
    }: {
      input: string
      source: Source
    }) => {
      return fetch(
        `/api/chats/${params.chatId}/messages`,
        {
          method: "POST",
          body: JSON.stringify({
            source,
            message: input,
          }),
        }
      )
    },
    onSuccess: () => {
      router.refresh()
    },
  })

  const onSubmit = async (data: chatInputType) => {
    if (!data.input) {
      return null
    }

    messageMutation.mutate({
      input: data.input,
      source: "USER",
    })

    reset()
    setTyped(false)

    messageMutation.mutate({
      input: data.input,
      source: "BOT",
    })
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
          {...register("input", {
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
