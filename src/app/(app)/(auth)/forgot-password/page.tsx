"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validations/auth"
import { forgotPassword } from "@/lib/actions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append("email", data.email)

      const result = await forgotPassword(formData)

      if (result && "error" in result) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      setSuccess("If an account exists with this email, you will receive a password reset link shortly.")
      form.reset()
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <Link href="/signin" className="text-primary hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

