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

export async function getChatsByUserId(
  userId: string
) {
  const chats = await prismadb.chat.findMany({
    where: {
      userId,
    },
  })

  return chats
}

export async function getChatWithMsgsByChatId(
  chatId: string
) {
  const chat = await prismadb.chat.findUnique({
    where: {
      id: chatId,
    },
    include: {
      messages: true,
    },
  })

  return chat
}

export async function getNewChatStatus(
  chatId: string
) {
  const newChat = await prismadb.chat.findUnique({
    where: {
      id: chatId,
    },
    select: {
      newChat: true,
    },
  })

  if (!newChat) {
    throw new Error("invalid chat status")
  }

  return newChat.newChat
}
