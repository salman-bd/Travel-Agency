"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Blog } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { blogSchema, type BlogFormValues } from "@/lib/validations/blog"
import axiosClient from "@/lib/axios"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface BlogFormProps {
  blog?: Blog
  authorId?: string
}

const categories = ["Adventure", "Beach", "City", "Culture", "Food", "Mountain", "Nature", "Tips"]

export default function BlogForm({ blog, authorId }: BlogFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog?.title || "",
      content: blog?.content || "",
      excerpt: blog?.excerpt || "",
      imageUrl: blog?.imageUrl || "",
      category: blog?.category || categories[0],
      published: blog?.published || false,
    },
  })

  const onSubmit = async (data: BlogFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      if (blog) {
        // Update existing blog
        await axiosClient.put(`/api/blogs/${blog.id}`, data)
      } else if (authorId) {
        // Create new blog
        await axiosClient.post("/api/blogs", data)
      }

      router.push("/admin/blogs")
      router.refresh()
    } catch (error: any) {
      setError(error.response?.data?.error || "Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea rows={10} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Published</FormLabel>
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : blog ? "Update Blog" : "Create Blog"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/blogs")}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

