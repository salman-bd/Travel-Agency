import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { getBlogs } from "@/lib/actions"
import { formatDate } from "@/lib/utils"

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = await params
  const blogs = await getBlogs()

  // Filter blogs by category (case insensitive)
  const categoryBlogs = blogs.filter((blog) => blog.category.toLowerCase() === category.toLowerCase())

  // Get all unique categories
  const categories = [...new Set(blogs.map((blog) => blog.category))]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[300px] w-full bg-[url('/bg/travel-concept3.png?height=500&width=1200')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold capitalize md:text-5xl">{category}</h1>
          <p className="text-lg">Explore our {category} travel stories</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              {categoryBlogs.length === 0 ? (
                <div className="rounded-lg bg-gray-50 p-8 text-center">
                  <h2 className="text-xl font-medium">No stories found</h2>
                  <p className="mt-2 text-gray-600">We couldn't find any stories in this category. Check back later!</p>
                  <Link
                    href="/travel-stories"
                    className="mt-4 inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
                  >
                    View All Stories
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {categoryBlogs.map((blog) => (
                    <div key={blog.id} className="group">
                      <div className="relative mb-4 h-[220px] w-full overflow-hidden rounded-lg">
                        <Image
                          src={blog.imageUrl || "/placeholder.svg"}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                        <span>{formatDate(new Date(blog.createdAt))}</span>
                        <span>•</span>
                        <span>{blog.author.name}</span>
                      </div>
                      <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary">
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h3>
                      <p className="text-sm text-gray-600">{blog.excerpt}</p>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="mt-3 inline-flex items-center text-sm font-medium text-primary"
                      >
                        Read More
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="mb-8 rounded-lg bg-white p-6 shadow">
                <h3 className="mb-6 text-xl font-bold">Categories</h3>
                <ul className="space-y-4">
                  {categories.map((ctgr) => (
                    <li key={ctgr}>
                      <Link
                        href={`/category/${ctgr.toLowerCase()}`}
                        className={`flex items-center gap-2 ${
                          ctgr.toLowerCase() === category.toLowerCase()
                            ? "font-medium text-primary"
                            : "hover:text-primary"
                        }`}
                      >
                        <ChevronRight className="h-4 w-4" />
                        <span>{ctgr}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg bg-black p-6 text-white">
                <h3 className="mb-4 text-xl font-bold">Subscribe to Our Newsletter</h3>
                <p className="mb-4 text-sm">
                  Get the latest travel stories and exclusive offers delivered straight to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-white focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

