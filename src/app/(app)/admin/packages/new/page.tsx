// app/admin/dashboard/packages/new/page.tsx
import PackageForm from "@/components/admin/package-form"
import { getDestinations } from "@/lib/actions"

export default async function NewPackagePage() {
  const destinations = await getDestinations()
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create New Package</h1>
      <PackageForm destinations={destinations} />
    </div>
  )
}