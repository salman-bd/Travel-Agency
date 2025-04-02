import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import { sendWelcomeEmail } from "@/lib/sendEmails"

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json({ error: "Email and verification code are required" }, { status: 400 })
    }

    // Find user with matching email and verification token
    const user = await db.user.findFirst({
      where: {
        email,
        verificationCode: code,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 })
    }

    // Mark user as verified
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationCode: null,
      },
    })

    // Send welcome email
    await sendWelcomeEmail(email, user.name || "User")

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    })
  } catch (error) {
    console.error("Error verifying email:", error)
    return NextResponse.json({ error: "An error occurred while verifying your email" }, { status: 500 })
  }
}

