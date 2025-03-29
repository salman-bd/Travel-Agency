import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, DollarSign, Users, Check, X } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface PackagePageProps {
  params: {
    id: string
  }
}

export default async function PackagePage({ params }: PackagePageProps) {
  const pkg = await db.package.findUnique({
    where: {
      id: params.id,
    },
    include: {
      destination: true,
      itinerary: {
        orderBy: {
          day: "asc",
        },
      },
    },
  })

  if (!pkg) {
    notFound()
  }

  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section
        className="relative h-[500px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${pkg.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">{pkg.title}</h1>
          <p className="text-lg">
            {pkg.destination.name}, {pkg.destination.country}
          </p>
          <div className="mt-6 flex gap-4">
            <Link href={`/packages/${pkg.id}/book`}>
              <Button className="rounded-full bg-primary px-6 py-2 text-white hover:bg-primary/90">Book Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="mb-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{pkg.duration} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>
                    {pkg.destination.name}, {pkg.destination.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span>${pkg.price.toFixed(2)} per person</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Min 2 people</span>
                </div>
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="mb-6 grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="inclusions">Inclusions & Exclusions</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <h2 className="text-2xl font-bold">Overview</h2>
                  <p className="text-gray-600">{pkg.description}</p>
                  <div className="mt-6">
                    <Image
                      src={pkg.destination.imageUrl || "/placeholder.svg"}
                      alt={pkg.destination.name}
                      width={800}
                      height={400}
                      className="rounded-lg"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="itinerary" className="space-y-6">
                  <h2 className="text-2xl font-bold">Itinerary</h2>
                  {pkg.itinerary.map((item) => (
                    <div key={item.id} className="rounded-lg border p-6">
                      <h3 className="mb-2 text-lg font-bold">
                        Day {item.day}: {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="inclusions" className="space-y-6">
                  <h2 className="text-2xl font-bold">Inclusions & Exclusions</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-4 text-lg font-bold text-primary">Inclusions</h3>
                      <ul className="space-y-2">
                        {pkg.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="mt-1 h-4 w-4 text-primary" />
                            <span>{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-4 text-lg font-bold text-destructive">Exclusions</h3>
                      <ul className="space-y-2">
                        {pkg.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <X className="mt-1 h-4 w-4 text-destructive" />
                            <span>{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">Book This Package</h3>
                  <div className="mb-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per person:</span>
                      <span className="font-bold">${pkg.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span>{pkg.duration} days</span>
                    </div>
                  </div>
                  <Link href={user ? `/packages/${pkg.id}/book` : "/login?redirect=/packages/" + pkg.id + "/book"}>
                    <Button className="w-full">{user ? "Book Now" : "Login to Book"}</Button>
                  </Link>
                  <p className="mt-4 text-center text-xs text-gray-500">No payment required to book. Pay later.</p>
                </CardContent>
              </Card>
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

