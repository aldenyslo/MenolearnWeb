"use server"

import prismadb from "@/lib/prismadb"

export async function getChatMessages(chatId: string) {
  const messages = await prismadb.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      date: "asc",
    },
  })
  return messages
}
