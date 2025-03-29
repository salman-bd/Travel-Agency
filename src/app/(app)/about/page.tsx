import Image from "next/image"
import { Users, Eye, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full bg-[url('/placeholder.svg?height=500&width=1200')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">About Us</h1>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Great team work</h3>
              <p className="text-sm text-gray-600">
                Our dedicated team works together seamlessly to ensure every aspect of your journey is perfectly planned
                and executed.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Our vision</h3>
              <p className="text-sm text-gray-600">
                We envision a world where travel is accessible, sustainable, and transformative, connecting people with
                diverse cultures and natural wonders.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Our mission</h3>
              <p className="text-sm text-gray-600">
                To create unforgettable travel experiences that inspire, educate, and bring joy while respecting local
                communities and preserving the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Team member"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-4 text-4xl font-bold text-primary">"</div>
              <p className="mb-6 text-lg italic text-gray-700">
                Our passion is to create extraordinary travel experiences that transform the way people see the world.
                We believe that travel has the power to connect cultures, broaden perspectives, and create lasting
                memories that enrich our lives.
              </p>
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Bill Sarah</h4>
                <p className="text-sm text-gray-600">Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">15+</span>
              </div>
              <p className="text-sm text-gray-600">Years Experience</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">650+</span>
              </div>
              <p className="text-sm text-gray-600">Destinations</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">2400+</span>
              </div>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">85+</span>
              </div>
              <p className="text-sm text-gray-600">Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-center text-2xl font-bold">Gallery</h2>
          <p className="mb-8 text-center text-gray-600">Unforgettable moment</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Travel moment"
                width={300}
                height={300}
                className="h-48 w-full object-cover transition-transform duration-300 hover:scale-110 md:h-64"
              />
              <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white">Bali</div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Travel moment"
                width={300}
                height={300}
                className="h-48 w-full object-cover transition-transform duration-300 hover:scale-110 md:h-64"
              />
              <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white">New York</div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Travel moment"
                width={300}
                height={300}
                className="h-48 w-full object-cover transition-transform duration-300 hover:scale-110 md:h-64"
              />
              <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white">Thailand</div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Travel moment"
                width={300}
                height={300}
                className="h-48 w-full object-cover transition-transform duration-300 hover:scale-110 md:h-64"
              />
              <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white">Italy</div>
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

