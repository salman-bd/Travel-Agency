import Image from "next/image"
import { Users, Eye, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full bg-[url('/bg/mountain.jpg?height=500&width=1200')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">About Us</h1>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M40 16C44.4183 16 48 12.4183 48 8C48 3.58172 44.4183 0 40 0C35.5817 0 32 3.58172 32 8C32 12.4183 35.5817 16 40 16Z"
                    fill="black"
                  />
                  <path
                    d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z"
                    fill="black"
                  />
                  <path
                    d="M56 32C60.4183 32 64 28.4183 64 24C64 19.5817 60.4183 16 56 16C51.5817 16 48 19.5817 48 24C48 28.4183 51.5817 32 56 32Z"
                    fill="black"
                  />
                  <path d="M16 48V40C16 35.6 19.6 32 24 32C28.4 32 32 35.6 32 40V48H16Z" fill="black" />
                  <path d="M48 48V40C48 35.6 51.6 32 56 32C60.4 32 64 35.6 64 40V48H48Z" fill="black" />
                  <path d="M32 48V40C32 35.6 35.6 32 40 32C44.4 32 48 35.6 48 40V48H32Z" fill="black" />
                  <path d="M16 56V64C16 68.4 19.6 72 24 72H56C60.4 72 64 68.4 64 64V56H16Z" fill="black" />
                </svg>
              </div>
              <h3 className="mb-4 text-3xl font-bold">Great team work</h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor nunc non neque euismod
                porttitor. Nullam lacus est, tincidunt eget sapien eget, maximus convallis massa. Curabitur quis tellus a
                tortor egestas viverra.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M72 32L64 24L56 32L48 8L40 16L32 8L24 32L16 24L8 32V72H72V32Z" fill="black" />
                  <circle cx="24" cy="24" r="8" fill="black" />
                </svg>
              </div>
              <h3 className="mb-4 text-3xl font-bold">Our vision</h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam..
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 8V72H72" stroke="black" strokeWidth="8" />
                  <path
                    d="M24 56L40 40L56 56L72 24"
                    stroke="black"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-3xl font-bold">Our mision</h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam..
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-100 py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative">
              <Image
                src="/testimonial/siti.png?height=400&width=500"
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
      <section className="relative w-full py-16 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg/mountain2.jpg?height=600&width=1600')" }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="container relative z-10 mx-auto px-4 py-24">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M32 16C36.4183 16 40 12.4183 40 8C40 3.58172 36.4183 0 32 0C27.5817 0 24 3.58172 24 8C24 12.4183 27.5817 16 32 16Z"
                    fill="white"
                  />
                  <path
                    d="M16 32C20.4183 32 24 28.4183 24 24C24 19.5817 20.4183 16 16 16C11.5817 16 8 19.5817 8 24C8 28.4183 11.5817 32 16 32Z"
                    fill="white"
                  />
                  <path
                    d="M48 32C52.4183 32 56 28.4183 56 24C56 19.5817 52.4183 16 48 16C43.5817 16 40 19.5817 40 24C40 28.4183 43.5817 32 48 32Z"
                    fill="white"
                  />
                  <path d="M8 48V40C8 35.6 11.6 32 16 32C20.4 32 24 35.6 24 40V48H8Z" fill="white" />
                  <path d="M40 48V40C40 35.6 43.6 32 48 32C52.4 32 56 35.6 56 40V48H40Z" fill="white" />
                  <path d="M24 48V40C24 35.6 27.6 32 32 32C36.4 32 40 35.6 40 40V48H24Z" fill="white" />
                  <path d="M8 56V64H56V56H8Z" fill="white" />
                </svg>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white">126</span>
                <span className="text-3xl font-bold text-white">+</span>
              </div>
              <p className="mt-2 text-lg text-white">Satisfied Client</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="20" r="16" stroke="white" strokeWidth="8" />
                  <path d="M8 60C8 46.7452 18.7452 36 32 36C45.2548 36 56 46.7452 56 60" stroke="white" strokeWidth="8" />
                </svg>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white">230</span>
                <span className="text-3xl font-bold text-white">+</span>
              </div>
              <p className="mt-2 text-lg text-white">New Traveller</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 8L48 40H16L32 8Z" stroke="white" strokeWidth="8" strokeLinejoin="round" />
                  <path d="M8 56H56" stroke="white" strokeWidth="8" />
                </svg>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white">230</span>
                <span className="text-3xl font-bold text-white">+</span>
              </div>
              <p className="mt-2 text-lg text-white">Destination</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="24" stroke="white" strokeWidth="8" />
                  <path d="M32 16V32L40 40" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white">230</span>
                <span className="text-3xl font-bold text-white">+</span>
              </div>
              <p className="mt-2 text-lg text-white">Award</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-center text-4xl font-bold text-gray-800">Gallery</h2>
          <p className="mb-12 text-center text-2xl font-medium">Unforgettable moment</p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-lg">
              <Image
                src="/gallery/bali-island.jpg?height=600&width=800"
                alt="Bali"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute bottom-8 left-8 text-4xl font-bold text-white">Bali</div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src="/gallery/dubai.png?height=400&width=800"
                  alt="Dubai"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute bottom-8 left-8 text-4xl font-bold text-white">Dubai</div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/gallery/paris.jpg?height=400&width=400"
                    alt="Paris"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 text-2xl font-bold text-white">Paris</div>
                </div>

                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/gallery/italy2.jpg?height=400&width=400"
                    alt="Italy"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 text-2xl font-bold text-white">Italy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

