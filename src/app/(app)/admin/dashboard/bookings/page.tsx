import Link from "next/link"
import db from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { updateBookingStatus } from "@/lib/actions"

export default async function AdminBookingsPage() {
  const bookings = await db.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      package: {
        select: {
          title: true,
          destination: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bookings</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Travel Dates</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-xs">{booking.id.substring(0, 8)}...</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.user.name}</p>
                      <p className="text-xs text-muted-foreground">{booking.user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.package.title}</p>
                      <p className="text-xs text-muted-foreground">{booking.package.destination.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-xs">{new Date(booking.startDate).toLocaleDateString()}</p>
                      <p className="text-xs">to</p>
                      <p className="text-xs">{new Date(booking.endDate).toLocaleDateString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>${booking.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "CONFIRMED"
                          ? "default"
                          : booking.status === "CANCELLED"
                            ? "destructive"
                            : booking.status === "COMPLETED"
                              ? "outline"
                              : "secondary"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/bookings/${booking.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </Link>
                      {booking.status === "PENDING" && (
                        <form action={async () => await updateBookingStatus(booking.id, "CONFIRMED")}>
                          <Button variant="outline" size="sm" type="submit">
                            Confirm
                          </Button>
                        </form>
                      )}
                      {booking.status === "PENDING" && (
                        <form action={async () => await updateBookingStatus(booking.id, "CANCELLED")}>
                          <Button variant="outline" size="sm" type="submit" className="text-destructive">
                            Cancel
                          </Button>
                        </form>
                      )}
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

