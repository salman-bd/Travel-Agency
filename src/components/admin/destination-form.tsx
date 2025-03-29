"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Destination } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createDestination, updateDestination } from "@/lib/actions"

interface DestinationFormProps {
  destination?: Destination
}

const categories = ["Adventure", "Beach", "City", "Culture", "Food", "Mountain", "Nature", "Island"]

export default function DestinationForm({ destination }: DestinationFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      if (destination) {
        formData.append("id", destination.id)
        await updateDestination(formData)
      } else {
        await createDestination(formData)
      }

      router.push("/admin/destinations")
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
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={destination?.name || ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" defaultValue={destination?.country || ""} required />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue={destination?.category || categories[0]}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={destination?.price.toString() || "0"}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={destination?.imageUrl || ""} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={destination?.description || ""}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="featured" name="featured" defaultChecked={destination?.featured || false} />
          <Label htmlFor="featured">Featured Destination</Label>
          <input type="hidden" name="featured" value={destination?.featured ? "true" : "false"} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : destination ? "Update Destination" : "Create Destination"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/destinations")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

