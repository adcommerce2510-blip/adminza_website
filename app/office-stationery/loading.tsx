import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="h-16 border-b" />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Hero Skeleton */}
          <div className="mb-8 rounded-lg p-8 bg-gray-100 dark:bg-gray-800">
            <Skeleton className="h-10 w-64 mb-3" />
            <Skeleton className="h-6 w-full max-w-3xl" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Skeleton */}
            <aside className="lg:w-64 flex-shrink-0">
              <Card className="mb-6">
                <div className="p-6">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-5 w-full" />
                    ))}
                  </div>
                </div>
              </Card>
            </aside>

            {/* Products Grid Skeleton */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-48" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <Card key={i}>
                    <Skeleton className="w-full h-56 rounded-t-lg" />
                    <CardContent className="p-5">
                      <Skeleton className="h-4 w-24 mb-3" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-4 w-32 mb-3" />
                      <Skeleton className="h-4 w-24 mb-4" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-9 w-32" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
