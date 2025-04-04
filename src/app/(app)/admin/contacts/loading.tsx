import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ContactsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="mt-1 h-4 w-[350px]" />
      </div>

      <Separator />

      <div className="grid gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <Skeleton className="h-6 w-[250px]" />
                  <div className="mt-2 flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[180px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
                <Skeleton className="h-6 w-[100px]" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[60px] w-full" />
              <div className="mt-4 flex justify-end">
                <Skeleton className="h-9 w-[120px]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

