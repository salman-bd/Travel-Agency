"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Map, Package, CalendarClock, MessageSquare, FileText, LogOut, Compass } from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
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

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-white border-r shadow-sm">
      <div className="flex h-16 items-center px-6 border-b">
        <Link href="/admin" className="flex items-center gap-2 font-bold">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[#069aba]">
            <Compass className="h-5 w-5 absolute inset-0 m-auto text-white" />
          </div>
          <span className="text-lg text-[#069aba]">REBEL ROVER</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-6 px-4">
        <nav className="space-y-1">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition-all",
                pathname === item.href ? "bg-[#069aba] text-white shadow-md" : "text-gray-700 hover:bg-[#069aba]/10",
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-700 hover:bg-[#069aba]/10 hover:text-[#069aba]"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  )
}

