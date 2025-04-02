import { notFound } from "next/navigation"
import db from "@/lib/db"
import BlogForm from "@/components/admin/blog-form"

interface BlogEditPageProps {
  params: {
    id: string
  }
}

export default async function BlogEditPage({ params }: BlogEditPageProps) {
  const blog = await db.blog.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!blog) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Blog</h1>
      <BlogForm blog={blog} />
    </div>
  )
}

