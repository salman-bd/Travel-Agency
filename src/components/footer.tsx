"use client"

import type React from "react"

import Link from "next/link"
import { Facebook, Instagram, X, Youtube, Lock } from "lucide-react"
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
    <footer className="bg-white pt-12">
      <div className="container mx-auto px-4">
        <div className="subscribe-section mb-12 rounded-lg bg-[url('/placeholder.svg?height=300&width=1200')] bg-cover bg-center py-12 text-center text-white">
          <h3 className="mb-4 text-2xl font-bold">Subscribe to get special price</h3>
          <form
            onSubmit={handleSubscribe}
            className="mx-auto flex max-w-md flex-col items-center justify-center gap-2 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-white bg-transparent px-4 py-2 text-white placeholder:text-white/70 focus:outline-none sm:flex-1"
              required
            />
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-2 text-sm font-medium text-primary hover:bg-gray-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-4">
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase">Contact Information</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>123 Travel Street, City</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>info@rebelrover.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>Mon-Fri: 9am - 6pm</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase">Quick Link</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-primary">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/travel-stories" className="hover:text-primary">
                  Travel Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase">Follow Us</h4>
            <div className="flex gap-4">
              <Link
                href="#"
                className="rounded-full border border-gray-200 p-2 hover:border-primary hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="rounded-full border border-gray-200 p-2 hover:border-primary hover:text-primary"
              >
                <X className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="rounded-full border border-gray-200 p-2 hover:border-primary hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="rounded-full border border-gray-200 p-2 hover:border-primary hover:text-primary"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase">Admin</h4>
            <ul className="space-y-2 text-sm">
              {session?.user.role === "ADMIN" ? (
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
              ) : (
                <li>
                  <Link href="/admin" className="flex items-center gap-2 hover:text-primary">
                    <Lock className="h-3 w-3" />
                    <span>Admin Sign In</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
          <p>Copyright © {new Date().getFullYear()} Rebel Rover. All rights reserved. Designed by Rebel Rover Team</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

