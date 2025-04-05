import { formatDate } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCommentsByBlogId } from "@/lib/actions"


export default async function CommentsList({ comments }) {

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold">
        {comments.length} Comment{comments.length !== 1 ? "s" : ""}
      </h3>

      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`https://avatar.vercel.sh/${comment.name}`} alt={comment.name} />
              <AvatarFallback>{comment.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{comment.name}</h4>
                  <p className="text-sm text-gray-500">{formatDate(new Date(comment.createdAt))}</p>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <p>{comment.content}</p>
              </div>

              {comment.website && (
                <a
                  href={comment.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-primary hover:underline"
                >
                  {comment.website.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

