import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { getDestinations } from "@/lib/actions"

export default async function DestinationsPage() {
  const destinations = await getDestinations()
  // Sample destination data
  // const destinations = [
  //   {
  //     id: 1,
  //     name: "Paris",
  //     country: "France",
  //     image: "/placeholder.svg?height=300&width=400",
  //     rating: 4.8,
  //     price: "$1,299",
  //     category: "City",
  //   },
  //   {
  //     id: 2,
  //     name: "Santorini",
  //     country: "Greece",
  //     image: "/placeholder.svg?height=300&width=400",
  //     rating: 4.9,
  //     price: "$1,499",
  //     category: "Island",
  //   },
  //   {
  //     id: 3,
  //     name: "Kyoto",
  //     country: "Japan",
  //     image: "/placeholder.svg?height=300&width=400",
  //     rating: 4.7,
  //     price: "$1,899",
  //     category: "Culture",
  //   },
  //   {
  //     id: 4,
  //     name: "Bali",
  //     country: "Indonesia",
  //     image: "/placeholder.svg?height=300&width=400",
  //     rating: 4.6,
  //     price: "$1,199",
  //     category: "Beach",
  //   },
  //   {
  //     id: 5,
  //     name: "Swiss Alps",
  //     country: "Switzerland",
  //     image: "/placeholder.svg?height=300&width=400",
  //     rating: 4.8,
  //     price: "$2,099",
  //     category: "Mountain",
  //   },
  //   {
  //     id: 6,
  //     name: "Machu Picchu",
  //     country: "Peru",
  //     image: "/placeholder.svg?height=300&width=400",
  //     rating: 4.9,
  //     price: "$1,799",
  //     category: "Adventure",
  //   },
  // ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full bg-[url('/bg/travel1.jpg?height=500&width=1200')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">Great Places</h1>
          <p className="max-w-2xl text-lg">Discover the world's most breathtaking destinations</p>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-wrap items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold">Popular Destination</h2>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna
              </p>
            </div>
            <Link
              href="/destinations"
              className="mt-4 rounded-full bg-black px-6 py-3 text-white hover:bg-black/90 md:mt-0"
            >
              Discover more
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <div key={destination.id} className="overflow-hidden rounded-lg bg-white shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={destination.imageUrl || "/placeholder.svg"}
                    alt={destination.name}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <span className="font-medium">{destination.price}</span>
                  </div>

                  <p className="mb-4 text-gray-600">{destination.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <Link
                      href={`/destinations/${destination.id}`}
                      className="rounded-full bg-black px-6 py-2 text-sm font-medium text-white hover:bg-black/90"
                    >
                      Booking now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destination */}
      <section className="bg-gray-100 py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <Image
                  src="/bg/bungalow-holiday.jpg?height=500&width=600"
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
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-wrap items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold">Tips & Article</h2>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna
              </p>
            </div>
            <Link href="/blog" className="mt-4 rounded-full bg-black px-6 py-3 text-white hover:bg-black/90 md:mt-0">
              View more
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Left column with two articles */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-lg bg-white p-6 shadow">
                <div className="mb-2">
                  <span className="text-sm font-medium">Perfect | Tips</span>
                </div>
                <h3 className="mb-2 text-2xl font-bold">9 Popular Travel Destintion on Sale in 2022</h3>
                <div className="mb-4 h-0.5 w-8 bg-black"></div>
                <p className="mb-4 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna
                </p>
                <Link
                  href="/blog/popular-destinations-2022"
                  className="inline-block rounded-full bg-black px-6 py-2 text-white hover:bg-black/90"
                >
                  Read More
                </Link>
              </div>

              <div className="rounded-lg bg-white p-6 shadow">
                <div className="mb-2">
                  <span className="text-sm font-medium">Tips | Travel</span>
                </div>
                <h3 className="mb-2 text-2xl font-bold">How Are We Going to Travel in 2022</h3>
                <div className="mb-4 h-0.5 w-8 bg-black"></div>
                <p className="mb-4 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna
                </p>
                <Link
                  href="/blog/travel-in-2022"
                  className="inline-block rounded-full bg-black px-6 py-2 text-white hover:bg-black/90"
                >
                  Read More
                </Link>
              </div>
            </div>

            {/* Right column with featured article */}
            <div className="lg:col-span-3">
              <div className="h-full overflow-hidden rounded-lg bg-white shadow">
                <div className="relative h-96">
                  <Image
                    src="/bg/travel-concept.jpg?height=600&width=800"
                    alt="traveling"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm font-medium">Stories | Tips</span>
                  </div>
                  <h3 className="mb-2 text-3xl font-bold">Travel Stories For Now and the Future</h3>
                  <p className="mb-4 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna
                  </p>
                  <Link
                    href="/blog/travel-stories"
                    className="inline-block rounded-full bg-black px-6 py-2 text-white hover:bg-black/90"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

