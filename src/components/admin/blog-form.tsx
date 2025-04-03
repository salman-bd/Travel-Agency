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
import { blogSchema, type BlogFormValues } from "@/schemas/blog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import axios from "axios"
import { Loader2, Upload } from "lucide-react"
import Image from "next/image"
import { createBlog, updateBlog } from "@/lib/actions"
import { toast } from "sonner"

interface BlogFormProps {
  blog?: Blog
  authorId?: string
}

const categories = ["Adventure", "Beach", "City", "Culture", "Food", "Mountain", "Nature", "Tips"]

export default function BlogForm({ blog, authorId }: BlogFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
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
        const id = blog.id
        const response = await updateBlog(id, data)
        if (response.success) {
          toast.success("Blog updated", {
            description: "The Blog has been updated successfully.",
            className: "bg-green-50 border-green-200 text-green-800",
          })
        }
      } else if (authorId) {
        const response = await createBlog(data)
        if (response.success) {
          toast.success("Blog created", {
            description: "The Blog has been created successfully.",
            className: "bg-green-50 border-green-200 text-green-800",
          })
        }
      }
      router.push("/admin/dashboard/blogs")
      router.refresh()
    } catch (error: any) {
      setError(error.response?.data?.error || "Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5MB. Please choose a smaller file.")
      toast.error("Too Large Image", {
        description: "File size exceeds 5MB. Please choose a smaller file.",
        className: "bg-red-50 border-red-200 text-red-800",
      })
      return
    }
    const formData = new FormData()
    formData.append("file", file)
    try {
      setImageUploading(true)
      const response = await axios.post("/api/image-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if (!response.data.success) {
        setError(response?.data?.message || "Something went wrong. Please try again.")
        throw new Error(response.data.message || "Failed to add the image")
      }
      form.setValue("imageUrl", response.data.url)
      toast.success("Image Uploaded", {
        description: "The image has been uploaded successfully.",
        className: "bg-green-50 border-green-200 text-green-800",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Image Uploading Failed", {
        description: "Something went wrong uploading image",
        className: "bg-red-50 border-red-200 text-red-800",
      })
    } finally {
      setImageUploading(false)
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
                    <SelectContent className="bg-white">
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
                <FormLabel>Blog Image</FormLabel>
                <div className="space-y-4">
                  {field.value && (
                    <div className="relative w-60 h-48 rounded-md overflow-hidden border mx-auto">
                      <Image
                        src={`${field.value}`}
                        width={300}
                        height={300}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <FormControl>
                      <Input type="text" placeholder="Image URL" {...field} className="hidden"/>
                    </FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Button type="button" variant="outline">
                        {imageUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin text-teal-600"/>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
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
                  <Textarea rows={2} {...field} />
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
                  <Textarea rows={6} {...field} />
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
            <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard/blogs")}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

