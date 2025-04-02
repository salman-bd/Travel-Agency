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
import { BlogPost } from "@/types/blog"
import { BlogFormValues } from "@/schemas/blog"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ResgistrationData {
  name: string
  email: string
  password: string
  role: string
}

// User actions
export async function registerUser(data: ResgistrationData) {
  const { name, email, password, role } = data

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email }, })
    const verificationCode = generateVerificationCode()

    if (existingUser) {
      if (existingUser.isVerified) {  
        return { success: false, message: "User already exists with this email" } 
      }       
      const hashedPassword = await bcryptjs.hash(password, 10);  
      const verificationExpires = new Date(Date.now() + 3600000); // 1 hour from now  
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
      });
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

  return { success: true, message: "Account updated successfully!"}
}

export async function verifyEmail(formData: FormData) {
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
}

export async function resendVerificationEmail(formData: FormData) {
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
}

export async function forgotPassword(formData: FormData) {
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
}

export async function resetPassword(formData: FormData) {
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
  const hashedPassword = await hash(password, 10)

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
}

// Blog actions
export async function createBlog(data: BlogFormValues) {
  const { title, content, excerpt, imageUrl, category, published, } = data

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

  revalidatePath("/admin/dashboard/destinations")
  return { success: true }
}

export async function getDestinations() {
  const destinations = await db.destination.findMany()
  // console.log('Destinations: ', destinations);
  return destinations
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

  revalidatePath("/admin/dashboard/packages")
  redirect("/admin/dashboard/packages")
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

  revalidatePath("/admin/dashboard/packages")
  redirect("/admin/dashboard/packages")
  return { success: true, message: "Package updated successfully!"}
}

export async function deletePackage(id: string) {
  await db.package.delete({
    where: {
      id,
    },
  })

  revalidatePath("/admin/packages")
}

export async function getPackages() {  
  const packages = await db.package.findMany();  
  const processedPackages = await Promise.all(packages.map(async (pkg) => {  
    const destination = await db.destination.findUnique({ where: { id: pkg.destinationId }});  

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
      destination: destination // Including the resolved destination  
    };  
    return packageData;  
  }));  

  return processedPackages;  
}  

// Add to lib/actions.ts
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

