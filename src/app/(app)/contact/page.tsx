import { submitContactForm } from "@/lib/actions"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full bg-[url('/placeholder.svg?height=500&width=1200')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">Contact</h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center text-2xl font-bold">Get in Touch</h2>
            <p className="mb-12 text-center text-gray-600">
              We'd love to hear from you. Please fill out the form below or contact us directly using the information
              provided.
            </p>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <form action={submitContactForm} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-1 block text-sm font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                  >
                    Send Message <Mail className="ml-2 h-4 w-4" />
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="rounded-lg bg-gray-100 p-6">
                  <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Our Location</p>
                        <p className="text-sm text-gray-600">123 Travel Street, City, Country</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Email Address</p>
                        <p className="text-sm text-gray-600">info@rebelrover.com</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Phone Number</p>
                        <p className="text-sm text-gray-600">+1 (123) 456-7890</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-gray-100 p-6">
                  <h3 className="mb-4 text-lg font-semibold">Business Hours</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <span className="text-sm">Monday - Friday:</span>
                      <span className="text-sm font-medium">9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">Saturday:</span>
                      <span className="text-sm font-medium">10:00 AM - 4:00 PM</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm">Sunday:</span>
                      <span className="text-sm font-medium">Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="h-[400px] w-full overflow-hidden rounded-lg bg-gray-200">
            <div className="h-full w-full bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center"></div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-lg bg-[url('/placeholder.svg?height=300&width=1200')] bg-cover bg-center py-12 text-center text-white">
            <h3 className="mb-4 text-2xl font-bold">Subscribe to get special price</h3>
            <form className="mx-auto flex max-w-md flex-col items-center justify-center gap-2 sm:flex-row">
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                className="w-full rounded-full border border-white bg-transparent px-4 py-2 text-white placeholder:text-white/70 focus:outline-none sm:flex-1"
                required
              />
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-2 text-sm font-medium text-primary hover:bg-gray-100"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

