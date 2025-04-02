"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus, Loader2, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { packageSchema, type PackageFormValues } from "@/schemas/package"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createPackage, updatePackage } from "@/lib/actions"
import Image from "next/image"
import axios from "axios"
import { toast } from "sonner"

interface PackageFormProps {
  package?: Package & { itinerary: Itinerary[] }
  destinations: { id: string; name: string }[]
}

export default function PackageForm({ package: pkg, destinations }: PackageFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Prepare default values for the form
  const defaultItinerary = pkg?.itinerary?.length
    ? pkg.itinerary.map((item) => ({
        day: item.day,
        title: item.title,
        description: item.description,
      }))
    : [{ day: 1, title: "", description: "" }]

  const defaultValues: PackageFormValues = {
    title: pkg?.title || "",
    description: pkg?.description || "",
    price: pkg?.price || 0,
    duration: pkg?.duration || 1,
    destinationId: pkg?.destinationId || "",
    imageUrl: pkg?.imageUrl || "",
    inclusions: pkg?.inclusions?.join(", ") || "",
    exclusions: pkg?.exclusions?.join(", ") || "",
    itinerary: defaultItinerary,
  }

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues,
    mode: "onChange",
  })

  // Use fieldArray to handle dynamic itinerary items
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itinerary",
  })

  const addItineraryDay = () => {
    append({
      day: fields.length + 1,
      title: "",
      description: "",
    })
  }

  const removeItineraryDay = () => {
    if (fields.length > 1) {
      remove(fields.length - 1)
    }
  }

  const onSubmit = async (data: PackageFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      // Convert comma-separated strings to arrays
      const formData = new FormData()

      if (pkg) {
        formData.append("id", pkg.id)
      }

      formData.append("title", data.title)
      formData.append("description", data.description)
      formData.append("price", data.price.toString())
      formData.append("duration", data.duration.toString())
      formData.append("destinationId", data.destinationId)
      formData.append("imageUrl", data.imageUrl)

      // Convert comma-separated strings to arrays
      const inclusions = data.inclusions.split(",").map((item) => item.trim())
      const exclusions = data.exclusions.split(",").map((item) => item.trim())

      formData.append("inclusions", JSON.stringify(inclusions))
      formData.append("exclusions", JSON.stringify(exclusions))

      // Add itinerary data
      data.itinerary.forEach((item, index) => {
        formData.append(`itinerary-${index + 1}-day`, (index + 1).toString())
        formData.append(`itinerary-${index + 1}-title`, item.title)
        formData.append(`itinerary-${index + 1}-description`, item.description)
      })

      formData.append("itineraryCount", data.itinerary.length.toString())

      if (pkg) {
        await updatePackage(formData)
        toast.success("Package updated", {
          description: "The package has been updated successfully.",
        })
      } else {
        await createPackage(formData)
        toast.success( "Package created", {
          description: "The package has been created successfully.",
        })
      }

      router.push("/admin/packages")
      router.refresh()
    } catch (error: any) {
      setError(error.message || "Something went wrong. Please try again.")
      toast.error("Error",{
        description: error.message || "Something went wrong. Please try again.",
      })
      setIsLoading(false)
    }
  }

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
              name="destinationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {destinations.map((destination) => (
                        <SelectItem key={destination.id} value={destination.id}>
                          {destination.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (days)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
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

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="inclusions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inclusions (comma separated)</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exclusions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exclusions (comma separated)</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel>Itinerary</FormLabel>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={addItineraryDay}>
                  <Plus className="h-4 w-4" />
                  <span className="ml-1">Add Day</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={removeItineraryDay}
                  disabled={fields.length <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="ml-1">Remove Day</span>
                </Button>
              </div>
            </div>

            {fields.map((field, index) => (
              <Card key={field.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <h3 className="mb-4 font-medium">Day {index + 1}</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name={`itinerary.${index}.title`}
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
                      name={`itinerary.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : pkg ? "Update Package" : "Create Package"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/packages")}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

