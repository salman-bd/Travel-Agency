"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import db from "./db"
import bcryptjs from "bcryptjs"
import { Resend } from "resend"
import { BookingConfirmationEmail } from "@/emails/booking-confirmation"
import { ContactResponseEmail } from "@/emails/contact-response"
import { SubscriptionConfirmationEmail } from "@/emails/subscription-confirmation"
import { generateVerificationCode } from "./utils"
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail } from "./sendEmails"
import type { BlogFormValues } from "@/schemas/blog"
import { getCurrentUser } from "./auth"
import type { DestinationFormValues } from "@/schemas/destination"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ResgistrationData {
  name: string
  email: string
  password: string
  role: string
}

// Notification types
type NotificationType = "BOOKING" | "CONTACT" | "BLOG" | "SYSTEM"

interface NotificationData {
  userId: string
  type: NotificationType
  message: string
  link?: string
}

// Notification actions
export async function getNotifications() {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "ADMIN") {
      return []
    }

    // Fetch notifications from database
    const notifications = await db.notification.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    })

    return notifications
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return []
  }
}

export async function markNotificationAsRead(id: string) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "ADMIN") {
      return { success: false }
    }

    await db.notification.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        read: true,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error marking notification as read:", error)
    return { success: false }
  }
}

export async function markAllNotificationsAsRead() {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "ADMIN") {
      return { success: false }
    }

    await db.notification.updateMany({
      where: {
        userId: user.id,
        read: false,
      },
      data: {
        read: true,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error marking all notifications as read:", error)
    return { success: false }
  }
}

// Create notification helper function
export async function createNotification(data: NotificationData) {
  try {
    await db.notification.create({
      data: {
        ...data,
        read: false,
      },
    })
    return { success: true }
  } catch (error) {
    console.error("Error creating notification:", error)
    return { success: false }
  }
}

// User actions
export async function registerUser(data: ResgistrationData) {
  try {
    const { name, email, password, role } = data
  
    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } })
    const verificationCode = generateVerificationCode()
  
    if (existingUser) {
      if (existingUser.isVerified) {
        return { success: false, message: "User already exists with this email" }
      }
      const hashedPassword = await bcryptjs.hash(password, 10)
      const verificationExpires = new Date(Date.now() + 3600000) // 1 hour from now
      await db.user.update({
        where: {
          email: email,
        },
        data: {
          password: hashedPassword,
          verificationCode,
          verificationExpires,
          role,
        },
      })
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10)
      const verificationExpires = new Date(Date.now() + 3600000) // 1 hour from now
      // Create user
      await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          verificationCode,
          verificationExpires,
          role,
        },
      })
    }
    // Send verification email
    await sendVerificationEmail(email, name, verificationCode)
    return { success: true, message: "Account updated successfully!" }
  } catch (error) {
    console.error("Error creating user:", error)
    return { success: false }
  }
}

export async function verifyEmail(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const code = formData.get("code") as string
    // Find user with matching email and verification token
    const user = await db.user.findFirst({
      where: {
        email,
        verificationCode: code,
      },
    })
    if (!user) {
      return { error: "Invalid verification code" }
    }
    // Mark user as verified
    await db.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        emailVerified: new Date(),
        verificationCode: null,
      },
    })
    // Send welcome email
    await sendWelcomeEmail(email, user.name || "User")
    return { success: true }
  } catch (error) {
    console.error("Error veryfiing email:", error)
    return { success: false }
  }
}

export async function resendVerificationEmail(formData: FormData) {
  try {
    const email = formData.get("email") as string
    // Find user with matching email
    const user = await db.user.findUnique({
      where: { email },
    })
    if (!user) {
      return { error: "User not found" }
    }
    if (user.emailVerified) {
      return { error: "Email is already verified" }
    }
    // Generate new verification code
    const verificationCode = generateVerificationCode()
    // Update user with new verification code
    await db.user.update({
      where: { id: user.id },
      data: {
        verificationCode: verificationCode,
      },
    })
    // Send verification email
    await sendVerificationEmail(email, user.name || "User", verificationCode)
    return { success: true }
  } catch (error) {
    console.error("Error reseding verification email:", error)
    return { success: false }
  }
}

