import { Link } from 'react-router'
import { formatTimeAgo, getDomain, type Story } from '@/lib/hacker-news-api'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

// Inline SVG icons to avoid external dependencies
const Icons = {
  ArrowUp: () => (
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
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  ),
  User: () => (
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Clock: () => (
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  MessageSquare: () => (
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
}

interface StoryCardProps {
  story: Story
  index?: number
}

export function StoryCard({ story, index }: StoryCardProps) {
  const isJob = story.type === 'job'
  const domain = getDomain(story.url)
  const isAsk = story.title.startsWith('Ask HN:')
  const isShow = story.title.startsWith('Show HN:')

  // Clean title for Ask/Show HN
  const title = story.title.replace(/^Ask HN: /, '').replace(/^Show HN: /, '')

  return (
    <Card hover className="p-4 flex gap-4 group">
      {index !== undefined && (
        <div className="hidden sm:flex flex-col items-center justify-start min-w-[2rem] pt-1 text-gray-400 font-mono text-sm leading-none">
          {index + 1}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              {isAsk && (
                <Badge variant="accent" size="sm">
                  Ask
                </Badge>
              )}
              {isShow && (
                <Badge variant="accent" size="sm">
                  Show
                </Badge>
              )}
              {isJob && (
                <Badge variant="secondary" size="sm">
                  Job
                </Badge>
              )}

              <a
                href={story.url || `/item/${story.id}`}
                target={story.url ? '_blank' : undefined}
                rel={story.url ? 'noopener noreferrer' : undefined}
                className="text-base font-semibold text-gray-900 dark:text-gray-100 visited:text-gray-600 dark:visited:text-gray-400 hover:text-hn-orange dark:hover:text-hn-orange transition-colors line-clamp-2 leading-tight"
              >
                {title}
              </a>

              {domain && (
                <span className="text-xs text-gray-500 dark:text-gray-500 hidden sm:inline-flex items-center gap-0.5">
                  ({domain})
                </span>
              )}
            </div>

            <div className="flex items-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
              <span
                className="flex items-center gap-1"
                title={`${story.score} points`}
              >
                <Icons.ArrowUp />
                {story.score}
              </span>

              <Link
                to={`/user/${story.by}`}
                className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <Icons.User />
                {story.by}
              </Link>

              <span className="flex items-center gap-1">
                <Icons.Clock />
                {formatTimeAgo(story.time)}
              </span>

              {!isJob && (
                <Link
                  to={`/item/${story.id}`}
                  className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  <Icons.MessageSquare />
                  {story.descendants || 0} comments
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
