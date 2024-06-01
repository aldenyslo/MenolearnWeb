import { z } from "zod"

export const chatInputSchema = z.object({
  input: z.string().min(1).max(1000),
})

export const messageSchema = z.object({
  message: z.string().min(1).max(1000),
  chatId: z.string(),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(1, { message: "Password is required" }),
})

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConf: z.string().min(8),
})

// export const chatCompletionSchema = z.object({
//   id: z.string(),
//   object: z.string(),
//   created: z.number(),
//   model: z.string(),
//   system_fingerprint: z.string(),
//   choices: z.array(
//     z.object({
//       index: z.number(),
//       message: z.object({
//         role: z.enum(["assistant", "user", "system"]),
//         content: z.string(),
//       }),
//       logprobs: z.null(),
//       finish_reason: z.string(),
//     })
//   ),
//   usage: z.object({
//     prompt_tokens: z.number(),
//     completion_tokens: z.number(),
//     total_tokens: z.number(),
//   }),
// })
