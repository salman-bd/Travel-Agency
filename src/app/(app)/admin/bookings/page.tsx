
import { getBookings } from "@/lib/actions"
import AdminBookingsPage from "@/components/admin/admin-bookings"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminBlogs() {
  const user = await getCurrentUser()
  const userRole = user?.role
  if (!user || userRole !== "ADMIN") {
    redirect("/admin/signin")
  }
  const bookings = await getBookings()
  // console.log('bookings: ', bookings);
  

  return (
    <div className="">
      <AdminBookingsPage bookings={bookings}/>
    </div>
  )
}

