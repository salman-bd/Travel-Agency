import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

// GET a single destination
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const destination = await db.destination.findUnique({
      where: {
        id: params.id,
      },
      include: {
        packages: true,
      },
    })

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }

    return NextResponse.json(destination)
  } catch (error) {
    console.error("Error fetching destination:", error)
    return NextResponse.json({ error: "An error occurred while fetching the destination" }, { status: 500 })
  }
}

// PUT update destination (admin only)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    const destination = await db.destination.update({
      where: {
        id: params.id,
      },
      data: {
        name: data.name,
        country: data.country,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl: data.imageUrl,
        featured: data.featured,
        rating: data.rating,
      },
    })

    return NextResponse.json(destination)
  } catch (error) {
    console.error("Error updating destination:", error)
    return NextResponse.json({ error: "An error occurred while updating the destination" }, { status: 500 })
  }
}

// DELETE destination (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await db.destination.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting destination:", error)
    return NextResponse.json({ error: "An error occurred while deleting the destination" }, { status: 500 })
  }
}

