import type React from "react"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed sidebar container */}
      <div className="hidden md:block md:w-64 md:flex-shrink-0">
        <div className="fixed h-screen w-64 z-30">
          <AdminSidebar />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}

