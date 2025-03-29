"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Package, Itinerary } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Minus } from "lucide-react"
import { createPackage, updatePackage } from "@/lib/actions"

interface PackageFormProps {
  package?: Package & { itinerary: Itinerary[] }
  destinations: { id: string; name: string }[]
}

export default function PackageForm({ package: pkg, destinations }: PackageFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [itineraryItems, setItineraryItems] = useState<number[]>(
    pkg?.itinerary ? Array.from({ length: pkg.itinerary.length }, (_, i) => i + 1) : [1],
  )

  const addItineraryDay = () => {
    setItineraryItems([...itineraryItems, itineraryItems.length + 1])
  }

  const removeItineraryDay = () => {
    if (itineraryItems.length > 1) {
      setItineraryItems(itineraryItems.slice(0, -1))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      formData.append("itineraryCount", itineraryItems.length.toString())

      if (pkg) {
        formData.append("id", pkg.id)
        await updatePackage(formData)
      } else {
        await createPackage(formData)
      }

      router.push("/admin/packages")
      router.refresh()
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={pkg?.title || ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destinationId">Destination</Label>
            <Select name="destinationId" defaultValue={pkg?.destinationId || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((destination) => (
                  <SelectItem key={destination.id} value={destination.id}>
                    {destination.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={pkg?.price.toString() || "0"}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (days)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              min="1"
              defaultValue={pkg?.duration.toString() || "1"}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={pkg?.imageUrl || ""} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={5} defaultValue={pkg?.description || ""} required />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="inclusions">Inclusions (comma separated)</Label>
            <Textarea
              id="inclusions"
              name="inclusions"
              rows={3}
              defaultValue={pkg?.inclusions.join(", ") || ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exclusions">Exclusions (comma separated)</Label>
            <Textarea
              id="exclusions"
              name="exclusions"
              rows={3}
              defaultValue={pkg?.exclusions.join(", ") || ""}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Itinerary</Label>
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
                disabled={itineraryItems.length <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="ml-1">Remove Day</span>
              </Button>
            </div>
          </div>

          {itineraryItems.map((day) => {
            const itineraryItem = pkg?.itinerary.find((item) => item.day === day)

            return (
              <div key={day} className="rounded-md border p-4">
                <h3 className="mb-4 font-medium">Day {day}</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`itinerary-${day}-title`}>Title</Label>
                    <Input
                      id={`itinerary-${day}-title`}
                      name={`itinerary-${day}-title`}
                      defaultValue={itineraryItem?.title || ""}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`itinerary-${day}-description`}>Description</Label>
                    <Textarea
                      id={`itinerary-${day}-description`}
                      name={`itinerary-${day}-description`}
                      rows={3}
                      defaultValue={itineraryItem?.description || ""}
                      required
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
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
  )
}

