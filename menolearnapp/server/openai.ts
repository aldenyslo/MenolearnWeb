"use server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG,
})

export async function completeChat(userInput: string) {
  const completion =
    await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userInput,
        },
      ],
      model: process.env.MODEL_ID as string,
    })

  return completion.choices[0].message.content
}
