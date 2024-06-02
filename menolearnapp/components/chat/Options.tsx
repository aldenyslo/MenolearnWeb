"use client"
import {
  chatComplete,
  chatInput,
  completeChatInteraction,
  setChatTitle,
} from "@/server/actions"
import { revalidateTag } from "next/cache"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export const Options = ({
  newChat,
}: {
  newChat: boolean
}) => {
  const options = [
    "List activities to help hot flashes",
    "What are the phases of menopause?",
    "Why do night sweats occur?",
    "How can I combat mood swings?",
  ]

  const params = useParams()

  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((val, idx) => (
        <form
          key={idx}
          action={async () => {
            completeChatInteraction({
              message: val,
              chatId: params.chatId as string,
            })
            if (newChat) {
              await setChatTitle({
                chatId: params.chatId as string,
                title: val,
              })
            }
          }}
        >
          <Button
            type="submit"
            className="w-full h-full text-wrap text-left text-blue-800 font-light text-sm bg-blue-250 hover:bg-blue-500 p-2 px-3 rounded-md"
          >
            {val}
          </Button>
        </form>
      ))}
    </div>
  )
}
