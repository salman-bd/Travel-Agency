import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import { generateVerificationCode } from "@/lib/utils"
import { sendVerificationEmail } from "@/lib/sendEmails"

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
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.emailVerified) {
      return NextResponse.json({ error: "Email is already verified" }, { status: 400 })
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode()

    // Update user with new verification code
    await db.user.update({
      where: { id: user.id },
      data: {
        verificationToken: verificationCode,
      },
    })

    // Send verification email
    await sendVerificationEmail(email, user.name || "User", verificationCode)

    return NextResponse.json({
      success: true,
      message: "Verification code resent successfully",
    })
  } catch (error) {
    console.error("Error resending verification email:", error)
    return NextResponse.json({ error: "An error occurred while resending verification email" }, { status: 500 })
  }
}

