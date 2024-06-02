"use client"

import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { LoginSchema } from "@/lib/schemas"
import { login } from "@/server/actions"
import { AuthOther } from "@/components/auth/AuthOther"
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

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [overallError, setOverallError] = useState<
    string | undefined
  >("")

  const form = useForm<z.infer<typeof LoginSchema>>({
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
          {overallError ? (
            <ErrorMessage message={overallError} />
          ) : null}
          <Button
            type="submit"
            className="bg-purple-200 hover:bg-purple-400"
          >
            Sign in
          </Button>
        </form>
      </Form>

      <AuthOther
        href="/auth/register"
        label="New here? Create an Account"
      />
    </div>
  )
}
