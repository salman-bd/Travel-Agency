import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import BlogForm from "@/components/admin/blog-form"

export default async function NewBlogPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") {
    redirect("/signin")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create New Blog</h1>
      <BlogForm authorId={user.id} />
    </div>
  )
}

