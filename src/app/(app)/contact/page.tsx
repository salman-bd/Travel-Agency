"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Phone, MapPin } from "lucide-react"
import { submitContactForm } from "@/lib/actions"
import { contactSchema, type ContactFormValues } from "@/schemas/contact"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("subject", data.subject)
      formData.append("message", data.message)

      const response = await submitContactForm(formData)
      if (response.success) {
        toast.success("Message sent!", {
          description: "We've received your message and will get back to you soon.",
          className: "bg-green-50 border-green-200 text-green-800",
        })
      }
      form.reset()
    } catch (error) {
      toast.error("Error", {
        description: "There was a problem sending your message. Please try again.",
        className: "bg-red-50 border-red-200 text-red-800",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full bg-[url('/bg/call-center2.jpg?height=500&width=1200')] bg-cover bg-center">
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            className="rounded-md border border-gray-300 p-4 focus:border-gray-500 focus:outline-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="name@example.com"
                            className="rounded-md border border-gray-300 p-4 focus:border-gray-500 focus:outline-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="How can we help you?"
                            className="rounded-md border border-gray-300 p-4 focus:border-gray-500 focus:outline-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide details about your inquiry..."
                            rows={5}
                            className="rounded-md border border-gray-300 p-4 focus:border-gray-500 focus:outline-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full rounded-full bg-black px-8 py-4 text-lg font-medium text-white hover:bg-black/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
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
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+62 6943 6956</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>contact@domain.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Jl. Darussalam Hagu selatan</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Lhoksemawe, Aceh</h3>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+62 6943 6956</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>contact@domain.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Jl. Darussalam Hagu selatan</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Lhoksemawe, Aceh</h3>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+62 6943 6956</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>contact@domain.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Jl. Darussalam Hagu selatan</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Lhoksemawe, Aceh</h3>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+62 6943 6956</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>contact@domain.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
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

