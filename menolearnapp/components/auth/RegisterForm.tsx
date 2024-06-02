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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()
  const [overallError, setOverallError] = useState<
    string | undefined
  >("")

  const form = useForm<z.infer<typeof RegisterSchema>>(
    {
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    }
  )

  const onSubmit = (
    values: z.infer<typeof RegisterSchema>
  ) => {
    startTransition(async () => {
      await registerAction(values).then((res) => {
        setOverallError(res.error)
      })
    })
    setOverallError("")
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mb-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Confirm password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {overallError ? (
            <ErrorMessage message={overallError} />
          ) : null}
          <Button
            type="submit"
            className="bg-purple-200 hover:bg-purple-400"
          >
            Register
          </Button>
        </form>
      </Form>
      {/* <form
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
          {overallError ? (
            <ErrorMessage message={overallError} />
          ) : null}
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
      </form> */}

      <AuthOther
        href="/auth/signin"
        label="Already have an account? Sign in"
      />
    </div>
  )
}
