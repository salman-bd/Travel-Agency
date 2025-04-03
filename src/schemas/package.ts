import { z } from "zod"

// Define the schema for a single itinerary day
const itineraryItemSchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
})

// Define the schema for the entire package form
export const packageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  duration: z.number().int().positive("Duration must be a positive integer"),
  destinationId: z.string().min(1, "Destination is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  inclusions: z.string(),
  exclusions: z.string(),
  itinerary: z.array(itineraryItemSchema).min(1, "At least one itinerary day is required"),
})

// Export the type for the form values
export type PackageFormValues = z.infer<typeof packageSchema>

