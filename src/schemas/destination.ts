import { z } from "zod"

export const destinationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  category: z.string().min(2, { message: "Category must be at least 2 characters long" }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL" }),
  featured: z.boolean().optional(),
})

export type DestinationFormValues = z.infer<typeof destinationSchema>

