"use server"
import { Message, Role } from "@prisma/client"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG,
})

export async function completeChat(
  messages: { role: Role; content: string }[]
) {
  const completion =
    await openai.chat.completions.create({
      messages: messages,
      model: process.env.MODEL_ID as string,
    })

  return completion.choices[0].message.content
}
