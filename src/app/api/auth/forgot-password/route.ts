import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import { sendPasswordResetEmail } from "@/lib/email"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Find user with matching email
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal that the user doesn't exist
      return NextResponse.json({
        success: true,
        message: "If an account exists with this email, you will receive a password reset link shortly.",
      })
    }

    // Generate reset token
    const resetToken = crypto.randomUUID()
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Update user with reset token
    await db.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    // Send password reset email
    await sendPasswordResetEmail(email, user.name || "User", resetToken)

    return NextResponse.json({
      success: true,
      message: "If an account exists with this email, you will receive a password reset link shortly.",
    })
  } catch (error) {
    console.error("Error sending password reset email:", error)
    return NextResponse.json({ error: "An error occurred while sending password reset email" }, { status: 500 })
  }
}

