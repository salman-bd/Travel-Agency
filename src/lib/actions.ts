"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "./db"
import { hash } from "bcrypt"
import { Resend } from "resend"
import { BookingConfirmationEmail } from "@/components/emails/booking-confirmation"
import { ContactResponseEmail } from "@/components/emails/contact-response"
import { SubscriptionConfirmationEmail } from "@/components/emails/subscription-confirmation"

const resend = new Resend(process.env.RESEND_API_KEY)

// User actions
export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    return { error: "User already exists" }
  }

  // Hash password
  const hashedPassword = await hash(password, 10)

  // Create user
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  revalidatePath("/login")
  redirect("/login")
}

// Blog actions
export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const imageUrl = formData.get("imageUrl") as string
  const category = formData.get("category") as string
  const authorId = formData.get("authorId") as string
  const published = formData.get("published") === "true"

  // Create slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")

  await db.blog.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      imageUrl,
      category,
      authorId,
      published,
    },
  })

  revalidatePath("/admin/blogs")
  redirect("/admin/blogs")
}

export async function updateBlog(formData: FormData) {
  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const imageUrl = formData.get("imageUrl") as string
  const category = formData.get("category") as string
  const published = formData.get("published") === "true"

  await db.blog.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      excerpt,
      imageUrl,
      category,
      published,
    },
  })

  revalidatePath("/admin/blogs")
  redirect("/admin/blogs")
}

export async function deleteBlog(id: string) {
  await db.blog.delete({
    where: {
      id,
    },
  })

  revalidatePath("/admin/blogs")
}

// Destination actions
export async function createDestination(formData: FormData) {
  const name = formData.get("name") as string
  const country = formData.get("country") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const category = formData.get("category") as string
  const imageUrl = formData.get("imageUrl") as string
  const featured = formData.get("featured") === "true"

  await db.destination.create({
    data: {
      name,
      country,
      description,
      price,
      category,
      imageUrl,
      featured,
    },
  })

  revalidatePath("/admin/destinations")
  redirect("/admin/destinations")
}

export async function updateDestination(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const country = formData.get("country") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const category = formData.get("category") as string
  const imageUrl = formData.get("imageUrl") as string
  const featured = formData.get("featured") === "true"

  await db.destination.update({
    where: {
      id,
    },
    data: {
      name,
      country,
      description,
      price,
      category,
      imageUrl,
      featured,
    },
  })

  revalidatePath("/admin/destinations")
  redirect("/admin/destinations")
}

export async function deleteDestination(id: string) {
  await db.destination.delete({
    where: {
      id,
    },
  })

  revalidatePath("/admin/destinations")
}

// Package actions
export async function createPackage(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const duration = Number.parseInt(formData.get("duration") as string)
  const destinationId = formData.get("destinationId") as string
  const imageUrl = formData.get("imageUrl") as string
  const inclusions = (formData.get("inclusions") as string).split(",")
  const exclusions = (formData.get("exclusions") as string).split(",")

  // Create package
  const newPackage = await db.package.create({
    data: {
      title,
      description,
      price,
      duration,
      destinationId,
      imageUrl,
      inclusions,
      exclusions,
    },
  })

  // Create itinerary items
  const itineraryCount = Number.parseInt(formData.get("itineraryCount") as string)

  for (let i = 1; i <= itineraryCount; i++) {
    const day = i
    const itineraryTitle = formData.get(`itinerary-${i}-title`) as string
    const itineraryDescription = formData.get(`itinerary-${i}-description`) as string

    await db.itinerary.create({
      data: {
        day,
        title: itineraryTitle,
        description: itineraryDescription,
        packageId: newPackage.id,
      },
    })
  }

  revalidatePath("/admin/packages")
  redirect("/admin/packages")
}

