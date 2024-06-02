import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY,
  organization: "org-Ckr1jkijnZKzlFcpsWfNYibg",
})

export async function completeChat() {
  const completion =
    await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
      ],
      model: process.env.MODEL_ID as string,
    })
  console.log(completion)
}
