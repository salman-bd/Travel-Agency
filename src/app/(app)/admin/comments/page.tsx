import { getAllComments, approveComment, deleteComment } from "@/lib/actions"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CheckCircle, Trash2, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function AdminCommentsPage() {
  const comments = await getAllComments()

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Comments</h1>
        <p className="text-gray-500 mt-1 md:mt-0">Manage blog comments</p>
      </div>

      {comments.length === 0 ? (
        <Card className="border-none shadow-md">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-center text-gray-500 text-lg">No comments yet</p>
            <p className="text-center text-gray-400 text-sm mt-1">
              When readers comment on your blogs, they'll appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-white pb-0">
            <CardTitle className="text-xl font-bold text-gray-900">All Comments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-medium">Author</TableHead>
                    <TableHead className="font-medium">Comment</TableHead>
                    <TableHead className="font-medium">Blog Post</TableHead>
                    <TableHead className="font-medium">Date</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="text-right font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comments.map((comment) => (
                    <TableRow key={comment.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{comment.name}</span>
                          <span className="text-xs text-gray-500">{comment.email}</span>
                          {comment.website && (
                            <a
                              href={comment.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#069aba] hover:underline truncate max-w-[150px]"
                            >
                              {comment.website.replace(/^https?:\/\/(www\.)?/, "")}
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">{comment.content}</div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/blog/${comment.blog.slug}`}
                          className="text-[#069aba] hover:underline"
                          target="_blank"
                        >
                          {comment.blog.title}
                        </Link>
                      </TableCell>
                      <TableCell>{formatDate(new Date(comment.createdAt))}</TableCell>
                      <TableCell>
                        <Badge
                          variant={comment.isApproved ? "default" : "outline"}
                          className={
                            comment.isApproved
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          }
                        >
                          {comment.isApproved ? "Approved" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {!comment.isApproved && (
                            <form
                              action={async () => {
                                "use server"
                                await approveComment(comment.id)
                              }}
                            >
                              <Button
                                type="submit"
                                size="sm"
                                variant="outline"
                                className="text-[#069aba] border-[#069aba] hover:bg-[#069aba]/10 flex items-center gap-1"
                              >
                                <CheckCircle className="h-4 w-4" />
                                Approve
                              </Button>
                            </form>
                          )}

                          <form
                            action={async () => {
                              "use server"
                              await deleteComment(comment.id)
                            }}
                          >
                            <Button
                              type="submit"
                              size="sm"
                              variant="outline"
                              className="text-red-500 border-red-500 hover:bg-red-50 flex items-center gap-1"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </form>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

