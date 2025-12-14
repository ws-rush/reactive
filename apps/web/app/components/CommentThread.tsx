import React from 'react'
import { Link } from 'react-router'
import type { Comment } from '@/lib/hacker-news-api'
import { formatTimeAgo, getComments } from '@/lib/hacker-news-api'
import { cn } from '@/lib/utils'

// Inline/internal icons
const Icons = {
  ChevronDown: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  ChevronUp: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  ),
}

interface CommentThreadProps {
  comment: Comment
  depth?: number
}

export function CommentThread({ comment, depth = 0 }: CommentThreadProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [kids, setKids] = React.useState<Comment[]>([])
  const [isLoadingKids, setIsLoadingKids] = React.useState(false)
  const [hasLoadedKids, setHasLoadedKids] = React.useState(false)

  const createMarkup = (html: string) => {
    return { __html: html }
  }

  const loadKids = React.useCallback(async () => {
    if (hasLoadedKids || !comment.kids?.length) return

    setIsLoadingKids(true)
    try {
      const fetchedKids = await getComments(comment.kids)
      setKids(fetchedKids)
      setHasLoadedKids(true)
    } catch (error) {
      console.error('Failed to load child comments:', error)
    } finally {
      setIsLoadingKids(false)
    }
  }, [hasLoadedKids, comment.kids])

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCollapsed(!collapsed)

    if (!collapsed && !hasLoadedKids && comment.kids?.length) {
      loadKids()
    }
  }

  React.useEffect(() => {
    if (depth < 1 && comment.kids?.length && !hasLoadedKids) {
      loadKids()
    }
  }, [depth, comment.kids, hasLoadedKids, loadKids])

  if (comment.deleted || comment.dead) return null

  return (
    <div
      className={cn(
        'relative',
        depth > 0 &&
          'pl-4 sm:pl-6 border-l-2 border-gray-100 dark:border-gray-800 ml-1',
      )}
    >
      <div className={cn('py-3', collapsed && 'opacity-60')}>
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 dark:text-gray-400">
          <button
            onClick={handleToggle}
            className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <Icons.ChevronDown /> : <Icons.ChevronUp />}
          </button>

          <Link
            to={`/user/${comment.by}`}
            className="font-semibold hover:underline"
          >
            {comment.by}
          </Link>

          <span>·</span>
          <span>{formatTimeAgo(comment.time)}</span>

          {collapsed && (
            <span className="text-gray-400">
              ({(comment.kids?.length || 0) + 1} items hidden)
            </span>
          )}
        </div>

        {!collapsed && (
          <>
            {comment.text && (
              <div
                className="text-sm text-gray-800 dark:text-gray-200 prose prose-sm dark:prose-invert max-w-none break-words [&>p]:mb-2 [&>pre]:whitespace-pre-wrap [&>pre]:overflow-x-auto"
                dangerouslySetInnerHTML={createMarkup(comment.text)}
              />
            )}

            {comment.kids && comment.kids.length > 0 && (
              <div className="mt-3 space-y-3">
                {isLoadingKids ? (
                  <div className="ml-4 py-2 text-xs text-gray-400 animate-pulse">
                    Loading replies...
                  </div>
                ) : (
                  kids.map((kid) => (
                    <CommentThread
                      key={kid.id}
                      comment={kid}
                      depth={depth + 1}
                    />
                  ))
                )}

                {!hasLoadedKids && !isLoadingKids && (
                  <button
                    onClick={() => loadKids()}
                    className="ml-4 text-xs font-medium text-hn-orange hover:underline focus:outline-hidden"
                  >
                    Load {comment.kids.length} replies
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
