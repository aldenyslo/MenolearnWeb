"use client"

import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { RegisterSchema } from "@/lib/schemas"
import { registerAction } from "@/server/actions"
import { AuthOther } from "@/components/auth/AuthOther"
import { redirect } from "next/navigation"
import ErrorMessage from "../ErrorMessage"

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()
  const [overallError, setOverallError] = useState<
    string | undefined
  >("")

  const {
    handleSubmit,
    register,
    formState: { isValid, isDirty, errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (
    values: z.infer<typeof RegisterSchema>
  ) => {
    startTransition(async () => {
      await registerAction(values).then((res) => {
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
              {...register("name", {
                required: "Please enter your name",
              })}
              placeholder="Name"
              disabled={isPending}
              type="text"
              className="rounded-3xl p-2.5 border border-blue-100"
            />
            <ErrorMessage
              message={errors.name?.message}
            />
          </div>

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

          <input
            {...register("passwordConf", {
              required: "Please confirm your password",
            })}
            placeholder="Confirm password"
            disabled={isPending}
            type="password"
            className="rounded-3xl p-2.5 border border-blue-100"
          />
          <ErrorMessage message={overallError} />
        </div>
        <button
          type="submit"
          className={`rounded-3xl text-white py-2.5 ${
            isValid ? "bg-purple-400" : "bg-purple-200"
          }`}
          disabled={!isValid || isPending}
        >
          Continue
        </button>
      </form>

      <AuthOther
        href="/auth/signin"
        label="Already have an account? Sign in"
      />
    </div>
  )
}
