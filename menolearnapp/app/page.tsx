import NewChatBtn from "@/components/NewChatBtn"
import ChatHistoryList from "../components/ChatHistoryList"
import { auth, signIn, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { getChatsByUserId } from "@/server/queries"

export default async function Home() {
  const session = await auth()

  console.log({ session })
  if (!session || !session.user || !session.user.id) {
    redirect("/auth/signin")
  }

  const chatHistory = await getChatsByUserId(
    session.user.id
  )

  return (
    <main className="bg-gradient-to-b min-h-screen border border-red-600">
      <header>
        <form
          action={async () => {
            "use server"

            await signOut()
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </header>
      <section className="bg-blue-600 text-white grid items-center px-5 pb-6 pt-12 gap-4">
        <div className="grid gap-3.5">
          <h1 className="font-bold text-2xl">
            We know menopause is confusing.
          </h1>
          <p className="">
            MenoLearn is a menopause chatbot dashboard
            that aims to help educate individuals with
            their unique menopausal experience.
          </p>
        </div>
        <NewChatBtn user={session.user} />
      </section>
      <section className="p-5 grid gap-6 overflow-y-auto">
        <h2 className=" text-2xl text-secondary-600">
          Chat History
        </h2>
        <ChatHistoryList chatHistory={chatHistory} />
      </section>
    </main>
  )
}
