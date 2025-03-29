import { db } from "@/lib/db"
import PackageForm from "@/components/admin/package-form"

export default async function NewPackagePage() {
  const destinations = await db.destination.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create New Package</h1>
      <PackageForm destinations={destinations} />
    </div>
  )
}

