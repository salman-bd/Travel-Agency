import AdminDashboard from "@/components/admin/dashboard"
import { getCurrentUser } from "@/lib/auth"

export default async function Admin() {
  const user = await getCurrentUser()
  const userRole = user?.role
  return (
    <div>
      {userRole === 'ADMIN' && (
        <AdminDashboard/>
      )}
    </div>
  )
}

