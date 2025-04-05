import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Facebook, Twitter, Linkedin, Calendar, User } from "lucide-react"
import { getBlogs, getCommentsByBlogId } from "@/lib/actions"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import CommentsList from "@/components/comments-list"
import CommentForm from "@/components/comment-form"

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const comments = await getCommentsByBlogId(id)

  const blogs = await getBlogs()
  const blog = blogs.find((blog) => blog.id === id)
  if (!blog) {
    notFound()
  }

  // Get related blogs (same category, excluding current blog)
  const relatedBlogs = blogs.filter((b) => b.category === blog.category && b.id !== blog.id).slice(0, 2)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full">
        <Image src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blog.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(new Date(blog.createdAt))}</span>
            </div>
            <div className="rounded-full bg-white/20 px-3 py-1 text-sm">{blog.category}</div>
          </div>
          <h1 className="mb-2 max-w-4xl text-3xl font-bold md:text-4xl lg:text-5xl">{blog.title}</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg max-w-none">
              <p>{blog.content}</p>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-b border-gray-200 py-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Category: </span>
                <Link
                  href={`/category/${blog.category.toLowerCase()}`}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
                >
                  {blog.category}
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Share: </span>
                <div className="flex gap-2">
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

            {relatedBlogs.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">Related Stories</h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {relatedBlogs.map((relatedBlog) => (
                    <div key={relatedBlog.id} className="group">
                      <div className="relative mb-4 h-[220px] w-full overflow-hidden rounded-lg">
                        <Image
                          src={relatedBlog.imageUrl || "/placeholder.svg"}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                        <span>{formatDate(new Date(relatedBlog.createdAt))}</span>
                        <span>•</span>
                        <span>{relatedBlog.category}</span>
                      </div>
                      <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary">
                        <Link href={`/blog/${relatedBlog.slug}`}>{relatedBlog.title}</Link>
                      </h3>
                      <p className="text-sm text-gray-600">{relatedBlog.excerpt}</p>
                      <Link
                        href={`/blog/${relatedBlog.slug}`}
                        className="mt-3 inline-flex items-center text-sm font-medium text-primary"
                      >
                        Read More
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Comment Section */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold">Leave a Reply</h2>
            <p className="mb-8 text-gray-600">Your email address will not be published. Required fields are marked *</p>
            <Suspense fallback={<div>Loading comments...</div>}>
              <CommentsList comments={comments} />
            </Suspense>
            <div className="mt-12">
              <CommentForm blogId={id} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

