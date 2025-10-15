import React from 'react'
import { NavLink } from 'react-router'
import { formatTimeAgo } from '@/lib/hacker-news-api'
import type { StoryLinkProps } from '../types'

export function StoryLink({ storyId, index }: StoryLinkProps) {
  const [story, setStory] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setStory(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [storyId])

  if (loading) {
    return (
      <div className="flex items-start space-x-2 p-2">
        <span className="text-sm text-gray-500 mt-1 w-6 text-right">
          {index + 1}.
        </span>
        <div className="flex-1 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!story) return null

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
          className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors leading-tight block"
        >
          {story.title}
        </NavLink>
        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
          <span>{story.score || 0} points</span>
          <span>{formatTimeAgo(story.time)}</span>
          <span>|</span>
          <span>{story.descendants || 0} comments</span>
        </div>
      </div>
    </div>
  )
}
