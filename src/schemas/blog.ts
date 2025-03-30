import { z } from "zod"

export const blogSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
  content: z.string().min(50, { message: "Content must be at least 50 characters long" }),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters long" }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL" }),
  category: z.string().min(2, { message: "Category must be at least 2 characters long" }),
  published: z.boolean().optional(),
})

export type BlogFormValues = z.infer<typeof blogSchema>