export async function forgotPassword(formData: FormData) {
  try {
    const email = formData.get("email") as string
    // Find user with matching email
    const user = await db.user.findUnique({
      where: { email },
    })
    if (!user) {
      // Don't reveal that the user doesn't exist
      return { success: true }
    }
    // Generate reset token
    const resetToken = crypto.randomUUID()
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now
    // Update user with reset token
    await db.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })
    // Send password reset email
    await sendPasswordResetEmail(email, user.name || "User", resetToken)
    return { success: true }
  } catch (error) {
    console.error("Error in forgot password:", error)
    return { success: false }
  }
}

export async function resetPassword(formData: FormData) {
  try {
    const token = formData.get("token") as string
    const password = formData.get("password") as string
    // Find user with matching reset token that hasn't expired
    const user = await db.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    })
    if (!user) {
      return { error: "Invalid or expired token" }
    }
    // Hash the new password
    const hashedPassword = await bcryptjs.hash(password, 10)
    // Update user with new password and clear reset token
    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    })
    return { success: true }
  } catch (error) {
    console.error("Error resetting password:", error)
    return { success: false }
  }
}

// Blog actions
export async function createBlog(data: BlogFormValues) {
  try {
    const { title, content, excerpt, imageUrl, category, published } = data
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, message: "Unauthorized" }
    }
    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
    const blog = await db.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        imageUrl,
        category,
        authorId: user.id,
        published,
      },
    })
    // Create notification for admin users
    const admins = await db.user.findMany({
      where: {
        role: "ADMIN",
      },
    })
    for (const admin of admins) {
      await createNotification({
        userId: admin.id,
        type: "BLOG",
        message: published ? `New blog published: ${title}` : `New blog draft created: ${title}`,
        link: `/admin/blogs/${blog.id}`,
      })
    }
    revalidatePath("/admin/blogs")
    return { success: true, message: "Blog created successfully!" }
  } catch (error) {
    console.error("Error creating blog:", error)
    return { success: false, message: "Blog creation failed!" }
  }
}

export async function updateBlog(id: string, data: BlogFormValues) {
  try {
    const { title, content, excerpt, imageUrl, category, published } = data
    const user = await getCurrentUser()

    if (!user) {
      return { success: false, message: "Unauthorized" }
    }
    // Get the blog before update to check if published status changed
    const previousBlog = await db.blog.findUnique({
      where: { id },
    })
    const updatedBlog = await db.blog.update({
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
    // Create notification if blog was published
    if (!previousBlog?.published && published) {
      const admins = await db.user.findMany({
        where: {
          role: "ADMIN",
        },
      })
      for (const admin of admins) {
        await createNotification({
          userId: admin.id,
          type: "BLOG",
          message: `Blog published: ${title}`,
          link: `/admin/blogs/${id}`,
        })
      }
    }
    revalidatePath("/admin/blogs")
    return { success: true, message: "Blog updated successfully!" }
  } catch (error) {
    console.error("Error updating blog:", error)
    return { success: false, message: "Blog update failed!" }
  }
}

export async function deleteBlog(id: string) {
  await db.blog.delete({ where: { id } })
  revalidatePath("/admin/blogs")
}

export async function getBlogs() {
  const blogs = await db.blog.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })
  return blogs
}

// Destination actions
export async function createDestination(data: DestinationFormValues) {
  try {
    const { name, country, description, price, category, imageUrl, featured } = data
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, message: "Unauthorized" }
    }
    const destination = await db.destination.create({
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
    // Create notification for admin users
    const admins = await db.user.findMany({
      where: {
        role: "ADMIN",
      },
    })
    for (const admin of admins) {
      await createNotification({
        userId: admin.id,
        type: "SYSTEM",
        message: `New destination added: ${name}, ${country}`,
        link: `/admin/destinations/${destination.id}`,
      })
    }
    revalidatePath("/admin/destinations")
    return { success: true }
  } catch (error) {
    console.error("Error creating destination:", error)
    return { success: false }
  }
}

