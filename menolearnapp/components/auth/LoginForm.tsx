"use client"

import * as z from "zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { LoginSchema } from "@/lib/schemas"
import { login } from "@/server/actions"
import { AuthOther } from "./AuthOther"

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const {
    handleSubmit,
    register,
    formState: { isValid, isDirty, errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (
    values: z.infer<typeof LoginSchema>
  ) => {
    startTransition(() => {
      login(values)
    })
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-9 mb-3"
      >
        <div className="grid gap-2">
          <input
            {...register("email", {
              required: "Please enter your email",
            })}
            placeholder="Email"
            disabled={isPending}
            type="email"
            className="rounded-3xl p-2.5 border border-blue-100"
          />

          <input
            {...register("password", {
              required: "Please enter your password",
            })}
            placeholder="Password"
            disabled={isPending}
            type="password"
            className="rounded-3xl p-2.5 border border-blue-100"
          />
        </div>
        <button
          type="submit"
          className={`rounded-3xl text-white py-2.5 ${
            isValid ? "bg-purple-400" : "bg-purple-200"
          }`}
          disabled={!isValid || isPending}
        >
          Log in
        </button>
      </form>

      <AuthOther
        href="/auth/register"
        label="New here? Create an Account"
      />
    </div>
  )
}
