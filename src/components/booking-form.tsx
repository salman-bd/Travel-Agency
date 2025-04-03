"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { createBooking } from "@/lib/actions"
import { bookingSchema, type BookingFormValues } from "@/schemas/booking"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface BookingFormProps {
  packageId: string
  userId: string
  packagePrice: number
}

export default function BookingForm({ packageId, userId, packagePrice }: BookingFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      packageId,
      startDate: undefined,
      adults: 2,
      children: 0,
      contactEmail: "",
      contactPhone: "",
    },
  })

  const adults = form.watch("adults")
  const children = form.watch("children")
  const totalPrice = packagePrice * adults + packagePrice * 0.5 * children

  const onSubmit = async (data: BookingFormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("userId", userId)
      formData.append("packageId", packageId)
      formData.append("startDate", data.startDate.toISOString())
      formData.append("adults", data.adults.toString())
      formData.append("children", data.children.toString())
      formData.append("contactEmail", data.contactEmail)
      formData.append("contactPhone", data.contactPhone)

      await createBooking(formData)
    } catch (error) {
      console.error("Error creating booking:", error)
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Travel Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : "Select a date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="adults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Adults</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Children</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 font-medium">Price Summary</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>
                    Adults ({adults} × ${packagePrice.toFixed(2)})
                  </span>
                  <span>${(adults * packagePrice).toFixed(2)}</span>
                </div>
                {children > 0 && (
                  <div className="flex justify-between">
                    <span>
                      Children ({children} × ${(packagePrice * 0.5).toFixed(2)})
                    </span>
                    <span>${(children * packagePrice * 0.5).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Complete Booking"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

