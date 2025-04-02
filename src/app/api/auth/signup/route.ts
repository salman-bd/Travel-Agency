import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import bcryptjs from "bcryptjs"
import { generateVerificationCode } from "@/lib/utils"
import { sendVerificationEmail } from "@/lib/sendEmails"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, role } = body
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email }, })
    const verificationCode = generateVerificationCode()

    if (existingUser) {
      if (existingUser.isVerified) {  
        return NextResponse.json({ success: false, message: "User already exists with this email" }, { status: 400 });  
      } 
      const hashedPassword = await bcryptjs.hash(password, 10);  
      const verificationExpires = new Date(Date.now() + 3600000); // 1 hour from now  
      await db.user.update({  
          where: {  
              email: email,  
          },  
          data: {  
              password: hashedPassword,  
              verificationCode,
              verificationExpires, 
              role,
          },  
      });
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10)
      const verificationExpires = new Date(Date.now() + 3600000) // 1 hour from now
      // Create user
      await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          verificationCode,
          verificationExpires,
          role,
        },
      })
    }
    // Send verification email
    await sendVerificationEmail(email, name, verificationCode)

    return NextResponse.json({
      success: true,
      message: "User registered successfully. Please check your email for verification.",
      name,
      email,
    })

  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ error: "An error occurred while registering" }, { status: 500 })
  }
}

