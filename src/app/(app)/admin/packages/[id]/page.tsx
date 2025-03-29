import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import PackageForm from "@/components/admin/package-form"

interface PackageEditPageProps {
  params: {
    id: string
  }
}

export default async function PackageEditPage({ params }: PackageEditPageProps) {
  const pkg = await db.package.findUnique({
    where: {
      id: params.id,
    },
    include: {
      itinerary: {
        orderBy: {
          day: "asc",
        },
      },
    },
  })

  if (!pkg) {
    notFound()
  }

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
      <h1 className="text-2xl font-bold">Edit Package</h1>
      <PackageForm package={pkg} destinations={destinations} />
    </div>
  )
}

