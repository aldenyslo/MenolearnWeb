import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { LoginSchema } from "@/lib/schemas"
import prisma from "./lib/prismadb"
import {
  getUserByEmail,
  getUserById,
} from "@/server/queries"
import type { Provider } from "next-auth/providers"

const providers: Provider[] = [
  Credentials({
    authorize: async (credentials) => {
      const validatedFields =
        LoginSchema.safeParse(credentials)

      if (validatedFields.success) {
        const { email, password } =
          validatedFields.data
        const user = await getUserByEmail(email)

        if (!user || !user.password) return null

        const passwordsMatch = await bcrypt.compare(
          password,
          user.password
        )

        if (passwordsMatch) return user
      }

      return null
    },
  }),
]

export const providerMap = providers.map(
  (provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return {
        id: providerData.id,
        name: providerData.name,
      }
    } else {
      return { id: provider.id, name: provider.name }
    }
  }
)

export const { handlers, signIn, signOut, auth } =
  NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers,
    pages: {
      signIn: "/auth/signin",
      signOut: "/auth/signin",
    },
    callbacks: {
      session: ({ session, token }) => ({
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      }),
    },
  })
