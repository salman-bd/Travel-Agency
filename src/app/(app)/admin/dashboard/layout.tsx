import type React from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  // console.log('User data in the dashboard: ', user);
  
  if (!user || user.role !== "ADMIN") {
    redirect("/admin")
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden w-64 md:block">
        <AdminSidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <AdminHeader user={user} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}

