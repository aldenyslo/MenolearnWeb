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
        src="/MenoLearnLogo.svg"
        width="28"
        height="28"
        alt="MenoLearn"
      />

      <p className="">{response}</p>
    </div>
  )
}

export default BotDialogue
