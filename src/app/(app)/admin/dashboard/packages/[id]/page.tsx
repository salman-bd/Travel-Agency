// app/admin/dashboard/packages/[id]/page.tsx
import { notFound } from "next/navigation"
import { getDestinations, getPackageById } from "@/lib/actions"
import PackageForm from "@/components/admin/package-form"

interface PackageEditPageProps {
  params: {
    id: string
  }
}

export default async function PackageEditPage({ params }: PackageEditPageProps) {
  const destinations = await getDestinations()
  const pkg = await getPackageById(params.id)
  
  if (!pkg) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Package</h1>
      <PackageForm destinations={destinations} package={pkg} />
    </div>
  )
}