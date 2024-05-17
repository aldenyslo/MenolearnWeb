import NewChatBtn from "@/components/NewChatBtn"
import ChatHistoryList from "../components/ChatHistoryList"
import { ChatHistoryItem } from "@/interfaces"

export default function Home() {
  const chatHistoryMock: ChatHistoryItem[] = [
    {
      id: 1,
      date: "2024-04-17",
      title: "Hot Flashes",
    },
    {
      id: 2,
      date: "2024-04-16",
      title: "Night Sweats",
    },
    {
      id: 3,
      date: "2024-04-15",
      title: "Trouble Sleeping",
    },
    {
      id: 3,
      date: "2024-04-15",
      title: "Trouble Sleeping",
    },
  ]

  return (
    <main className="font-inter overflow-auto w-[390px] h-[670px] border border-t-0 bg-secondary-200">
      <section className="bg-primary-500 text-white grid items-center px-5 pb-6 pt-12 gap-4">
        <div className="grid gap-3.5">
          <h1 className="font-volkhov font-bold text-2xl">
            We know menopause is confusing.
          </h1>
          <p className="">
            MenoLearn is a menopause chatbot dashboard
            that aims to help educate individuals with
            their unique menopausal experience.
          </p>
        </div>
        <NewChatBtn />
      </section>
      <section className="p-5 grid gap-6">
        <h2 className="font-volkhov text-2xl text-secondary-600">
          Chat History
        </h2>
        <ChatHistoryList
          chatHistory={chatHistoryMock}
        />
      </section>
    </main>
  )
}
