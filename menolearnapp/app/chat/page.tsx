import BotDialogue from "@/components/BotDialogue"
import ChatInput from "@/components/ChatInput"
import UserDialogue from "@/components/UserDialogue"

const Chat = () => {
  return (
    <main className="bg-secondary-200 relative font-inter overflow-auto w-[390px] h-[812px] border border-t-0">
      <div className="grid gap-5 px-8 pt-7">
        <BotDialogue response="Would you like to take a quiz to see if you are in perimenopause period?" />
        <UserDialogue userInput="Would you like to take a quiz to see if you are in perimenopause period?" />
      </div>
      <ChatInput />
    </main>
  )
}

export default Chat
