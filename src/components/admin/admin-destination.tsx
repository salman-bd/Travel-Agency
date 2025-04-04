"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Plus, ImageIcon } from "lucide-react"
import { deleteDestination } from "@/lib/actions"
import type { Destination } from "@/types/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { toast } from "sonner"

interface AdminDestinationProps {
  destinations: Destination[]
}

export default function AdminDestinationsPage({ destinations }: AdminDestinationProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  // Function to handle delete
  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id)
      await deleteDestination(id)
      toast.success("Destination deleted successfully")
    } catch (error) {
      toast.error("Failed to delete destination")
      console.error(error)
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Destinations</h1>
        <Link href="/admin/dashboard/destinations/new">
          <Button className="mt-4 md:mt-0 bg-[#069aba] hover:bg-[#069aba]/90">
            <Plus className="mr-2 h-4 w-4" /> Add New Destination
          </Button>
        </Link>
      </div>

      {destinations.length === 0 ? (
        <Card className="border-none shadow-md">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <ImageIcon className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-center text-gray-500 text-lg">No destinations yet</p>
            <p className="text-center text-gray-400 text-sm mt-1">Add your first destination to get started</p>
            <Link href="/admin/dashboard/destinations/new" className="mt-6">
              <Button className="bg-[#069aba] hover:bg-[#069aba]/90">
                <Plus className="mr-2 h-4 w-4" /> Add Destination
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-white pb-0">
            <CardTitle className="text-xl font-bold text-gray-900">All Destinations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-medium">Image</TableHead>
                    <TableHead className="font-medium">Name</TableHead>
                    <TableHead className="font-medium">Country</TableHead>
                    <TableHead className="font-medium">Category</TableHead>
                    <TableHead className="font-medium">Price</TableHead>
                    <TableHead className="font-medium">Featured</TableHead>
                    <TableHead className="text-right font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {destinations.map((destination) => (
                    <TableRow key={destination.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-100">
                          {destination.imageUrl ? (
                            <Image
                              src={destination.imageUrl || "/placeholder.svg"}
                              alt={destination.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <ImageIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">{destination.name}</TableCell>
                      <TableCell>{destination.country}</TableCell>
                      <TableCell>{destination.category}</TableCell>
                      <TableCell>${destination.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={destination.featured ? "default" : "outline"}
                          className={destination.featured ? "bg-[#f4bc61] text-gray-900 hover:bg-[#f4bc61]/90" : ""}
                        >
                          {destination.featured ? "Featured" : "Standard"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/destinations/${destination.id}`}>
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#069aba]">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            onClick={() => handleDelete(destination.id)}
                            disabled={isDeleting === destination.id}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

