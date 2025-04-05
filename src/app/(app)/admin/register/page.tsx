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