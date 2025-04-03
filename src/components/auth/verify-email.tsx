"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  verifyEmailSchema,
  resendVerificationSchema,
  type VerifyEmailFormValues,
  type ResendVerificationFormValues,
} from "@/schemas/auth"
import { verifyEmail, resendVerificationEmail } from "@/lib/actions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const verifyForm = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  })

  const resendForm = useForm<ResendVerificationFormValues>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: {
      email: "",
    },
  })

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      verifyForm.setValue("email", emailParam)
      resendForm.setValue("email", emailParam)
    }
  }, [searchParams, verifyForm, resendForm])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const onVerify = async (data: VerifyEmailFormValues) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append("email", data.email)
      formData.append("code", data.code)

      const result = await verifyEmail(formData);  

      if (result && "error" in result) {  
        setError(result.error ?? null);  
        setIsLoading(false);  
        return;  
      }  

      setSuccess("Email verified successfully! Redirecting to sign in page...")

      // Redirect to sign in page after 2 seconds
      setTimeout(() => {
        router.push("/signin")
      }, 2000)
    } catch (error) {
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  const onResend = async (data: ResendVerificationFormValues) => {
    setIsResending(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append("email", data.email)

      const result = await resendVerificationEmail(formData);  

      if (result && "error" in result) {  
        setError(result.error ?? null);  
        setIsResending(false);  
        return;  
      }  

      setSuccess("Verification code resent successfully!")
      setCountdown(60) // Set 60 seconds cooldown
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsResending(false)
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
            <p className="text-gray-600">
              We've sent a verification code to your email. Please enter it below to verify your account.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="default" className="mb-6 bg-green-50 border-green-200 text-green-800">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Form {...verifyForm}>
            <form onSubmit={verifyForm.handleSubmit(onVerify)} className="space-y-4">
              <FormField
                control={verifyForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        disabled={isLoading} 
                        className="border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={verifyForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Verification Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter 6-digit code" 
                        disabled={isLoading} 
                        className="border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a]" 
                        {...field} 
                      />
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
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the code?{" "}
              {countdown > 0 ? (
                <span className="text-gray-400">Resend in {countdown}s</span>
              ) : (
                <Form {...resendForm}>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-[#1e3a8a]"
                    onClick={resendForm.handleSubmit(onResend)}
                    disabled={isResending || countdown > 0}
                  >
                    {isResending ? "Resending..." : "Resend Code"}
                  </Button>
                </Form>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
