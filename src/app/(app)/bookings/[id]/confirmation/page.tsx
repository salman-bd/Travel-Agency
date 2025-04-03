import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import db from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface BookingConfirmationPageProps {
  params: {
    id: string
  }
}

export default async function BookingConfirmationPage({ params }: BookingConfirmationPageProps) {
  const user = await requireAuth()
  const { id } = await params

  const booking = await db.booking.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      package: {
        include: {
          destination: true,
        },
      },
    },
  })

  if (!booking) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-primary" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">Booking Confirmed!</h1>
        <p className="mb-8 text-gray-600">Thank you for booking with Rebel Rover. Your adventure awaits!</p>

        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-md">
                <Image
                  src={booking.package.imageUrl || "/placeholder.svg"}
                  alt={booking.package.title}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-bold">{booking.package.title}</h2>
                <p className="text-sm text-gray-600">
                  {booking.package.destination.name}, {booking.package.destination.country}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-600">Booking ID</p>
                <p className="font-medium">{booking.id.substring(0, 8)}...</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-medium">{booking.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Travel Dates</p>
                <p className="font-medium">
                  {new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Travelers</p>
                <p className="font-medium">
                  {booking.adults} {booking.adults === 1 ? "Adult" : "Adults"}
                  {booking.children > 0 && `, ${booking.children} ${booking.children === 1 ? "Child" : "Children"}`}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex justify-between">
                <span className="font-medium">Total Price</span>
                <span className="font-bold">${booking.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/bookings">
              <Button variant="outline">View All Bookings</Button>
            </Link>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

