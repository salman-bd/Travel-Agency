import { submitContactForm } from "@/lib/actions"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full bg-[url('/bg/call-center2.jpg?height=500&width=1200')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">Contact</h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full rounded-md border border-gray-300 p-4 focus:border-gray-500 focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full rounded-md border border-gray-300 p-4 focus:border-gray-500 focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full rounded-md border border-gray-300 p-4 focus:border-gray-500 focus:outline-none"
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    className="w-full rounded-md border border-gray-300 p-4 focus:border-gray-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-black px-8 py-4 text-lg font-medium text-white hover:bg-black/90"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="mb-6 text-4xl font-bold">Get In Touch</h2>
              <p className="mb-8 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Lhoksemawe, Aceh</h3>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5" />
                    <span>+62 6943 6956</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5" />
                    <span>contact@domain.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5" />
                    <span>Jl. Darussalam Hagu selatan</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Lhoksemawe, Aceh</h3>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5" />
                    <span>+62 6943 6956</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5" />
                    <span>contact@domain.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5" />
                    <span>Jl. Darussalam Hagu selatan</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Lhoksemawe, Aceh</h3>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5" />
                    <span>+62 6943 6956</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5" />
                    <span>contact@domain.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5" />
                    <span>Jl. Darussalam Hagu selatan</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Lhoksemawe, Aceh</h3>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5" />
                    <span>+62 6943 6956</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5" />
                    <span>contact@domain.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5" />
                    <span>Jl. Darussalam Hagu selatan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 md:py-32">
        <div className="container mx-auto px-4">
          <div className="h-[400px] w-full overflow-hidden rounded-lg bg-gray-200">
            <div className="h-full w-full bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center"></div>
          </div>
        </div>
      </section>
    </div>
  )
}

