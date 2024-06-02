"use client"

import * as z from "zod"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { chatInputSchema } from "@/lib/schemas"
import {
  chatComplete,
  chatInput,
  //   setChatStatus,
  setChatTitle,
} from "@/server/actions"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ChatInput = ({
  newChat,
}: {
  newChat: boolean
}) => {
  const params = useParams()

  const form = useForm<
    z.infer<typeof chatInputSchema>
  >({
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

    form.reset()

    await chatComplete({
      message: data.input,
      chatId,
    })
    console.log(newChat)

    if (newChat) {
      await setChatTitle({ chatId, title: data.input })
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-3"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl className="">
                  <Input
                    placeholder="Ask me about menopause"
                    type="text"
                    {...field}
                    className="rounded-xl "
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            variant="outline"
            size="icon"
            className="border-0 bg-transparent hover:bg-transparent"
          >
            {form.formState.isDirty ? (
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
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ChatInput
