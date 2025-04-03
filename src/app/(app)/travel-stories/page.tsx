import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Facebook, Twitter, Linkedin, Calendar, User } from "lucide-react"
import { getBlogs } from "@/lib/actions"
import { formatDate } from "@/lib/utils"

export default async function TravelStoriesPage() {
  const blogs = await getBlogs()

  // Get the featured blog (first blog) and remaining blogs
  const featuredBlog = blogs[0]
  const recentBlogs = blogs.slice(0, 3)

  // Extract unique categories from blogs
  const categories = [...new Set(blogs.map((blog) => blog.category))]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full bg-[url('/bg/travel-concept3.png?height=500&width=1200')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">Travel Stories For Now and the Future</h1>
          <p className="max-w-2xl text-lg">
            Discover amazing destinations around the globe with our expertly crafted travel guides
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {featuredBlog && (
                <div className="mb-8">
                  <div className="relative mb-6 h-[400px] w-full overflow-hidden rounded-lg">
                    <Image
                      src={featuredBlog.imageUrl || "/placeholder.svg"}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{featuredBlog.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(new Date(featuredBlog.createdAt))}</span>
                    </div>
                    <div className="rounded-full bg-gray-100 px-3 py-1">{featuredBlog.category}</div>
                  </div>

                  <h1 className="mb-4 text-3xl font-bold">{featuredBlog.title}</h1>

                  <div className="mb-6 text-gray-700">
                    <p className="mb-4">{featuredBlog.content}</p>

                    <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="relative h-[300px] overflow-hidden rounded-lg">
                        <Image
                          src="/travelling2.jpg?height=400&width=600"
                          alt="Travelers with backpacks"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative h-[300px] overflow-hidden rounded-lg">
                        <Image
                          src="/traveller2.jpg?height=400&width=600"
                          alt="Travelers with backpacks"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Tags: </span>
                      <Link
                        href={`/category/${featuredBlog.category.toLowerCase()}`}
                        className="text-sm hover:underline"
                      >
                        {featuredBlog.category}
                      </Link>
                      <Link href="/travel" className="text-sm hover:underline">
                        Travel
                      </Link>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Share This: </span>
                      <Link href="#" className="rounded-full border border-gray-300 p-2 hover:bg-gray-100">
                        <Facebook className="h-4 w-4" />
                      </Link>
                      <Link href="#" className="rounded-full border border-gray-300 p-2 hover:bg-gray-100">
                        <Twitter className="h-4 w-4" />
                      </Link>
                      <Link href="#" className="rounded-full border border-gray-300 p-2 hover:bg-gray-100">
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* More Blog Posts Section */}
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">More Travel Stories</h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {blogs.slice(1).map((blog) => (
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
                        <span>{blog.category}</span>
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
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="mb-8 rounded-lg bg-white p-6 shadow">
                <h3 className="mb-6 text-xl font-bold">Recent Posts</h3>
                <div className="space-y-4">
                  {recentBlogs.map((blog) => (
                    <div key={blog.id} className="flex gap-4">
                      <Image
                        src={blog.imageUrl || "/placeholder.svg"}
                        alt={blog.title}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                      <div>
                        <h4 className="font-medium hover:text-primary">
                          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </h4>
                        <p className="text-xs text-gray-500">{formatDate(new Date(blog.createdAt))}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 rounded-lg bg-white p-6 shadow">
                <h3 className="mb-6 text-xl font-bold">Categories</h3>
                <ul className="space-y-4">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        href={`/category/${category.toLowerCase()}`}
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <ChevronRight className="h-4 w-4" />
                        <span>{category}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8 rounded-lg bg-white p-6 shadow">
                <h3 className="mb-6 text-xl font-bold">Subscribe</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Subscribe to our newsletter to get the latest travel stories and exclusive offers.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              <div className="rounded-lg bg-black p-6 text-white">
                <h3 className="mb-4 text-xl font-bold">Have Any Question?</h3>
                <p className="mb-4 text-sm">
                  Do not hesitate to give us a call. We are an expert team and we are happy to talk to you.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27097 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85669 2.63477 2.65162C2.82196 2.44655 3.04981 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47145 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>+62 6943 6956</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 6L12 13L2 6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>contact@domain.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

