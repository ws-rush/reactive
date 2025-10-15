import React from 'react'
import { NavLink, useLoaderData } from 'react-router'
import {
  formatTimeAgo,
  getComments,
  getDomain,
  getStory,
} from '@/lib/hacker-news-api'
import type { Route } from './+types/item.$id'

interface CommentItemProps {
  comment: any
  depth: number
}

function CommentItem({ comment, depth }: CommentItemProps) {
  if (!comment || comment.deleted || comment.dead) return null

  return (
    <div
      className={`${depth > 0 ? 'ml-4' : ''} ${depth > 0 ? 'border-l-2 border-gray-100' : ''} ${depth > 0 ? 'pl-4' : ''} py-3 ${depth === 0 ? 'pl-4' : ''}`}
    >
      <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
        <NavLink
          to={`/user/${comment.by}`}
          prefetch="intent"
          viewTransition
          className="font-medium text-gray-900 hover:text-gray-700 transition-colors"
        >
          {comment.by}
        </NavLink>
        <span className="text-gray-400">•</span>
        <span className="text-gray-500">{formatTimeAgo(comment.time)}</span>
      </div>

      {comment.text && (
        <div
          className="text-gray-800 leading-relaxed prose prose-sm max-w-none prose-headings:font-medium prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200"
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
      )}

      {comment.kids && comment.kids.length > 0 && (
        <div className="mt-3 space-y-1">
          {comment.kids.map((kidId: number) => (
            <CommentTree key={kidId} commentId={kidId} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

interface CommentTreeProps {
  commentId: number
  depth: number
}

function CommentTree({ commentId, depth }: CommentTreeProps) {
  const [comment, setComment] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getComments([commentId])
      .then(([commentData]) => {
        setComment(commentData)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [commentId])

  if (loading) {
    return (
      <div
        className={`${depth > 0 ? 'ml-4' : ''} ${depth > 0 ? 'border-l-2 border-gray-100' : ''} ${depth > 0 ? 'pl-4' : ''} ${depth === 0 ? 'pl-4' : ''} py-3`}
      >
        <div className="animate-pulse-subtle">
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  return <CommentItem comment={comment} depth={depth} />
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params

  if (!id) {
    throw new Response('Story ID is required', { status: 400 })
  }

  try {
    const story = await getStory(parseInt(id, 10))
    let comments: any[] = []

    if (story.kids && story.kids.length > 0) {
      comments = await getComments(story.kids.slice(0, 50)) // Limit initial comments
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
      <div className="text-center py-8">
        <h1 className="text-xl font-light text-gray-900 mb-2">
          Story not found
        </h1>
        <p className="text-gray-600 mb-4 text-sm">
          The story you're looking for doesn't exist or has been removed.
        </p>
        <NavLink
          to="/"
          prefetch="viewport"
          viewTransition
          className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm"
        >
          ← Back to stories
        </NavLink>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Unified Story Card */}
      <article className="bg-white rounded-lg border border-gray-100 p-4">
        {/* Back Link */}
        <div className="mb-3">
          <NavLink
            to="/"
            prefetch="viewport"
            viewTransition
            className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors text-xs"
          >
            ← back
          </NavLink>
        </div>

        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0 mr-4">
            <h1 className="text-lg font-light text-gray-900 leading-tight">
              {story.url ? (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors block"
                >
                  {story.title}
                </a>
              ) : (
                story.title
              )}
            </h1>

            {story.url && (
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors mt-1"
              >
                <span>{getDomain(story.url)}</span>
                <svg
                  className="w-3 h-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>

          <button className="px-3 py-2 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors flex-shrink-0">
            Add Comment
          </button>
        </div>

        <div className="flex items-center space-x-4 text-xs text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <span className="font-medium text-gray-900">{story.score}</span>
            <span>points</span>
          </div>
          <NavLink
            to={`/user/${story.by}`}
            prefetch="intent"
            viewTransition
            className="font-medium text-gray-900 hover:text-gray-700 transition-colors"
          >
            {story.by}
          </NavLink>
          <span>{formatTimeAgo(story.time)}</span>
          <span className="text-gray-400">•</span>
          <span>{story.descendants || 0} comments</span>
        </div>

        {story.text && (
          <div
            className="text-gray-800 leading-relaxed prose prose-sm max-w-none prose-headings:font-medium prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200"
            dangerouslySetInnerHTML={{ __html: story.text }}
          />
        )}
      </article>

      {/* Comments Section */}
      <section className="space-y-3">
        {comments.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-100 p-6 text-center">
            <p className="text-gray-500 text-sm">No comments yet.</p>
            <p className="text-gray-400 text-xs mt-1">
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-100 divide-y divide-gray-100">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} depth={0} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
