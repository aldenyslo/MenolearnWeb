"use client"

import * as z from "zod"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { Source } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { chatInputSchema } from "@/lib/schemas"
import {
  chatComplete,
  chatInput,
} from "@/server/actions"

const ChatInput = () => {
  const params = useParams()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<z.infer<typeof chatInputSchema>>({
    resolver: zodResolver(chatInputSchema),
    defaultValues: { input: "" },
  })

  if (typeof params.chatId != "string") {
    throw new Error("invalid chat id")
  }

  const chatId = params.chatId

  const onSubmit = async (
    data: z.infer<typeof chatInputSchema>
  ) => {
    console.log(data)

    await chatInput({
      message: data.input,
      chatId,
    })

    reset()

    await chatComplete({
      message: data.input,
      chatId,
    })
  }

  return (
    <div className="flex items-center gap-3 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-3 grow"
      >
        <input
          {...register("input")}
          type="text"
          className="grow border border-blue-100 bg-white px-4 py-3 rounded-2xl"
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="border border-blue-100 rounded-full"
        >
          {isDirty ? (
            <Image
              src="/sendEnabled.svg"
              width="28"
              height="28"
              alt="send enabled"
            />
          ) : (
            <Image
              src="/sendDisabled.svg"
              width="28"
              height="28"
              alt="send disabled"
            />
          )}
        </button>
      </form>
    </div>
  )
}

export default ChatInput
