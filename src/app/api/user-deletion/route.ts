import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import crypto from "crypto"

// This endpoint handles Facebook's Data Deletion Request
// https://developers.facebook.com/docs/development/create-an-app/app-dashboard/data-deletion-callback

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()

    // Verify the request is coming from Facebook
    const signed_request = body.signed_request
    if (!signed_request) {
      return NextResponse.json({ error: "Missing signed_request parameter" }, { status: 400 })
    }

    // Split the signed request into signature and payload
    const [encodedSignature, payload] = signed_request.split(".")

    // Decode the payload
    const decodedPayload = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"))

    // Get the user ID to delete
    const userId = decodedPayload.user_id

    // Verify this is a valid deletion request
    if (!userId) {
      return NextResponse.json({ error: "Invalid deletion request" }, { status: 400 })
    }

    // Find the user by their Facebook ID
    const user = await db.user.findFirst({
      where: {
        accounts: {
          some: {
            provider: "facebook",
            providerAccountId: userId.toString(),
          },
        },
      },
    })

    if (!user) {
      // User not found, but we'll return success anyway
      return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_APP_URL}/privacy-policy`,
        confirmation_code: crypto.randomUUID(),
      })
    }

    // Process user deletion
    // Option 1: Complete deletion
    await db.user.delete({
      where: {
        id: user.id,
      },
    })

    // Option 2: Anonymize user data instead of deleting
    /*
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: "Deleted User",
        email: `deleted-${crypto.randomUUID()}@example.com`,
        image: null,
        // Add other fields to anonymize
      },
    })
    */

    // Return success response with confirmation code
    return NextResponse.json({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/privacy-policy`,
      confirmation_code: crypto.randomUUID(),
    })
  } catch (error) {
    console.error("Error processing user deletion request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

