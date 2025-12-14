import { NavLink } from 'react-router'
import { formatTimeAgo, getDomain } from '@/lib/hacker-news-api'
import type { StoryItemProps } from '../types'

export function StoryItem({ story, index }: StoryItemProps) {
  return (
    <div className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded">
      <span className="text-sm text-gray-500 mt-1 w-6 text-right">
        {index + 1}.
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-start space-x-2">
          <h3 className="text-sm font-medium text-gray-900 leading-tight">
            {story.url ? (
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                {story.title}
              </a>
            ) : (
              <NavLink
                to={`/item/${story.id}`}
                prefetch="intent"
                viewTransition
                className="hover:text-blue-600 transition-colors"
              >
                {story.title}
              </NavLink>
            )}
          </h3>

          {story.url && (
            <span className="text-xs text-gray-500 flex-shrink-0">
              ({getDomain(story.url)})
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
          <span>{story.score} points</span>
          <span>by</span>
          <NavLink
            to={`/user/${story.by}`}
            prefetch="intent"
            viewTransition
            className="hover:text-blue-600 transition-colors"
          >
            {story.by}
          </NavLink>
          <span>{formatTimeAgo(story.time)}</span>
          <span>|</span>
          <NavLink
            to={`/item/${story.id}`}
            prefetch="intent"
            viewTransition
            className="hover:text-blue-600 transition-colors"
          >
            {story.descendants || 0} comments
          </NavLink>
        </div>
      </div>
    </div>
  )
}
