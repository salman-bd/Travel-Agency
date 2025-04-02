import { Resend } from "resend"
import { VerificationEmail } from "@/emails/verification-email"
import { WelcomeEmail } from "@/emails/welcome-email"
import { PasswordResetEmail } from "@/emails/password-reset-email"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, name: string, verificationCode: string) {
  try {
    await resend.emails.send({
      from: "Rebel Rover <verification@cscsylhet.com>",
      to: [email],
      subject: "Verify your email address",
      react: VerificationEmail({
        name,
        verificationCode,
      }),
    })
    return { success: true }
  } catch (error) {
    console.error("Error sending verification email:", error)
    return { error: "Failed to send verification email" }
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: "Rebel Rover <welcome@cscsylhet.com>",
      to: [email],
      subject: "Welcome to Rebel Rover!",
      react: WelcomeEmail({
        name,
      }),
    })
    return { success: true }
  } catch (error) {
    console.error("Error sending welcome email:", error)
    return { error: "Failed to send welcome email" }
  }
}

export async function sendPasswordResetEmail(email: string, name: string, resetToken: string) {
  try {
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`

    await resend.emails.send({
      from: "Rebel Rover <reset@cscsylhet.com>",
      to: [email],
      subject: "Reset your password",
      react: PasswordResetEmail({
        name,
        resetUrl,
      }),
    })
    return { success: true }
  } catch (error) {
    console.error("Error sending password reset email:", error)
    return { error: "Failed to send password reset email" }
  }
}

