import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

// GET all blogs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const published = searchParams.get("published") === "true"
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const whereClause: any = {}

    if (category) {
      whereClause.category = category
    }

    if (searchParams.has("published")) {
      whereClause.published = published
    } else {
      // By default, only show published blogs to the public
      whereClause.published = true
    }

    const blogs = await db.blog.findMany({
      where: whereClause,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(blogs)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "An error occurred while fetching blogs" }, { status: 500 })
  }
}

// POST new blog (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    // Create slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    const blog = await db.blog.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl,
        category: data.category,
        published: data.published || false,
        authorId: session.user.id,
      },
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "An error occurred while creating the blog" }, { status: 500 })
  }
}

