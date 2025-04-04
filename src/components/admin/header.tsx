"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  X,
  LayoutDashboard,
  Map,
  Package,
  CalendarClock,
  MessageSquare,
  FileText,
  LogOut,
  User,
  Compass,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Notifications from "./notifications"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Destinations",
    href: "/admin/destinations",
    icon: <Map className="h-5 w-5" />,
  },
  {
    title: "Packages",
    href: "/admin/packages",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    icon: <CalendarClock className="h-5 w-5" />,
  },
  {
    title: "Contacts",
    href: "/admin/contacts",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Blogs",
    href: "/admin/blogs",
    icon: <FileText className="h-5 w-5" />,
  },
]

export default function AdminHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center bg-white px-4 shadow-sm md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 border-r-0 z-50">
            <div className="flex h-16 items-center px-6 bg-white border-b">
              <Link href="/admin" className="flex items-center gap-2 font-bold" onClick={() => setOpen(false)}>
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[#069aba]">
                  <Compass className="h-5 w-5 absolute inset-0 m-auto text-white" />
                </div>
                <span className="text-lg text-[#069aba]">REBEL ROVER</span>
              </Link>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <nav className="grid gap-1 p-4 bg-white h-full">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 transition-all",
                    pathname === item.href
                      ? "bg-[#069aba] text-white shadow-md"
                      : "text-gray-700 hover:bg-[#069aba]/10",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
              <Button
                variant="ghost"
                className="mt-4 justify-start gap-3 text-gray-700 hover:bg-[#069aba]/10"
                onClick={() => {
                  setOpen(false)
                  signOut({ callbackUrl: "/" })
                }}
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/admin" className="flex items-center gap-2 font-bold md:hidden">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[#069aba]">
            <Compass className="h-5 w-5 absolute inset-0 m-auto text-white" />
          </div>
          <span className="text-[#069aba]">TREVELLER WORLD</span>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Notifications />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-[#069aba] text-white">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

