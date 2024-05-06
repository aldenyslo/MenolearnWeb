import { z } from "zod"

export const chatInputSchema = z.object({
  input: z.string().max(1000),
})

export type chatInputType = z.infer<
  typeof chatInputSchema
>

export const messageSourcedSchema = z.object({
  message: z.string().max(1000),
  source: z.enum(["USER", "BOT"]),
})
