"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { Source } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  chatInputSchema,
  chatInputType,
} from "@/lib/schemas"

const ChatInput = () => {
  const params = useParams()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<chatInputType>({
    resolver: zodResolver(chatInputSchema),
    defaultValues: { input: "" },
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

    messageMutation.mutate({
      input: data.input,
      source: "BOT",
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
