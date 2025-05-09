"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Facebook, X, Eye, EyeOff, Twitter } from 'lucide-react'
import { loginSchema, type LoginFormValues } from "@/schemas/auth"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { status } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const redirect = searchParams.get("redirect") || "/"
  const error_type = searchParams.get("error")

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  useEffect(() => {
    if (status === "authenticated") {
      router.push(redirect)
    }

    // Set error message based on error type
    if (error_type === "EMAIL_NOT_VERIFIED") {
      setError("Please verify your email before signing in.")
      form.setValue("email", searchParams.get("email") || "")
    }
  }, [status, router, redirect, error_type, searchParams, form])

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        remember: data.remember,
        redirect: false,
      })

      if (result?.error === "EMAIL_NOT_VERIFIED") {
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`)
        return
      }

      if (result?.error) {
        setError("Invalid email or password")
        setIsLoading(false)
        return
      }

      router.push(redirect)
      router.refresh()
    } catch (error) {
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#1e3a8a] to-[#0f172a]">
        <div className="container mx-auto flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1e3a8a] border-t-transparent"></div>
            </div>
            <p className="mt-4 text-center text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#1e3a8a] to-[#0f172a]">
      <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 flex justify-center">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src="/logo/traveller-world.png?height=40&width=40" alt="Treveller World Logo" width={40} height={40} />
                </div>
                <span className="text-xl font-bold text-[#1e3a8a]">TRAVELLER WORLD</span>
              </div>
            </Link>
          </div>

          <div className="mb-6 space-y-2 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="name@example.com" 
                        type="email" 
                        className="border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a]" 
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
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <Link href="/forgot-password" className="text-sm text-[#1e3a8a] hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          className="border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a]" 
                          {...field} 
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        className="border-gray-300 data-[state=checked]:bg-[#1e3a8a] data-[state=checked]:border-[#1e3a8a]" 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-gray-700">Remember me</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-black/90 text-white" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <span className="relative bg-white px-2 text-sm text-gray-500">Or continue with</span>
          </div>

          <div className="flex flex-row items-center justify-center gap-3">
            <Button 
              variant="outline" 
              className="w-full border-gray-300 hover:bg-gray-50" 
              onClick={() => signIn("google", { callbackUrl: redirect })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            {/* <Button 
              variant="outline" 
              className="w-full border-gray-300 hover:bg-gray-50" 
              onClick={() => signIn("facebook", { callbackUrl: redirect })}
            >
              <Facebook className="mr-2 h-4 w-4 text-blue-600" />
              Facebook
            </Button> */}
            <Button 
              variant="outline" 
              className="w-full border-gray-300 hover:bg-gray-50" 
              onClick={() => signIn("twitter", { callbackUrl: redirect })}
            >
              <Twitter className="mr-2 h-4 w-4 text-black" />Twitter
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link 
              href={`/signup?redirect=${encodeURIComponent(redirect)}`} 
              className="font-medium text-[#1e3a8a] hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
