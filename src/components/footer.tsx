"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Lock, MapPin, Phone, Mail } from "lucide-react"
import { useSession } from "next-auth/react"
import { addSubscriber } from "@/lib/actions"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

const Footer = () => {
  const { data: session } = useSession()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("email", email)

      const result = await addSubscriber(formData)

      if (result.success) {
        toast({
          title: "Success!",
          description: "You have been subscribed to our newsletter.",
        })
        setEmail("")
      } else if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer>
      {/* Subscribe Section */}
      <div className="bg-[url('/bg/subscribe.png?height=400&width=1600')] bg-cover bg-center py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="mb-4 text-4xl font-bold">Subcribe to get special price</h3>
          <p className="mb-8 text-lg">
            Don't wanna miss something? subscribe right now and get special promotion and monthly newsletter
          </p>
          <form
            onSubmit={handleSubscribe}
            className="mx-auto flex max-w-md items-center justify-center overflow-hidden rounded-full bg-white"
          >
            <input
              type="email"
              placeholder="Type your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-none bg-transparent px-6 py-3 text-gray-800 outline-none"
              required
            />
            <button
              type="submit"
              className="rounded-full bg-black px-8 py-3 font-medium text-white hover:bg-gray-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-white py-12">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="mb-4 inline-block">
              <div className="flex items-center gap-2">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Rebel Rover Logo" width={48} height={48} />
                </div>
                <span className="text-2xl font-bold text-[#0a1e3c]">REBEL ROVER</span>
              </div>
            </Link>
            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra condimentum.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="mb-6 text-xl font-bold">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-gray-600" />
                <span>732 Despard St, Atlanta</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-600" />
                <span>+97 888 8888</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-600" />
                <span>info@traveller.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-xl font-bold">Quick Link</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-primary">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>

              {/* Admin Section - Keep this from the original */}
              {session?.user.role === "ADMIN" && (
                <>
                  <li>
                    <Link href="/admin" className="flex items-center gap-2 hover:text-primary">
                      <Lock className="h-3 w-3" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/dashboard/destinations" className="hover:text-primary">
                      Manage Destinations
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/dashboard/packages" className="hover:text-primary">
                      Manage Packages
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/dashboard/blogs" className="hover:text-primary">
                      Manage Blogs
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/dashboard/bookings" className="hover:text-primary">
                      Manage Bookings
                    </Link>
                  </li>
                </>
              )}
              {!session?.user.role && (
                <li>
                  <Link href="/admin" className="flex items-center gap-2 hover:text-primary">
                    <Lock className="h-3 w-3" />
                    <span>Admin Sign In</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="mb-6 text-xl font-bold">Follow Us</h4>
            <div className="flex gap-4">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black py-4 text-center text-white">
        <div className="container mx-auto px-4">
          <p>Copyright © All rights reserved (Website Developed & Managed by CREATIVECHROMA)</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

