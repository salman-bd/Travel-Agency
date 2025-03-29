import type React from "react"
import type { Booking, Blog, Destination, Package, User, Role } from "@prisma/client"

export type SafeUser = Omit<User, "password"> & {
  role: Role
}

export type ExtendedPackage = Package & {
  destination: Destination
}

export type ExtendedBooking = Booking & {
  package: ExtendedPackage
  user: SafeUser
}

export type ExtendedBlog = Blog & {
  author: SafeUser
}

export type NavItem = {
  title: string
  href: string
  isAdmin?: boolean
}

export type SidebarNavItem = {
  title: string
  href: string
  icon?: React.ReactNode
}

