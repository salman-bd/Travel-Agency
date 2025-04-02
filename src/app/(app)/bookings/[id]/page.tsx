import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import db from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CalendarDays, MapPin, Users, Clock } from "lucide-react"

interface BookingDetailPageProps {
  params: {
    id: string
  }
}

export default async function BookingDetailPage({ params }: BookingDetailPageProps) {
  const user = await requireAuth()

  const booking = await db.booking.findUnique({
    where: {
      id: params.id,
      userId: user.id,
    },
    include: {
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

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/bookings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Booking Details</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <div className="relative h-64 w-full">
              <Image
                src={booking.package.imageUrl || "/placeholder.svg"}
                alt={booking.package.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{booking.package.title}</CardTitle>
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
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>
                    {booking.package.destination.name}, {booking.package.destination.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <span>
                    {new Date(booking.startDate).toLocaleDateString()} to{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{booking.package.duration} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>
                    {booking.adults} {booking.adults === 1 ? "Adult" : "Adults"}
                    {booking.children > 0 && `, ${booking.children} ${booking.children === 1 ? "Child" : "Children"}`}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold">Itinerary</h3>
                <div className="space-y-4">
                  {booking.package.itinerary.map((item) => (
                    <div key={item.id} className="rounded-lg border p-4">
                      <h4 className="mb-2 font-medium">
                        Day {item.day}: {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-mono text-xs">{booking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Booking Date:</span>
                <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
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
                <span className="text-gray-600">Contact Email:</span>
                <span>{booking.contactEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact Phone:</span>
                <span>{booking.contactPhone}</span>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-medium">Price Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">
                      Adults ({booking.adults} × ${booking.package.price.toFixed(2)})
                    </span>
                    <span>${(booking.adults * booking.package.price).toFixed(2)}</span>
                  </div>
                  {booking.children > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm">
                        Children ({booking.children} × ${(booking.package.price * 0.5).toFixed(2)})
                      </span>
                      <span>${(booking.children * booking.package.price * 0.5).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${booking.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 space-y-4">
            <Button className="w-full" asChild>
              <Link href={`/contact?subject=Question about booking ${booking.id.substring(0, 8)}`}>
                Contact Support
              </Link>
            </Button>
            {booking.status === "PENDING" && (
              <Button variant="outline" className="w-full text-destructive">
                Cancel Booking
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

