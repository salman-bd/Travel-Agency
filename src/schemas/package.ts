import { z } from "zod"

export const itineraryItemSchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(2, { message: "Title must be at least 2 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
})

export const packageSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  duration: z.coerce.number().int().positive({ message: "Duration must be a positive integer" }),
  destinationId: z.string().min(1, { message: "Destination is required" }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL" }),
  inclusions: z.string().min(1, { message: "Inclusions are required" }),
  exclusions: z.string().min(1, { message: "Exclusions are required" }),
  itinerary: z.array(itineraryItemSchema).min(1, { message: "At least one itinerary item is required" }),
})

export type PackageFormValues = z.infer<typeof packageSchema>
export type ItineraryItemFormValues = z.infer<typeof itineraryItemSchema>

