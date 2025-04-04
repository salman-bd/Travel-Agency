import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, DollarSign, Star, Trophy, Users2 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative top-0 h-[600px] w-full bg-[url('/bg/suitcase-travel.jpg?height=600&width=1200')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-start justify-center px-4 text-white pb-8">  
          <h1 className="mb-2 max-w-md text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">  
            Make in your journey  
          </h1>  
          <p>Explore the world with what you love beautiful natural beauty.</p>  
          <div className="mt-6 flex gap-4">  
            <Link  
              href="/destinations"  
              className="rounded-full bg-black px-6 py-4 text-sm font-medium text-white hover:bg-black/90 opacity-80"  
            >  
              Explore Now  
            </Link>  
          </div>  
          <p className="absolute bottom-2">Popular Place : Bali, Istanbul, Rome, Paris.</p>  
        </div>  
      </section>

      {/* Explore Section */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-4">
            <h2 className="text-center text-4xl md:text-5xl font-bold">Explore new worlds with exotic natural scenery</h2>
            <p className="text-center text-xl">Explore the world with what you love beautiful natural beauty.</p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="group overflow-hidden rounded-lg">
                <Image
                  src="/bali.jpg?height=300&width=400"
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
                  src="/paris.jpg?height=300&width=400"
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
                  src="/greece.jpg?height=300&width=400"
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
      <section className="relative w-full bg-[url('/bg/travel.png?height=600&width=1200')] bg-cover bg-center py-16">
        <div className="absolute inset-0 "></div>
        <div className="container relative z-10 mx-auto px-4">
          <h2 className="mb-4 text-center text-4xl md:text-5xl font-bold text-white">Why choose Us?</h2>
          <p className="mb-12 text-center text-xl text-white">our services have been trusted by world travelers.</p>

          <div className="relative mx-auto max-w-6xl">
            {/* Navigation Arrows */}
            <button className="absolute -left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
              <ArrowRight className="h-6 w-6 rotate-180" />
            </button>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white p-8 shadow-lg">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-md bg-black">
                    <Users2 className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="mb-4 text-center text-2xl font-bold">Best Service</h3>
                <p className="mb-6 text-center text-gray-600">
                  our service is reliable and convenient, our service is quality.
                </p>
                <div className="text-center">
                  <Link href="#" className="inline-flex items-center font-semibold">
                    Leaern more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-lg">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-md bg-black">
                    <DollarSign className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="mb-4 text-center text-2xl font-bold">Price Guarantee</h3>
                <p className="mb-6 text-center text-gray-600">
                  our service is reliable and convenient, our service is quality.
                </p>
                <div className="text-center">
                  <Link href="#" className="inline-flex items-center font-semibold">
                    Leaern more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-lg">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-md bg-black">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="mb-4 text-center text-2xl font-bold">Handpicked Hotels</h3>
                <p className="mb-6 text-center text-gray-600">
                  our service is reliable and convenient, our service is quality.
                </p>
                <div className="text-center">
                  <Link href="#" className="inline-flex items-center font-semibold">
                    Leaern more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <button className="absolute -right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Our Tour Partners */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-4xl md:text-5xl font-bold">Our tour partner</h2>
          <p className="mb-12 text-center text-gray-600">
            We collaborate with the best in the industry to provide you with exceptional service.  We collaborate with the best in the industry to provide you with exceptional service
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="grayscale transition-all hover:grayscale-0">
              <Image src="/katana.png?height=50&width=120" alt="Partner logo" width={120} height={50} />
            </div>
            <div className="grayscale transition-all hover:grayscale-0">
              <Image src="/travava.png?height=50&width=120" alt="Partner logo" width={120} height={50} />
            </div>
            <div className="grayscale transition-all hover:grayscale-0">
              <Image src="/bigui.png?height=50&width=120" alt="Partner logo" width={120} height={50} />
            </div>
            <div className="grayscale transition-all hover:grayscale-0">
              <Image src="/booking.com.png?height=50&width=120" alt="Partner logo" width={120} height={50} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}  
      <section className="bg-gray-100 py- md:py-24">  
        <div className="container mx-auto px-4">  
          <h2 className="mb-4 text-center text-4xl md:text-5xl font-bold text-gray-800">What Our Clients Say</h2>  
          <p className="mb-12 text-center text-lg text-gray-600">  
            Hear from our satisfied customers about their experiences with us  
          </p>  

          <div className="relative">  
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">  
              {/* Testimonial 1 */}  
              <div className="rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">  
                <div className="mb-4 flex items-center gap-4">  
                  <Image  
                    src="/testimonial/client1.png"  
                    alt="Sara Jay"  
                    width={60}  
                    height={60}  
                    className="rounded-full border-2 border-gray-300"  
                  />  
                  <div>  
                    <h3 className="font-semibold text-xl text-gray-800">Abu Saeed</h3>  
                    <div className="flex mt-1 mb-2">  
                      {[...Array(5)].map((_, i) => (  
                        <Star key={i} className="h-4 w-4 fill-secondary text-yellow-500" />  
                      ))}  
                    </div>  
                  </div>  
                </div>  
                <p className="text-sm text-gray-700 italic">  
                  "The trip was amazing! Everything was well-organized, and the guides were knowledgeable and friendly."  
                </p>  
              </div>  

              {/* Testimonial 2 */}  
              <div className="rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">  
                <div className="mb-4 flex items-center gap-4">  
                  <Image  
                    src="/testimonial/client2.png"  
                    alt="Cristian Daniel"  
                    width={60}  
                    height={60}  
                    className="rounded-full border-2 border-gray-300"  
                  />  
                  <div>  
                    <h3 className="font-semibold text-xl text-gray-800">Cristian Daniel</h3>  
                    <div className="flex mt-1 mb-2">  
                      {[...Array(5)].map((_, i) => (  
                        <Star key={i} className="h-4 w-4 fill-secondary text-yellow-500" />  
                      ))}  
                    </div>  
                  </div>  
                </div>  
                <p className="text-sm text-gray-700 italic">  
                  "An unforgettable experience! The team made sure we had the best time while exploring."  
                </p>  
              </div>  

              {/* Testimonial 3 */}  
              <div className="rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">  
                <div className="mb-4 flex items-center gap-4">  
                  <Image  
                    src="/testimonial/client3.png"  
                    alt="Kausar Hasan"  
                    width={60}  
                    height={60}  
                    className="rounded-full border-2 border-gray-300"  
                  />  
                  <div>  
                    <h3 className="font-semibold text-xl text-gray-800">Kausar Hasan</h3>  
                    <div className="flex mt-1 mb-2">  
                      {[...Array(5)].map((_, i) => (  
                        <Star key={i} className="h-4 w-4 fill-secondary text-yellow-500" />  
                      ))}  
                    </div>  
                  </div>  
                </div>  
                <p className="text-sm text-gray-700 italic">  
                  "Excellent service and an incredible journey. I'll definitely return for more adventures."  
                </p>  
              </div>  
            </div>  
            <button className="absolute -left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-200 transition">  
              <ChevronLeft className="h-5 w-5 text-gray-600" />  
            </button>  
            <button className="absolute -right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-200 transition">  
              <ChevronRight className="h-5 w-5 text-gray-600" />  
            </button>  
          </div>  
        </div>  
      </section>  

    </div>
  )
}

