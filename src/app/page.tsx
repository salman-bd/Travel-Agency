import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-start justify-center px-4 text-white">
          <h1 className="mb-2 max-w-md text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Make it your journey
          </h1>
          <div className="mt-6 flex gap-4">
            <Link
              href="/destinations"
              className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Explore new worlds with exotic natural scenery</h2>
          <div className="relative">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="group overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Travel destination"
                  width={400}
                  height={300}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="mt-2">
                  <h3 className="font-semibold">Bali, Indonesia</h3>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">4.8</span>
                  </div>
                </div>
              </div>
              <div className="group overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Travel destination"
                  width={400}
                  height={300}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="mt-2">
                  <h3 className="font-semibold">Paris, France</h3>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">4.7</span>
                  </div>
                </div>
              </div>
              <div className="group overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Travel destination"
                  width={400}
                  height={300}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="mt-2">
                  <h3 className="font-semibold">Santorini, Greece</h3>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">4.9</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="absolute -left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="absolute -right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-2xl font-bold">Why choose Us?</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Best Service</h3>
              <p className="text-sm text-gray-600">
                We provide exceptional service to ensure your travel experience is smooth and enjoyable from start to
                finish.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Great Promotions</h3>
              <p className="text-sm text-gray-600">
                Take advantage of our exclusive deals and promotions to make your dream vacation more affordable.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Unforgettable Tours</h3>
              <p className="text-sm text-gray-600">
                Our carefully curated tours offer unique experiences that will create lasting memories for years to
                come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Tour Partners */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-2xl font-bold">Our tour partner</h2>
          <p className="mb-12 text-center text-gray-600">
            We collaborate with the best in the industry to provide you with exceptional service
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="grayscale transition-all hover:grayscale-0">
              <Image src="/placeholder.svg?height=50&width=120" alt="Partner logo" width={120} height={50} />
            </div>
            <div className="grayscale transition-all hover:grayscale-0">
              <Image src="/placeholder.svg?height=50&width=120" alt="Partner logo" width={120} height={50} />
            </div>
            <div className="grayscale transition-all hover:grayscale-0">
              <Image src="/placeholder.svg?height=50&width=120" alt="Partner logo" width={120} height={50} />
            </div>
            <div className="grayscale transition-all hover:grayscale-0">
              <Image src="/placeholder.svg?height=50&width=120" alt="Partner logo" width={120} height={50} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-2xl font-bold">What our client say</h2>
          <p className="mb-12 text-center text-gray-600">
            Hear from our satisfied customers about their experiences with us
          </p>

          <div className="relative">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-4">
                    <Image
                      src={`/placeholder.svg?height=60&width=60&text=User${i}`}
                      alt="User"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">Client Name</h3>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    "The trip was amazing! Everything was well-organized, and the guides were knowledgeable and
                    friendly. I'll definitely book with Rebel Rover again for my next adventure."
                  </p>
                </div>
              ))}
            </div>
            <button className="absolute -left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="absolute -right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Subscribe Section (This is also in the footer, but shown in the design as part of the main content too) */}
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

