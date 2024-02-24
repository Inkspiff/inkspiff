"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import Button from "@mui/material/Button"
import Input from "@mui/material/Input"
import Box from "@mui/material/Box"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userAuthSchema } from "@/lib/validations/auth"
import GoogleLoginButton from "./GoogleLoginButton"
import GithubLoginButton from "./GithubLoginButton"
import * as z from "zod"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    const searchParams = new URLSearchParams(window.location.search)
    console.log(searchParams)

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/editor",
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      console.error("Sign in failed", signInResult)
    }

  }

  

  return (
    <div {...props}>
        <GithubLoginButton />
        <GoogleLoginButton />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
          </div>
          <Button type='submit' disabled={isLoading}>
            Sign In with Email
          </Button>
        </div>
      </form>
     
    </div>
  )
}