export async function updateDestination(id: string, data: DestinationFormValues) {
  try {
    const { name, country, description, price, category, imageUrl, featured } = data
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
    return { success: true }
  } catch (error) {
    console.error("Error updating destination:", error)
    return { success: false }
  }
}

export async function deleteDestination(id: string) {
  try {
    await db.destination.delete({
      where: {
        id,
      },
    })
    revalidatePath("/admin/destinations")
    return { success: true }
  } catch (error) {
    console.error("Error delete destination:", error)
    return { success: false }
  }
}

export async function getDestinations() {
  const destinations = await db.destination.findMany()
  return destinations
}

// Package actions
export async function createPackage(formData: FormData) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, message: "Unauthorized" }
    }
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
    // Create notification for admin users
    const admins = await db.user.findMany({
      where: {
        role: "ADMIN",
      },
    })
    for (const admin of admins) {
      await createNotification({
        userId: admin.id,
        type: "SYSTEM",
        message: `New package created: ${title}`,
        link: `/admin/packages/${newPackage.id}`,
      })
    }
    revalidatePath("/admin/packages")
    return { success: true }
  } catch (error) {
    console.error("Error creating packeage:", error)
    return { success: false }
  }
}

export async function updatePackage(formData: FormData) {
  try {
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
    return { success: true, message: "Package updated successfully!" }
  } catch (error) {
    console.error("Error updating package:", error)
    return { success: false }
  }
}

export async function deletePackage(id: string) {
  try {
    await db.package.delete({
      where: {
        id,
      },
    })
    revalidatePath("/admin/packages")
  } catch (error) {
    console.error("Error deleting package:", error)
    return { success: false }
  }
}

export async function getPackages() {
  const packages = await db.package.findMany()
  const processedPackages = await Promise.all(
    packages.map(async (pkg) => {
      const destination = await db.destination.findUnique({ where: { id: pkg.destinationId }, select: { name: true } })

      const packageData = {
        id: pkg.id,
        title: pkg.title,
        description: pkg.description,
        price: pkg.price,
        duration: pkg.duration,
        destinationId: pkg.destinationId,
        inclusions: pkg.inclusions,
        exclusions: pkg.exclusions,
        imageUrl: pkg.imageUrl,
        destination: destination, // Including the resolved destination
      }
      return packageData
    }),
  )

  return processedPackages
}

export async function getPackageById(id: string) {
  try {
    const pkg = await db.package.findUnique({
      where: {
        id,
      },
      include: {
        itinerary: {
          orderBy: {
            day: "asc",
          },
        },
      },
    })
    return pkg
  } catch (error) {
    console.error("Error fetching package:", error)
    throw new Error("Failed to fetch package")
  }
}

// Booking actions
export async function createBooking(formData: FormData) {
  try {
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
        from: "Treveller World <bookings@cscsylhet.com>",
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
    // Create notification for admin users
    const admins = await db.user.findMany({
      where: {
        role: "ADMIN",
      },
    })
    for (const admin of admins) {
      await createNotification({
        userId: admin.id,
        type: "BOOKING",
        message: `New booking: ${packageDetails.title} by ${user?.name || contactEmail}`,
        link: `/admin/bookings/${booking.id}`,
      })
    }
    revalidatePath("/bookings")
    redirect(`/bookings/${booking.id}/confirmation`)
  } catch (error) {
    console.error("Error creating booking:", error)
    return { success: false }
  }
}

