import Image from "next/image"
import Link from "next/link"
import { Star, ChevronRight } from "lucide-react"

export default function DestinationsPage() {
  // Sample destination data
  const destinations = [
    {
      id: 1,
      name: "Paris",
      country: "France",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      price: "$1,299",
      category: "City",
    },
    {
      id: 2,
      name: "Santorini",
      country: "Greece",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      price: "$1,499",
      category: "Island",
    },
    {
      id: 3,
      name: "Kyoto",
      country: "Japan",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
      price: "$1,899",
      category: "Culture",
    },
    {
      id: 4,
      name: "Bali",
      country: "Indonesia",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.6,
      price: "$1,199",
      category: "Beach",
    },
    {
      id: 5,
      name: "Swiss Alps",
      country: "Switzerland",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      price: "$2,099",
      category: "Mountain",
    },
    {
      id: 6,
      name: "Machu Picchu",
      country: "Peru",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      price: "$1,799",
      category: "Adventure",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full bg-[url('/placeholder.svg?height=500&width=1200')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">Great Places</h1>
          <p className="max-w-2xl text-lg">Discover the world's most breathtaking destinations</p>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-2xl font-bold">Popular Destination</h2>
          <p className="mb-8 text-gray-600">Explore our most sought-after travel destinations</p>

          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {destinations.slice(0, 3).map((destination) => (
              <div
                key={destination.id}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                    <h3 className="text-lg font-semibold">{destination.name}</h3>
                    <p className="text-sm">{destination.country}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{destination.rating}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">{destination.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">{destination.category}</span>
                    <Link
                      href={`/destinations/${destination.id}`}
                      className="flex items-center text-xs font-medium text-primary hover:underline"
                    >
                      View Details <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {destinations.slice(3, 6).map((destination) => (
              <div
                key={destination.id}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                    <h3 className="text-lg font-semibold">{destination.name}</h3>
                    <p className="text-sm">{destination.country}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{destination.rating}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">{destination.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">{destination.category}</span>
                    <Link
                      href={`/destinations/${destination.id}`}
                      className="flex items-center text-xs font-medium text-primary hover:underline"
                    >
                      View Details <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destination */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Featured destination"
                  width={600}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <h3 className="mb-2 text-2xl font-bold">Explore the World</h3>
                <p className="mb-4 text-gray-600">
                  Discover amazing destinations around the globe with our expertly crafted travel packages. From
                  pristine beaches to historic cities, we have something for every traveler.
                </p>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips & Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-2xl font-bold">Tips & Article</h2>
          <p className="mb-8 text-gray-600">Get inspired with our travel guides and tips</p>

          <div className="mb-8">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="order-2 p-6 md:order-1">
                  <span className="mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs">Tips / Travel</span>
                  <h3 className="mb-2 text-xl font-bold">5 Popular Travel Destinations on Sale in 2023</h3>
                  <p className="mb-4 text-gray-600">
                    Discover amazing deals on these top destinations that you can visit without breaking the bank.
                  </p>
                  <Link
                    href="/travel-stories/popular-destinations-2023"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Read More <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                <div className="order-1 h-64 md:order-2">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Travel tips"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Travel tips"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs">Tips / Travel</span>
                  <h3 className="mb-2 text-xl font-bold">How are you Going to Travel in 2023?</h3>
                  <p className="mb-4 text-gray-600">
                    Explore the latest travel trends and discover new ways to experience the world in 2023.
                  </p>
                  <Link
                    href="/travel-stories/travel-trends-2023"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Read More <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
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

