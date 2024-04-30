import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const { userId } = body
  try {
    const chat = await prismadb.chat.create({
      data: {
        userId,
      },
    })

    return NextResponse.json(chat)
  } catch (err) {
    console.log("[CHATS_POST]", err)
    return new NextResponse("Internal error", {
      status: 500,
    })
  }
}