export async function updateBookingStatus(bookingId: string, status: string) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }
    const updatedBooking = await db.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: status as any,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        package: {
          select: {
            title: true,
          },
        },
      },
    })
    // Create notification
    await createNotification({
      userId: user.id,
      type: "BOOKING",
      message: `Booking for ${updatedBooking.package.title} by ${updatedBooking.user.name} has been ${status.toLowerCase()}`,
      link: `/admin/bookings/${bookingId}`,
    })
    revalidatePath("/admin/bookings")
    return { success: true, booking: updatedBooking }
  } catch (error) {
    console.error("Error updating booking status:", error)
    return { error: "Failed to update booking status" }
  }
}

export async function getBookings() {
  const bookings = await db.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      package: {
        select: {
          title: true,
          destination: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })
  return bookings
}

// Contact actions
export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    // Save contact message
    const contact = await db.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    })
    // Create notification for admin users
    const admins = await db.user.findMany({
      where: {
        role: "ADMIN",
      },
    })
    for (const admin of admins) {
      await createNotification({
        userId: admin.id,
        type: "CONTACT",
        message: `New contact message from ${name}: ${subject}`,
        link: `/admin/contacts/${contact.id}`,
      })
    }
    // Send auto-response email
    await resend.emails.send({
      from: "Traveller World <contact@cscsylhet.com>",
      to: [email],
      subject: "We've received your message",
      react: ContactResponseEmail({
        customerName: name,
        message,
      }),
    })
    revalidatePath("/contact")
    return { success: true, message: "Contact message sent successfully!" }
  } catch (error) {
    console.error("Error submit contact form:", error)
    return { success: false }
  }
}

export async function respondToContact(id: string) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }
  const contact = await db.contact.update({
    where: {
      id,
    },
    data: {
      responded: true,
    },
  })
  // Create notification
  await createNotification({
    userId: user.id,
    type: "CONTACT",
    message: `You responded to contact from ${contact.name}`,
    link: `/admin/contacts/${id}`,
  })
  revalidatePath("/admin/contacts")
  return { success: true }
}

// Add this function to fetch all contacts
export async function getContacts() {
  try {
    const contacts = await db.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return contacts
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return []
  }
}

// Add this function to fetch a single contact by ID
export async function getContactById(id: string) {
  try {
    const contact = await db.contact.findUnique({
      where: {
        id,
      },
    })

    return contact
  } catch (error) {
    console.error("Error fetching contact:", error)
    return null
  }
}

// Subscriber actions
export async function addSubscriber(formData: FormData) {
  try {
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
    // Create notification for admin users
    const admins = await db.user.findMany({
      where: {
        role: "ADMIN",
      },
    })
    for (const admin of admins) {
      await createNotification({
        userId: admin.id,
        type: "SYSTEM",
        message: `New newsletter subscriber: ${email}`,
      })
    }
    // Send confirmation email
    await resend.emails.send({
      from: "Traveller World newsletter@cscsylhet.com>",
      to: [email],
      subject: "Welcome to Traveller World Newsletter",
      react: SubscriptionConfirmationEmail({
        email,
      }),
    })
    revalidatePath("/")
    return { success: true, message: "Successfully subscribed" }
  } catch (error) {
    console.error("Error add subscriber:", error)
    return { success: false }
  }
}

// Mock data for notifications (for development/testing)
export async function getMockNotifications() {
  return [
    {
      id: "1",
      type: "BOOKING",
      message: "New booking: Paris Adventure Tour by John Doe",
      link: "/admin/dashboard/bookings/1",
      createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
    },
    {
      id: "2",
      type: "CONTACT",
      message: "New contact message from Sarah Smith: Tour Inquiry",
      link: "/admin/dashboard/contacts/2",
      createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
    },
    {
      id: "3",
      type: "BLOG",
      message: "New blog published: Top 10 Destinations for 2025",
      link: "/admin/dashboard/blogs/3",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
    },
    {
      id: "4",
      type: "SYSTEM",
      message: "System maintenance scheduled for tomorrow at 2:00 AM",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
    },
    {
      id: "5",
      type: "BOOKING",
      message: "Booking #1234 has been confirmed",
      link: "/admin/dashboard/bookings/1234",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
      read: true,
    },
  ]
}

