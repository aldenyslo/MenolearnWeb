import Image from "next/image"

interface UserDialogueInterface {
  userInput: string
}

const BotDialogue = ({
  userInput,
}: UserDialogueInterface) => {
  return (
    <div className="">
      <div className=" flex justify-end gap-2.5 p-2.5">
        <p className="text-right">{userInput}</p>

        <Image
          src="/profile.svg"
          width="30"
          height="30"
          alt="MenoLearn"
        />
      </div>
    </div>
  )
}

export default BotDialogue
