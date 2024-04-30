import { Message, Source } from "@prisma/client"
import { useParams } from "next/navigation"
import {
  createContext,
  useEffect,
  useState,
} from "react"

interface Msg {
  id: string
  message: string
  source: Source
}

export const MessagesContext = createContext<{
  messages: Msg[]
  addMessage: (message: Msg) => void
  removeMessage: (id: string) => void
}>({
  messages: [],
  addMessage: () => {},
  removeMessage: () => {},
})

export function MessagesProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [messages, setMessages] = useState<Msg[]>([])

  const params = useParams<{ chatId: string }>()

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const initialMessages = await fetch(
          `/api/chats/${params.chatId}/messages`,
          {
            method: "GET",
          }
        ).then((res) => res.json())
        if (initialMessages !== undefined) {
          setMessages(initialMessages)
        } else {
          console.error(
            "Initial messages are undefined"
          )
        }
      } catch (error) {
        console.error(
          "Error fetching initial data:",
          error
        )
      }
    }

    fetchInitialData()
  }, [params.chatId])

  const addMessage = (message: Msg) => {
    setMessages((prev) => [...prev, message])
  }

  const removeMessage = (id: string) => {
    setMessages((prev) =>
      prev.filter((message) => message.id !== id)
    )
  }

  return (
    <MessagesContext.Provider
      value={{
        messages,
        addMessage,
        removeMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  )
}
