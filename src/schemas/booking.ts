import { z } from "zod"

export const bookingSchema = z.object({
  packageId: z.string().min(1, { message: "Package is required" }),
  startDate: z.date({ required_error: "Start date is required" }),
  adults: z.coerce.number().int().min(1, { message: "At least 1 adult is required" }),
  children: z.coerce.number().int().min(0, { message: "Children must be a non-negative number" }).optional(),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
  contactPhone: z.string().min(5, { message: "Please enter a valid phone number" }),
})

export type BookingFormValues = z.infer<typeof bookingSchema>

