import { notFound } from "next/navigation"
import Link from "next/link"
import db from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { updateBookingStatus } from "@/lib/actions"

interface BookingDetailPageProps {
  params: {
    id: string
  }
}

export default async function BookingDetailPage({ params }: BookingDetailPageProps) {
  const { id } = await params
  const booking = await db.booking.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      package: {
        include: {
          destination: true,
          itinerary: {
            orderBy: {
              day: "asc",
            },
          },
        },
      },
    },
  })

  if (!booking) {
    notFound()
  }

  // Create server actions for each status update
  const confirmBooking = updateBookingStatus.bind(null, booking.id, "CONFIRMED")
  const cancelBooking = updateBookingStatus.bind(null, booking.id, "CANCELLED")
  const completeBooking = updateBookingStatus.bind(null, booking.id, "COMPLETED")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/bookings">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Booking Details</h1>
        </div>
        <div className="flex gap-2">
          {booking.status === "PENDING" && (
            <>
              <form action={confirmBooking}>
                <Button variant="outline" type="submit">
                  Confirm Booking
                </Button>
              </form>
              <form action={cancelBooking}>
                <Button variant="outline" type="submit" className="text-destructive">
                  Cancel Booking
                </Button>
              </form>
            </>
          )}
          {booking.status === "CONFIRMED" && (
            <form action={completeBooking}>
              <Button variant="outline" type="submit">
                Mark as Completed
              </Button>
            </form>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking ID:</span>
              <span className="font-mono">{booking.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
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
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created:</span>
              <span>{new Date(booking.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Price:</span>
              <span className="font-bold">${booking.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Travel Dates:</span>
              <span>
                {new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Travelers:</span>
              <span>
                {booking.adults} {booking.adults === 1 ? "Adult" : "Adults"}
                {booking.children > 0 && `, ${booking.children} ${booking.children === 1 ? "Child" : "Children"}`}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span>{booking.user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{booking.user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contact Email:</span>
              <span>{booking.contactEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contact Phone:</span>
              <span>{booking.contactPhone}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Package Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Package:</span>
            <span className="font-medium">{booking.package.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Destination:</span>
            <span>
              {booking.package.destination.name}, {booking.package.destination.country}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span>{booking.package.duration} days</span>
          </div>
          <div className="mt-4">
            <h3 className="mb-2 font-medium">Itinerary</h3>
            <div className="space-y-4">
              {booking.package.itinerary.map((item) => (
                <div key={item.id} className="rounded-md border p-4">
                  <h4 className="font-medium">
                    Day {item.day}: {item.title}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

