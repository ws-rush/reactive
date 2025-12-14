import { NavLink } from 'react-router'
import {
  formatTimeAgo,
  getComments,
  getDomain,
  getStory,
  type Comment,
} from '@/lib/hacker-news-api'
import type { Route } from './+types/route'
import { CommentThread } from '@/components/CommentThread'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params

  if (!id) {
    throw new Response('Story ID is required', { status: 400 })
  }

  try {
    const story = await getStory(parseInt(id, 10))
    let comments: Comment[] = []

    if (story.kids && story.kids.length > 0) {
      // Load top-level comments initially
      comments = await getComments(story.kids.slice(0, 30))
    }

    return { story, comments }
  } catch (error) {
    console.error('Failed to load story:', error)
    throw new Response('Story not found', { status: 404 })
  }
}

export default function StoryDetail({ loaderData }: Route.ComponentProps) {
  const { story, comments } = loaderData

  if (!story) {
    return (
      <div className="text-center py-12">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Story not found
        </h1>
        <NavLink
          to="/"
          className="text-hn-orange hover:underline text-sm font-medium"
        >
          &larr; Back to stories
        </NavLink>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="mb-4">
        <NavLink
          to="/"
          className="inline-flex items-center text-gray-500 hover:text-hn-orange transition-colors text-sm font-medium"
        >
          &larr; Back
        </NavLink>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" size="sm">
                {story.type}
              </Badge>
              {story.url && (
                <span className="text-sm text-gray-500 truncate max-w-[200px] sm:max-w-md">
                  {getDomain(story.url)}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {story.url ? (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-hn-orange transition-colors"
                >
                  {story.title}
                </a>
              ) : (
                story.title
              )}
            </h1>
          </div>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-hn-orange">
              {story.score} points
            </span>
            <span>
              by{' '}
              <NavLink
                to={`/user/${story.by}`}
                className="hover:text-hn-orange font-medium"
              >
                {story.by}
              </NavLink>
            </span>
            <span>{formatTimeAgo(story.time)}</span>
            <span>{story.descendants || 0} comments</span>
          </div>

          {story.text && (
            <div
              className="pt-4 border-t border-gray-100 dark:border-gray-800 prose prose-sm dark:prose-invert max-w-none text-gray-800 dark:text-gray-200"
              dangerouslySetInnerHTML={{ __html: story.text }}
            />
          )}
        </div>
      </Card>

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Comments ({story.descendants || 0})
        </h3>

        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-white dark:bg-gray-900 rounded-lg border border-dashed border-gray-200 dark:border-gray-800">
            No comments yet.
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6 space-y-6">
            {comments.map((comment) => (
              <CommentThread key={comment.id} comment={comment} depth={0} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
