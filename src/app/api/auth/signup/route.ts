import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import { hash } from "bcryptjs"
import { generateVerificationCode } from "@/lib/utils"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Generate verification code
    const verificationCode = generateVerificationCode()

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken: verificationCode,
      },
    })

    // Send verification email
    await sendVerificationEmail(email, name, verificationCode)

    return NextResponse.json({
      success: true,
      message: "User registered successfully. Please check your email for verification.",
      userId: user.id,
    })
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ error: "An error occurred while registering" }, { status: 500 })
  }
}

