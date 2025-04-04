import AdminSignIn from "@/components/admin/admin-signin"
import AdminDashboard from "@/components/admin/dashboard"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Admin() {
  const user = await getCurrentUser()
  const userRole = user?.role
  if (!user || userRole !== "ADMIN") {
    redirect("/admin/signin")
  }
  return (
    <div>
      {userRole === 'ADMIN' && (
        <AdminDashboard/>
      )}
    </div>
  )
}

