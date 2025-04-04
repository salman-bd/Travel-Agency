"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getNotifications, markNotificationAsRead } from "@/lib/actions"
import Link from "next/link"

export type Notification = {
  id: string
  type: "BOOKING" | "CONTACT" | "BLOG" | "SYSTEM"
  message: string
  link?: string
  createdAt: Date
  read: boolean
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const unreadCount = notifications.filter((n) => !n.read).length

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const data = await getNotifications()
      setNotifications(data)
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()

    // Poll for new notifications every minute
    const interval = setInterval(fetchNotifications, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id)
      setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "BOOKING":
        return "🗓️"
      case "CONTACT":
        return "✉️"
      case "BLOG":
        return "📝"
      case "SYSTEM":
        return "⚙️"
      default:
        return "📌"
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#069aba] p-0 text-xs text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-white">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Notifications</p>
            <p className="text-xs text-muted-foreground">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                : "No new notifications"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-auto">
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#069aba] border-t-transparent"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-6 text-center text-sm text-gray-500">No notifications yet</div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex cursor-pointer flex-col items-start gap-1 p-4 hover:bg-gray-50",
                  !notification.read && "bg-[#069aba]/5",
                )}
                onClick={() => {
                  if (!notification.read) {
                    handleMarkAsRead(notification.id)
                  }
                  if (notification.link) {
                    setIsOpen(false)
                  }
                }}
              >
                <div className="flex w-full items-start gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                    <span>{getNotificationIcon(notification.type)}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className={cn("text-sm", !notification.read && "font-medium")}>{notification.message}</p>
                    <p className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
                  </div>
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-[#069aba]"></div>}
                </div>
                {notification.link && (
                  <Link href={notification.link} className="ml-10 text-xs text-[#069aba] hover:underline">
                    View details
                  </Link>
                )}
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer justify-center text-sm font-medium text-[#069aba]"
          onClick={() => {
            // Mark all as read
            notifications.forEach((n) => {
              if (!n.read) handleMarkAsRead(n.id)
            })
          }}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

