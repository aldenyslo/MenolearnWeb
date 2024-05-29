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
import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import {
  revalidatePath,
  revalidateTag,
} from "next/cache"

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

  const { email, password, name } =
    validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    throw new Error("Email already in use")
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  )

  const user = await prismadb.user.create({
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

    // const validatedResponse =
    //   chatCompletionSchema.safeParse(responseData)

    // console.log("here2")

    // if (!validatedResponse.success) {
    //   console.log("here3")
    //   throw new Error("Invalid OpenAI response")
    // }

    return responseData.choices[0].message.content
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
  console.log(values)
  const result = messageSchema.safeParse(values)

  if (!result.success) {
    throw new Error("Invalid input")
  }

  const { message, chatId } = result.data

  try {
    const msg = await prismadb.message.create({
      data: {
        source: "USER",
        message,
        chatId,
      },
    })
    revalidateTag("chat")
  } catch (err) {
    console.log("[MESSAGES_POST]", err)
    return new NextResponse("Internal error", {
      status: 500,
    })
  }
}

export const chatComplete = async (
  values: z.infer<typeof messageSchema>
) => {
  const result = messageSchema.safeParse(values)

  if (!result.success) {
    throw new Error("Invalid input")
  }

  const { message, chatId } = result.data

  try {
    const msg = await prismadb.message.create({
      data: {
        source: "BOT",
        message: await getBotResponse(message),
        chatId,
      },
    })
    revalidateTag("chat")
  } catch (err) {
    console.log("[MESSAGES_POST]", err)
    return new NextResponse("Internal error", {
      status: 500,
    })
  }
}

export const completeChatInteraction = async (
  values: z.infer<typeof messageSchema>
) => {
  console.log("chat interaction")
  await chatInput(values)
  await chatComplete(values)
}

export const createNewChat = async (
  userId: string
) => {
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
