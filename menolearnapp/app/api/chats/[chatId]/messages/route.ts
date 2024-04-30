import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

const getBotResponse = async (input: String) => {
  const apiKey = process.env.OPENAI_APIKEY
  const generalModelId = process.env.MODEL_ID

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: generalModelId,
          messages: [{ role: "user", content: input }],
        }),
      }
    )

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      )
    }

    const responseData = await response.json()
    return responseData.choices[0].message["content"]
  } catch (error) {
    console.error(
      "Error sending message to OpenAI:",
      error
    )
  }
}

export async function POST(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  const body = await req.json()

  const { source, message } = body

  try {
    let msg
    if (source === "USER") {
      msg = await prismadb.message.create({
        data: {
          source,
          message,
          chatId: params.chatId,
        },
      })
    } else {
      msg = await prismadb.message.create({
        data: {
          source,
          message: await getBotResponse(message),
          chatId: params.chatId,
        },
      })
    }

    return NextResponse.json(msg)
  } catch (err) {
    console.log("[CHATS_POST]", err)
    return new NextResponse("Internal error", {
      status: 500,
    })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const messages = await prismadb.message.findMany({
      where: {
        chatId: params.chatId,
      },
      select: {
        id: true,
        message: true,
        source: true,
      },
      orderBy: {
        date: "asc",
      },
    })

    return NextResponse.json(messages)
  } catch (err) {
    console.log("[CHATS_GET]", err)
    return new NextResponse("Internal error", {
      status: 500,
    })
  }
}
