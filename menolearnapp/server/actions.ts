"use server"

import * as z from "zod"
import { signIn } from "@/auth"

import {
  LoginSchema,
  RegisterSchema,
} from "@/lib/schemas"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/server/queries"
import bcrypt from "bcryptjs"
import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"

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
    return { error: "Email already in use" }
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  )

  await prismadb.user
    .create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
    .then(redirect("/"))

  return { success: "User created!" }
}
