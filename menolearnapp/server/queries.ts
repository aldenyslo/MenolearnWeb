"use server"

import prisma from "@/lib/prismadb"

export async function getChatMessages(chatId: string) {
  const messages = await prisma.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      date: "asc",
    },
  })
  return messages
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return user
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  return user
}

export async function getUserIdByChatId(
  chatId: string
) {
  const userId = await prisma.chat.findUnique({
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
  const chats = await prisma.chat.findMany({
    where: {
      userId,
    },
  })

  return chats
}

export async function getChatWithMsgsByChatId(
  chatId: string
) {
  const chat = await prisma.chat.findUnique({
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
  const newChat = await prisma.chat.findUnique({
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
