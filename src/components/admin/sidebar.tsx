"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Map,
  Package,
  CalendarClock,
  Users,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
} from "lucide-react"
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
    title: "Users",
    href: "/admin/users",
    icon: <Users className="h-5 w-5" />,
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
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <span className="h-2 w-2 rounded-full bg-primary"></span>
          <span>REBEL ROVER ADMIN</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === item.href ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-100",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
          <Button
            variant="ghost"
            className="mt-4 flex items-center gap-3 justify-start px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-primary"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </nav>
      </div>
    </div>
  )
}