export async function updatePackage(formData: FormData) {
  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const duration = Number.parseInt(formData.get("duration") as string)
  const destinationId = formData.get("destinationId") as string
  const imageUrl = formData.get("imageUrl") as string
  const inclusions = (formData.get("inclusions") as string).split(",")
  const exclusions = (formData.get("exclusions") as string).split(",")

  // Update package
  await db.package.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      price,
      duration,
      destinationId,
      imageUrl,
      inclusions,
      exclusions,
    },
  })

  // Delete existing itinerary items
  await db.itinerary.deleteMany({
    where: {
      packageId: id,
    },
  })

  // Create new itinerary items
  const itineraryCount = Number.parseInt(formData.get("itineraryCount") as string)

  for (let i = 1; i <= itineraryCount; i++) {
    const day = i
    const itineraryTitle = formData.get(`itinerary-${i}-title`) as string
    const itineraryDescription = formData.get(`itinerary-${i}-description`) as string

    await db.itinerary.create({
      data: {
        day,
        title: itineraryTitle,
        description: itineraryDescription,
        packageId: id,
      },
    })
  }

  revalidatePath("/admin/packages")
  redirect("/admin/packages")
}

export async function deletePackage(id: string) {
  await db.package.delete({
    where: {
      id,
    },
  })

  revalidatePath("/admin/packages")
}

// Booking actions
export async function createBooking(formData: FormData) {
  const userId = formData.get("userId") as string
  const packageId = formData.get("packageId") as string
  const startDate = new Date(formData.get("startDate") as string)
  const adults = Number.parseInt(formData.get("adults") as string)
  const children = Number.parseInt((formData.get("children") as string) || "0")
  const contactEmail = formData.get("contactEmail") as string
  const contactPhone = formData.get("contactPhone") as string

  // Get package details
  const packageDetails = await db.package.findUnique({
    where: {
      id: packageId,
    },
    include: {
      destination: true,
    },
  })

  if (!packageDetails) {
    return { error: "Package not found" }
  }

  // Calculate end date based on package duration
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + packageDetails.duration)

  // Calculate total price
  const totalPrice = packageDetails.price * adults + packageDetails.price * 0.5 * children

  // Create booking
  const booking = await db.booking.create({
    data: {
      userId,
      packageId,
      startDate,
      endDate,
      totalPrice,
      adults,
      children,
      contactEmail,
      contactPhone,
    },
  })

  // Get user details
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (user && user.email) {
    // Send confirmation email
    await resend.emails.send({
      from: "Rebel Rover <bookings@rebelrover.com>",
      to: [user.email],
      subject: "Your Booking Confirmation",
      react: BookingConfirmationEmail({
        customerName: user.name || "Traveler",
        bookingId: booking.id,
        packageName: packageDetails.title,
        destination: packageDetails.destination.name,
        startDate: startDate.toLocaleDateString(),
        endDate: endDate.toLocaleDateString(),
        totalPrice: totalPrice.toFixed(2),
        adults,
        children,
      }),
    })
  }

  revalidatePath("/bookings")
  redirect(`/bookings/${booking.id}/confirmation`)
}

export async function updateBookingStatus(id: string, status: string) {
  await db.booking.update({
    where: {
      id,
    },
    data: {
      status: status as any,
    },
  })

  revalidatePath("/admin/bookings")
}

// Contact actions
export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Save contact message
  await db.contact.create({
    data: {
      name,
      email,
      subject,
      message,
    },
  })

  // Send auto-response email
  await resend.emails.send({
    from: "Rebel Rover <contact@rebelrover.com>",
    to: [email],
    subject: "We've received your message",
    react: ContactResponseEmail({
      customerName: name,
      message,
    }),
  })

  revalidatePath("/contact")
  redirect("/contact/thank-you")
}

export async function respondToContact(id: string) {
  await db.contact.update({
    where: {
      id,
    },
    data: {
      responded: true,
    },
  })

  revalidatePath("/admin/contacts")
}

// Subscriber actions
export async function addSubscriber(formData: FormData) {
  const email = formData.get("email") as string

  // Check if already subscribed
  const existingSubscriber = await db.subscriber.findUnique({
    where: {
      email,
    },
  })

  if (existingSubscriber) {
    return { error: "Email already subscribed" }
  }

  // Add subscriber
  await db.subscriber.create({
    data: {
      email,
    },
  })

  // Send confirmation email
  await resend.emails.send({
    from: "Rebel Rover <newsletter@rebelrover.com>",
    to: [email],
    subject: "Welcome to Rebel Rover Newsletter",
    react: SubscriptionConfirmationEmail({
      email,
    }),
  })

  revalidatePath("/")
  return { success: "Successfully subscribed" }
}

