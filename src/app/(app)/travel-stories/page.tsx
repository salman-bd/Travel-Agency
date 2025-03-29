import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function TravelStoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full bg-[url('/placeholder.svg?height=500&width=1200')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">Travel Stories For Now and the Future</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Featured story"
                  width={800}
                  height={500}
                  className="mb-4 rounded-lg"
                />
                <h2 className="mb-2 text-2xl font-bold">Rice Terraces, Tegallalang</h2>
                <p className="mb-4 text-gray-600">
                  The Tegallalang Rice Terraces in Ubud are famous for their beautiful scenes of rice paddies and their
                  innovative irrigation system. Known as subak, the traditional Balinese cooperative irrigation system
                  is said to have been passed down by a revered holy man named Rsi Markandeya in the 8th century.
                </p>
                <p className="mb-4 text-gray-600">
                  The terraced landscapes have been drawn on canvases and shot by photographers from around the world.
                  The paddies are stepped along the entire hillside with coconut and banana trees standing here and
                  there. The area is cool and breezy with stunning views.
                </p>
                <p className="mb-4 text-gray-600">
                  Tegallalang forms the three most stunning terraced landscapes in Ubud, with the others being in the
                  villages of Pejeng and Campuhan. The Tegallalang rice terraces alone offer a scenic outlook that
                  spreads down and away to the rice paddies.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Travel story"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Travel story"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="mb-8 border-t border-gray-200 pt-8">
                <h3 className="mb-4 text-xl font-bold">Leave a Reply</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1 block text-sm font-medium">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1 block text-sm font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="comment" className="mb-1 block text-sm font-medium">
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="mb-8 rounded-lg border border-gray-200 p-6">
                <h3 className="mb-4 text-lg font-bold">Recent Post</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="Recent post"
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                      <div>
                        <h4 className="font-medium">A Guide to the Best Beaches in Bali</h4>
                        <p className="text-xs text-gray-500">June 12, 2023</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 rounded-lg border border-gray-200 p-6">
                <h3 className="mb-4 text-lg font-bold">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="flex items-center justify-between hover:text-primary">
                      <span>Adventure</span>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">12</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center justify-between hover:text-primary">
                      <span>Beach</span>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">8</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center justify-between hover:text-primary">
                      <span>City</span>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">15</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center justify-between hover:text-primary">
                      <span>Culture</span>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">7</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center justify-between hover:text-primary">
                      <span>Food</span>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">9</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-4 text-lg font-bold">Have Any Question?</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Feel free to reach out to us if you have any questions about our travel stories or destinations.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Contact Us <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
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

