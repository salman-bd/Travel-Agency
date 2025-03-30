import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

// GET all destinations
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured") === "true"
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const whereClause: any = {}

    if (category) {
      whereClause.category = category
    }

    if (searchParams.has("featured")) {
      whereClause.featured = featured
    }

    const destinations = await db.destination.findMany({
      where: whereClause,
      take: limit,
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(destinations)
  } catch (error) {
    console.error("Error fetching destinations:", error)
    return NextResponse.json({ error: "An error occurred while fetching destinations" }, { status: 500 })
  }
}

// POST new destination (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    const destination = await db.destination.create({
      data: {
        name: data.name,
        country: data.country,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl: data.imageUrl,
        featured: data.featured || false,
        rating: data.rating || 0,
      },
    })

    return NextResponse.json(destination)
  } catch (error) {
    console.error("Error creating destination:", error)
    return NextResponse.json({ error: "An error occurred while creating the destination" }, { status: 500 })
  }
}

