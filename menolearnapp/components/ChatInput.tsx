"use client"

import Image from "next/image"
import {
  useForm,
  SubmitHandler,
} from "react-hook-form"
import { useState } from "react"

interface ChatInputMsg {
  message: string
}

const ChatInput = () => {
  const [typed, setTyped] = useState(false)

  const { register, handleSubmit, reset } =
    useForm<ChatInputMsg>()

  const onSubmit: SubmitHandler<ChatInputMsg> = (
    data
  ) => {
    reset()
    console.log(data)
    setTyped(false) // to update with API / database
  }

  return (
    <div className="p-5 flex items-center gap-3 w-[100%] absolute bottom-0">
      <button>
        <Image
          src="fileIcon.svg"
          width="20"
          height="20"
          alt="file"
        />
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-3 grow"
      >
        <input
          {...register("message", {
            onChange: (e) => {
              e.target.value === ""
                ? setTyped(false)
                : setTyped(true)
            },
          })}
          type="text"
          className="grow bg-secondary-400 px-4 py-3 rounded-2xl"
          placeholder="Message"
        />
        <button type="submit">
          {typed ? (
            <Image
              src="sendEnabled.svg"
              width="26"
              height="26"
              alt="send"
            />
          ) : (
            <Image
              src="sendDisabled.svg"
              width="26"
              height="26"
              alt="send"
            />
          )}
        </button>
      </form>
    </div>
  )
}

export default ChatInput
