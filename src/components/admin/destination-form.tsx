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
import { destinationSchema, type DestinationFormValues } from "@/schemas/destination"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import axios from "axios"
import { Loader2, Upload } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"


interface DestinationFormProps {
  destination?: Destination
}

const categories = ["Adventure", "Beach", "City", "Culture", "Food", "Mountain", "Nature", "Island"]

export default function DestinationForm({ destination }: DestinationFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
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
        await axios.put(`/api/destinations/${destination.id}`, data)
      } else {
        // Create new destination
        await axios.post("/api/destinations", data)
      }

      router.push("/admin/dashboard/destinations")
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
        throw new Error(response.data.message || "Failed to add the image")
      }
      form.setValue("imageUrl", response.data.url)
      toast.success("Success!", {
        description: "Operation completed successfully.",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Error!", {
        description: "Something went wrong uploading image.",
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
                <FormLabel>Destination Image</FormLabel>
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

