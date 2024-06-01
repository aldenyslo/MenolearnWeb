"use client"

import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { LoginSchema } from "@/lib/schemas"
import { login } from "@/server/actions"
import { AuthOther } from "@/components/auth/AuthOther"
import ErrorMessage from "../ErrorMessage"

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [overallError, setOverallError] = useState<
    string | undefined
  >("")

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
    startTransition(async () => {
      await login(values).then((res) => {
        setOverallError(res.error)
      })
    })
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-9 mb-3"
      >
        <div className="grid gap-2">
          <div className="grid">
            <input
              {...register("email", {
                required: "Please enter your email",
              })}
              placeholder="Email"
              disabled={isPending}
              type="email"
              className="rounded-3xl p-2.5 border border-blue-100"
            />
            <ErrorMessage
              message={errors.email?.message}
            />
          </div>

          <div className="grid">
            <input
              {...register("password", {
                required: "Please enter your password",
              })}
              placeholder="Password"
              disabled={isPending}
              type="password"
              className="rounded-3xl p-2.5 border border-blue-100"
            />
            <ErrorMessage
              message={errors.password?.message}
            />
          </div>

          <ErrorMessage message={overallError} />
        </div>
        <button
          type="submit"
          className={
            "rounded-3xl text-white py-2.5 bg-purple-200 hover:bg-purple-400"
          }
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
