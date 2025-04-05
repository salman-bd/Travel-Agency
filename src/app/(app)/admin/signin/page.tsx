"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Facebook, X, Eye, EyeOff } from "lucide-react"
import { loginSchema, type LoginFormValues } from "@/schemas/auth"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Image from "next/image"

function AdminSignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const redirect = searchParams.get("redirect") || "/admin"

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })


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
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
        <div className="mx-auto w-full max-w-md space-y-6 text-center">
          <p>Loading...</p>
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

          <div className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link 
              href={`/admin/register?redirect=${encodeURIComponent(redirect)}`} 
              className="font-medium text-[#1e3a8a] hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


export default function SignInPage() {  
  return (  
    <Suspense fallback={<div>Loading...</div>}>  
      <AdminSignInContent />  
    </Suspense>  
  )  
} 

