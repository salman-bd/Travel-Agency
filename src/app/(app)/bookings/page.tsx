import Link from "next/link"
import Image from "next/image"
import { db } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Users } from "lucide-react"

export default async function UserBookingsPage() {
  const user = await requireAuth()

  const bookings = await db.booking.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      package: {
        include: {
          destination: true,
        },
      },
    },
  })

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold">No bookings yet</h2>
          <p className="mb-6 text-gray-600">
            You haven&apos;t made any bookings yet. Start exploring our destinations to plan your next adventure!
          </p>
          <Link href="/destinations">
            <Button>Explore Destinations</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={booking.package.imageUrl || "/placeholder.svg"}
                  alt={booking.package.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute right-2 top-2">
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
              </div>
              <CardHeader>
                <CardTitle>{booking.package.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">
                    {booking.package.destination.name}, {booking.package.destination.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span className="text-sm">
                    {new Date(booking.startDate).toLocaleDateString()} to{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">
                    {booking.adults} {booking.adults === 1 ? "Adult" : "Adults"}
                    {booking.children > 0 && `, ${booking.children} ${booking.children === 1 ? "Child" : "Children"}`}
                  </span>
                </div>
                <div className="rounded-md bg-gray-50 p-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total:</span>
                    <span className="font-bold">${booking.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/bookings/${booking.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

