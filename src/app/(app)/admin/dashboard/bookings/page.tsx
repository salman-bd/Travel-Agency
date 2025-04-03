
import { getBookings } from "@/lib/actions"
import AdminBookingsPage from "../../../../../components/admin/admin-bookings"

export default async function AdminBlogs() {
  const bookings = await getBookings()
  // console.log('bookings: ', bookings);
  

  return (
    <div className="">
      <AdminBookingsPage bookings={bookings}/>
    </div>
  )
}

