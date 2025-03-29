"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Blog } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createBlog, updateBlog } from "@/lib/actions"

interface BlogFormProps {
  blog?: Blog
  authorId?: string
}

const categories = ["Adventure", "Beach", "City", "Culture", "Food", "Mountain", "Nature", "Tips"]

export default function BlogForm({ blog, authorId }: BlogFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      if (blog) {
        formData.append("id", blog.id)
        await updateBlog(formData)
      } else if (authorId) {
        formData.append("authorId", authorId)
        await createBlog(formData)
      }

      router.push("/admin/blogs")
      router.refresh()
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={blog?.title || ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue={blog?.category || categories[0]}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={blog?.imageUrl || ""} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" name="excerpt" rows={3} defaultValue={blog?.excerpt || ""} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea id="content" name="content" rows={10} defaultValue={blog?.content || ""} required />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="published" name="published" defaultChecked={blog?.published || false} />
          <Label htmlFor="published">Published</Label>
          <input type="hidden" name="published" value={blog?.published ? "true" : "false"} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : blog ? "Update Blog" : "Create Blog"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/blogs")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

