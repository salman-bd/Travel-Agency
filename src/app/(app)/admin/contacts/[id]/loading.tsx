import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ContactDetailsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-[150px]" />
          <Skeleton className="h-9 w-[180px]" />
        </div>
      </div>

      <Separator />

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <Skeleton className="h-6 w-[300px]" />
              <Skeleton className="h-6 w-[100px]" />
            </div>
            <div className="mt-2 flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[180px]" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
          <CardFooter className="border-t bg-gray-50 px-6 py-4">
            <div className="flex w-full flex-col space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-[150px]" />
                <Skeleton className="h-9 w-[100px]" />
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

