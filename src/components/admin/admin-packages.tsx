'use client'

// components/admin/admin-packages.tsx
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Plus } from 'lucide-react'
import { deletePackage } from "@/lib/actions"

interface Package {
  id: string
  title: string
  imageUrl: string
  duration: number
  price: number
  destination: {
    name: string
  }
}

interface AdminPackagesProps {
  packages: Package[]
}

export default function AdminPackages({ packages }: AdminPackagesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Packages</h1>
        <Link href="/admin/packages/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Package
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No packages found
                </TableCell>
              </TableRow>
            ) : (
              packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell>
                    <div className="h-10 w-10 overflow-hidden rounded-md">
                      <Image
                        src={pkg.imageUrl || "/placeholder.svg"}
                        alt={pkg.title}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{pkg.title}</TableCell>
                  <TableCell>{pkg.destination.name}</TableCell>
                  <TableCell>{pkg.duration} days</TableCell>
                  <TableCell>${pkg.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/packages/${pkg.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <form action={async () => await deletePackage(pkg.id)}>
                        <Button variant="ghost" size="icon" type="submit">
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}