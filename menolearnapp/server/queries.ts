"use server"

import prismadb from "@/lib/prismadb"

export async function getChatMessages(chatId: string) {
  console.log("get chat msgs")
  const messages = await prismadb.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      date: "asc",
    },
  })
  //   console.log(messages)
  return messages
}

export async function getUserByEmail(email: string) {
  const user = await prismadb.user.findUnique({
    where: {
      email,
    },
  })

  return user
}

export async function getUserIdByChatId(
  chatId: string
) {
  const userId = await prismadb.chat.findUnique({
    where: {
      id: chatId,
    },
    select: {
      userId: true,
    },
  })
  return userId
}
