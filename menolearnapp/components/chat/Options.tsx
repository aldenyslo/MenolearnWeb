"use client"
import {
  chatComplete,
  chatInput,
  completeChatInteraction,
} from "@/server/actions"
import { revalidateTag } from "next/cache"
import { useParams } from "next/navigation"

export const Options = () => {
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
          action={() =>
            completeChatInteraction({
              message: val,
              chatId: params.chatId as string,
            })
          }
        >
          <button
            type="submit"
            className="w-full text-left font-light text-sm bg-blue-250 hover:bg-blue-500 p-2 px-3 rounded-md"
          >
            {val}
          </button>
        </form>
      ))}
    </div>
  )
}
