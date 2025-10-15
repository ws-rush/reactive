import React from 'react'
import { NavLink } from 'react-router'
import { formatTimeAgo, getComments } from '@/lib/hacker-news-api'
import type { CommentItemProps, CommentTreeProps } from '../types'

export function CommentItem({ comment, depth }: CommentItemProps) {
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

export function CommentTree({ commentId, depth }: CommentTreeProps) {
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
