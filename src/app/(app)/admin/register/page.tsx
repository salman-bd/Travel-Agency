"use client"  

import { useState, useEffect, Suspense } from "react"  
import Link from "next/link"  
import { signIn, useSession } from "next-auth/react"  
import { useRouter, useSearchParams } from "next/navigation"  
import { useForm } from "react-hook-form"  
import { zodResolver } from "@hookform/resolvers/zod"  
import { Button } from "@/components/ui/button"  
import { Input } from "@/components/ui/input"  
import { Alert, AlertDescription } from "@/components/ui/alert"  
import { Facebook, X, Eye, EyeOff } from "lucide-react"  
import { registerSchema, type RegisterFormValues } from "@/schemas/auth"  
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"  
import { registerUser } from "@/lib/actions"  
import Image from "next/image"  

function SignUpContent() {  
  const router = useRouter()  
  const searchParams = useSearchParams()  
  const { status } = useSession()  
  const [error, setError] = useState<string | null>(null)  
  const [isLoading, setIsLoading] = useState(false)  
  const [showPassword, setShowPassword] = useState(false)  
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)  

  const redirect = searchParams.get("redirect") || "/"  

  const form = useForm<RegisterFormValues>({  
    resolver: zodResolver(registerSchema),  
    defaultValues: {  
      name: "",  
      email: "",  
      password: "",  
      confirmPassword: "",  
    },  
  })  

  useEffect(() => {  
    if (status === "authenticated") {  
      router.push(redirect)  
    }  
  }, [status, router, redirect])  

  const onSubmit = async (data: RegisterFormValues) => {  
    setIsLoading(true)  
    setError(null)  

    try {  
      const registrationData = {  
        name: data.name,  
        email: data.email,  
        password: data.password,  
        role: 'ADMIN'  
      }  
      const result = await registerUser(registrationData)  
      if (!result.success) {  
        setError(result?.message || "Something went wrong. Please try again.")  
        router.push('/admin')  
      } else if (result.success) {  
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`)  
      }  
    } catch (error: any) {  
      setError(error.response?.data?.error || "Something went wrong. Please try again.")  
    } finally {  
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
            <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>  
            <p className="text-gray-600">Enter your information to create an account</p>  
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
                name="name"  
                render={({ field }) => (  
                  <FormItem>  
                    <FormLabel className="text-gray-700">Full Name</FormLabel>  
                    <FormControl>  
                      <Input   
                        placeholder="John Doe"   
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
                    <FormLabel className="text-gray-700">Password</FormLabel>  
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
                name="confirmPassword"  
                render={({ field }) => (  
                  <FormItem>  
                    <FormLabel className="text-gray-700">Confirm Password</FormLabel>  
                    <FormControl>  
                      <div className="relative">  
                        <Input   
                          type={showConfirmPassword ? "text" : "password"}   
                          className="border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a]"   
                          {...field}   
                        />  
                        <button  
                          type="button"  
                          className="absolute right-3 top-1/2 -translate-y-1/2"  
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}  
                        >  
                          {showConfirmPassword ? (  
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

              <Button   
                type="submit"   
                className="w-full bg-black hover:bg-black/90 text-white"   
                disabled={isLoading}  
              >  
                {isLoading ? "Creating account..." : "Sign Up"}  
              </Button>  
            </form>  
          </Form>  

          <div className="relative my-6 flex items-center justify-center">  
            <div className="absolute inset-0 flex items-center">  
              <span className="w-full border-t border-gray-300" />  
            </div>  
            <span className="relative bg-white px-2 text-sm text-gray-500">Or continue with</span>  
          </div>  

          <div className="grid grid-cols-3 gap-3">  
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
            <Button   
              variant="outline"   
              className="w-full border-gray-300 hover:bg-gray-50"   
              onClick={() => signIn("facebook", { callbackUrl: redirect })}  
            >  
              <Facebook className="mr-2 h-4 w-4 text-blue-600" />  
              Facebook  
            </Button>  
            <Button   
              variant="outline"   
              className="w-full border-gray-300 hover:bg-gray-50"   
              onClick={() => signIn("twitter", { callbackUrl: redirect })}  
            >  
              <X className="mr-2 h-4 w-4 text-black" />X  
            </Button>  
          </div>  

          <div className="mt-6 text-center text-sm text-gray-600">  
            Already have an account?{" "}  
            <Link   
              href={`/signin?redirect=${encodeURIComponent(redirect)}`}   
              className="font-medium text-[#1e3a8a] hover:underline"  
            >  
              Sign In  
            </Link>  
          </div>  
        </div>  
      </div>  
    </div>  
  )  
}  

export default function SignUpPage() {  
  return (  
    <Suspense fallback={<div>Loading...</div>}>  
      <SignUpContent />  
    </Suspense>  
  )  
}  