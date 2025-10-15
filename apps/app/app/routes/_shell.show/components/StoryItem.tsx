import { NavLink } from 'react-router'
import { formatTimeAgo } from '@/lib/hacker-news-api'
import type { StoryItemProps } from '../types'

export function StoryItem({ story, index }: StoryItemProps) {
  return (
    <div className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded">
      <span className="text-sm text-gray-500 mt-1 w-6 text-right">
        {index + 1}.
      </span>

      <div className="flex-1 min-w-0">
        <NavLink
          to={`/item/${story.id}`}
          prefetch="intent"
          viewTransition
          className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors leading-tight"
        >
          {story.title}
        </NavLink>

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
