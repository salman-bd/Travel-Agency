import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import DestinationForm from "@/components/admin/destination-form"

interface DestinationEditPageProps {
  params: {
    id: string
  }
}

export default async function DestinationEditPage({ params }: DestinationEditPageProps) {
  const destination = await db.destination.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!destination) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Destination</h1>
      <DestinationForm destination={destination} />
    </div>
  )
}

