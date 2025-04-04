import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import db from "@/lib/db"
import { Users, Package, Map, CalendarClock, DollarSign, TrendingUp, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  // Get counts from database
  const usersCount = await db.user.count()
  const destinationsCount = await db.destination.count()
  const packagesCount = await db.package.count()
  const bookingsCount = await db.booking.count()

  // Get recent bookings
  const recentBookings = await db.booking.findMany({
    take: 5,
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

  // Calculate total revenue
  const totalRevenue = await db.booking.aggregate({
    _sum: {
      totalPrice: true,
    },
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1 md:mt-0">Welcome to your admin dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-md">
          <div className="absolute top-0 right-0 h-16 w-16 bg-[#069aba]/10 rounded-bl-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{usersCount}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>4% from last month</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#069aba]/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-[#069aba]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <div className="absolute top-0 right-0 h-16 w-16 bg-[#f4bc61]/10 rounded-bl-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{destinationsCount}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>2% from last month</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#f4bc61]/10 flex items-center justify-center">
                <Map className="h-6 w-6 text-[#f4bc61]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <div className="absolute top-0 right-0 h-16 w-16 bg-[#1e3a8a]/10 rounded-bl-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{packagesCount}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>3% from last month</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#1e3a8a]/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-[#1e3a8a]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <div className="absolute top-0 right-0 h-16 w-16 bg-green-100 rounded-bl-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{bookingsCount}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>7% from last month</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CalendarClock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-xl font-bold text-gray-900">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#069aba]/10">
                <DollarSign className="h-8 w-8 text-[#069aba]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${totalRevenue._sum.totalPrice?.toFixed(2) || "0.00"}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="flex items-center text-xs font-medium text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    12% from last month
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <CardTitle className="text-xl font-bold text-gray-900">Recent Bookings</CardTitle>
            <Link href="/admin/dashboard/bookings" className="text-sm text-[#069aba] hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-5">
              {recentBookings.length === 0 ? (
                <p className="text-sm text-gray-500">No bookings yet</p>
              ) : (
                recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{booking.user.name}</p>
                      <p className="text-sm text-gray-500">
                        {booking.package.title} - {booking.package.destination.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="font-medium text-gray-900">${booking.totalPrice.toFixed(2)}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

