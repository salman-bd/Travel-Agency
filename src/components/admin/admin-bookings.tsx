"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Calendar, User, MapPin } from "lucide-react"
import { updateBookingStatus } from "@/lib/actions"
import type { Booking } from "@/types/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminBookingProps {
  bookings: Booking[]
}

export default function AdminBookingsPage({ bookings }: AdminBookingProps) {
  const handleStatusUpdate = async (bookingId: string, status: string) => {
    try {
      await updateBookingStatus(bookingId, status)
    } catch (error) {
      console.error("Failed to update booking status:", error)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-500 mt-1 md:mt-0">Manage customer bookings</p>
      </div>

      {bookings.length === 0 ? (
        <Card className="border-none shadow-md">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <Calendar className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-center text-gray-500 text-lg">No bookings yet</p>
            <p className="text-center text-gray-400 text-sm mt-1">When customers make bookings, they'll appear here</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-white pb-0">
            <CardTitle className="text-xl font-bold text-gray-900">All Bookings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-medium">Booking ID</TableHead>
                    <TableHead className="font-medium">Customer</TableHead>
                    <TableHead className="font-medium">Package</TableHead>
                    <TableHead className="font-medium">Travel Dates</TableHead>
                    <TableHead className="font-medium">Total</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="text-right font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-gray-50">
                      <TableCell className="font-mono text-xs">{booking.id.substring(0, 8)}...</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[#069aba]/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-[#069aba]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{booking.user.name}</p>
                            <p className="text-xs text-gray-500">{booking.user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[#f4bc61]/10 flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-[#f4bc61]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{booking.package.title}</p>
                            <p className="text-xs text-gray-500">{booking.package.destination.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm text-gray-900">{new Date(booking.startDate).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500">to {new Date(booking.endDate).toLocaleDateString()}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">${booking.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            booking.status === "CONFIRMED"
                              ? "default"
                              : booking.status === "CANCELLED"
                                ? "destructive"
                                : booking.status === "COMPLETED"
                                  ? "outline"
                                  : "secondary"
                          }
                          className={
                            booking.status === "CONFIRMED"
                              ? "bg-[#069aba] hover:bg-[#069aba]/90"
                              : booking.status === "CANCELLED"
                                ? "bg-red-500 hover:bg-red-500/90"
                                : booking.status === "COMPLETED"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-[#f4bc61] text-gray-900 hover:bg-[#f4bc61]/90"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/bookings/${booking.id}`}>
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#069aba]">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </Link>
                          {booking.status === "PENDING" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[#069aba] border-[#069aba] hover:bg-[#069aba]/10"
                              onClick={() => handleStatusUpdate(booking.id, "CONFIRMED")}
                            >
                              Confirm
                            </Button>
                          )}
                          {booking.status === "PENDING" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 border-red-500 hover:bg-red-50"
                              onClick={() => handleStatusUpdate(booking.id, "CANCELLED")}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

