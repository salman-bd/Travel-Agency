"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { verifyEmail, resendVerificationEmail } from "@/lib/actions"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("code", code)

      const result = await verifyEmail(formData)

      if (result && "error" in result) {
        setError(result.error)
        setIsLoading(false)
        return
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

  const handleResend = async () => {
    setIsResending(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append("email", email)

      const result = await resendVerificationEmail(formData)

      if (result && "error" in result) {
        setError(result.error)
        setIsResending(false)
        return
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
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Verify Your Email</h1>
          <p className="text-muted-foreground">
            We've sent a verification code to your email. Please enter it below to verify your account.
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

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the code?{" "}
            {countdown > 0 ? (
              <span className="text-muted-foreground">Resend in {countdown}s</span>
            ) : (
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={handleResend}
                disabled={isResending || countdown > 0}
              >
                {isResending ? "Resending..." : "Resend Code"}
              </Button>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

