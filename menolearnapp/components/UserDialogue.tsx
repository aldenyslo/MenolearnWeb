import Image from "next/image"

interface UserDialogueInterface {
  userInput: string
}

const BotDialogue = ({
  userInput,
}: UserDialogueInterface) => {
  return (
    <div className="">
      <div className="bg-secondary-300 rounded-md flex justify-end gap-2.5 p-2.5">
        <div>
          <p className="text-right text-primary-500 font-bold">
            You
          </p>
          <p className="text-right">{userInput}</p>
        </div>
        <Image
          src="/profile.svg"
          width="24"
          height="24"
          alt="MenoLearn"
        />
      </div>
    </div>
  )
}

export default BotDialogue
