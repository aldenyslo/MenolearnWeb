import Image from "next/image"

interface BotDialogueInterface {
  response: string
}

const BotDialogue = ({
  response,
}: BotDialogueInterface) => {
  return (
    <div className="flex items-start gap-2.5">
      <Image
        src="MenoLearnLogo.svg"
        width="24"
        height="24"
        alt="MenoLearn"
      />
      <div>
        <p className="text-primary-500 font-bold">
          MenoLearn
        </p>
        <p className="">{response}</p>
      </div>
    </div>
  )
}

export default BotDialogue
