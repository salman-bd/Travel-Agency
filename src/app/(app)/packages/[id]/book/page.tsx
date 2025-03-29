import { notFound } from "next/navigation"
import Image from "next/image"
import { db } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import BookingForm from "@/components/booking-form"

interface BookPackagePageProps {
  params: {
    id: string
  }
}

export default async function BookPackagePage({ params }: BookPackagePageProps) {
  const user = await requireAuth()

  const pkg = await db.package.findUnique({
    where: {
      id: params.id,
    },
    include: {
      destination: true,
    },
  })

  if (!pkg) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold">Book Your Trip</h1>

        <div className="mb-8 rounded-lg border p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={pkg.imageUrl || "/placeholder.svg"}
                alt={pkg.title}
                width={300}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="mb-2 text-xl font-bold">{pkg.title}</h2>
              <p className="mb-4 text-sm text-gray-600">
                {pkg.destination.name}, {pkg.destination.country}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{pkg.duration} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price per person</p>
                  <p className="font-medium">${pkg.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BookingForm packageId={pkg.id} userId={user.id} packagePrice={pkg.price} />
      </div>
    </div>
  )
}

