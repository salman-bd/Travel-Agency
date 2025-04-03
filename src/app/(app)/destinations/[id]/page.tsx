import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import db from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Clock, DollarSign, Check } from "lucide-react"

interface DestinationPageProps {
  params: {
    id: string
  }
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { id } = await params
  const destination = await db.destination.findUnique({
    where: {
      id,
    },
    include: {
      packages: true,
    },
  })

  if (!destination) {
    notFound()
  }

  // Get related destinations
  const relatedDestinations = await db.destination.findMany({
    where: {
      OR: [{ category: destination.category }, { country: destination.country }],
      NOT: {
        id: destination.id,
      },
    },
    take: 3,
  })

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section
        className="relative h-[500px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${destination.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">{destination.name}</h1>
          <p className="text-lg">{destination.country}</p>
          <div className="mt-4 flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(destination.rating) ? "fill-secondary text-secondary" : "text-gray-400"}`}
                />
              ))}
            </div>
            <span className="ml-1">{destination.rating.toFixed(1)}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="mb-4 text-2xl font-bold">About {destination.name}</h2>
              <p className="mb-6 text-gray-600">{destination.description}</p>

              <h2 className="mb-4 text-2xl font-bold">Available Packages</h2>
              <div className="space-y-6">
                {destination.packages.length === 0 ? (
                  <p className="text-gray-600">No packages available for this destination yet.</p>
                ) : (
                  destination.packages.map((pkg) => (
                    <Card key={pkg.id} className="overflow-hidden">
                      <div className="grid md:grid-cols-3">
                        <div className="h-48 md:h-full">
                          <Image
                            src={pkg.imageUrl || "/placeholder.svg"}
                            alt={pkg.title}
                            width={400}
                            height={300}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-6 md:col-span-2">
                          <h3 className="mb-2 text-xl font-bold">{pkg.title}</h3>
                          <p className="mb-4 text-sm text-gray-600">{pkg.description.substring(0, 150)}...</p>
                          <div className="mb-4 flex flex-wrap gap-4">
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>{pkg.duration} days</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <DollarSign className="h-4 w-4 text-primary" />
                              <span>${pkg.price.toFixed(2)} per person</span>
                            </div>
                          </div>
                          <Link href={`/packages/${pkg.id}`}>
                            <Button>View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-bold">Destination Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-gray-600">{destination.country}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Starting Price</p>
                        <p className="text-sm text-gray-600">${destination.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-4 text-lg font-bold">Why Visit?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 text-primary" />
                        <span className="text-sm">Beautiful landscapes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 text-primary" />
                        <span className="text-sm">Rich cultural experiences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 text-primary" />
                        <span className="text-sm">Delicious local cuisine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 text-primary" />
                        <span className="text-sm">Friendly locals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 text-primary" />
                        <span className="text-sm">Unforgettable memories</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <h3 className="mb-4 text-lg font-bold">Related Destinations</h3>
                <div className="space-y-4">
                  {relatedDestinations.map((related) => (
                    <Link key={related.id} href={`/destinations/${related.id}`}>
                      <div className="group flex gap-4 rounded-lg border p-3 transition-colors hover:bg-gray-50">
                        <div className="h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={related.imageUrl || "/placeholder.svg"}
                            alt={related.name}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-primary">{related.name}</h4>
                          <p className="text-xs text-gray-600">{related.country}</p>
                          <div className="mt-1 flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.floor(related.rating) ? "fill-secondary text-secondary" : "text-gray-400"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-lg bg-[url('/placeholder.svg?height=300&width=1200')] bg-cover bg-center py-12 text-center text-white">
            <h3 className="mb-4 text-2xl font-bold">Subscribe to get special price</h3>
            <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-full border border-white bg-transparent px-4 py-2 text-white placeholder:text-white/70 focus:outline-none sm:flex-1"
              />
              <button className="rounded-full bg-white px-6 py-2 text-sm font-medium text-primary hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

