"use server"

import * as z from "zod"
import { signIn } from "@/auth"

import {
  LoginSchema,
  RegisterSchema,
  //   chatCompletionSchema,
  messageSchema,
} from "@/lib/schemas"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/server/queries"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"
import {
  revalidatePath,
  revalidateTag,
} from "next/cache"
import { completeChat } from "./openai"
import { Role } from "@prisma/client"

export const login = async (
  values: z.infer<typeof LoginSchema>
) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    })
    return { success: "Successful sign in" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" }
        default:
          return { error: "Someting went wrong" }
      }
    }

    throw error
  }
}

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validatedFields =
    RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, name, passwordConf } =
    validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already in use" }
  }

  if (password != passwordConf) {
    return { error: "Passwords do not match" }
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  )

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  try {
    await signIn("credentials", {
      email: user.email,
      password,
      redirectTo: "/",
    })
    return { success: "Successful registration" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" }
        default:
          return { error: "Someting went wrong" }
      }
    }

    throw error
  }
}

const getBotResponse = async (
  messages: { content: string; role: Role }[]
) => {
  try {
    const response = await completeChat(messages)

    if (!response) {
      throw new Error(
        "Failed to get response from OpenAI"
      )
    }
    return response
  } catch (error) {
    console.error(
      "Error sending message to OpenAI:",
      error
    )
    throw new Error(
      "Failed to get a response from OpenAI"
    )
  }
}

export const chatInput = async (
  values: z.infer<typeof messageSchema>
) => {
  const result = messageSchema.safeParse(values)

  if (!result.success) {
    throw new Error("Invalid input")
  }

  const { content, chatId } = result.data

  try {
    await prisma.message.create({
      data: {
        role: "user",
        content,
        chatId,
      },
    })

    revalidateTag("chat")
  } catch (err) {
    console.log("[MESSAGES_POST]", err)
    throw new Error("Internal error")
  }
}

export const chatComplete = async (
  values: z.infer<typeof messageSchema>,
  messages: { content: string; role: Role }[]
) => {
  const result = messageSchema.safeParse(values)

  if (!result.success) {
    throw new Error("Invalid input")
  }

  const { content, chatId } = result.data

  messages.push({ content, role: "user" })

  try {
    await prisma.message.create({
      data: {
        role: "assistant",
        content: await getBotResponse(messages),
        chatId,
      },
    })
    revalidateTag("chat")
  } catch (err) {
    console.log("[MESSAGES_POST]", err)
    throw new Error("Internal error")
  }
}

// export const completeChatInteraction = async (
//   values: z.infer<typeof messageSchema>
// ) => {
//   await chatInput(values)
//   await chatComplete(values)
// }

export const createNewChat = async (
  userId: string
) => {
  try {
    const chat = await prisma.chat.create({
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

export const setChatTitle = async ({
  chatId,
  title,
}: {
  chatId: string
  title: string
}) => {
  try {
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        title,
        newChat: false,
      },
    })
  } catch (err) {
    console.log("[CHATS_POST]", err)
    return new NextResponse("Internal error", {
      status: 500,
    })
  }
}
