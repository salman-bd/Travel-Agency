"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Destination } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { destinationSchema, type DestinationFormValues } from "@/lib/validations/destination"
import axiosClient from "@/lib/axios"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface DestinationFormProps {
  destination?: Destination
}

const categories = ["Adventure", "Beach", "City", "Culture", "Food", "Mountain", "Nature", "Island"]

export default function DestinationForm({ destination }: DestinationFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<DestinationFormValues>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: destination?.name || "",
      country: destination?.country || "",
      description: destination?.description || "",
      price: destination?.price || 0,
      category: destination?.category || categories[0],
      imageUrl: destination?.imageUrl || "",
      featured: destination?.featured || false,
    },
  })

  const onSubmit = async (data: DestinationFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      if (destination) {
        // Update existing destination
        await axiosClient.put(`/api/destinations/${destination.id}`, data)
      } else {
        // Create new destination
        await axiosClient.post("/api/destinations", data)
      }

      router.push("/admin/destinations")
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                    />
                  </FormControl>
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Featured Destination</FormLabel>
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : destination ? "Update Destination" : "Create Destination"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/destinations")}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

