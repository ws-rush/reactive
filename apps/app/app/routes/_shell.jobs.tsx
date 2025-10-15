import { NavLink } from 'react-router'
import { formatTimeAgo, getDomain, getStories } from '@/lib/hacker-news-api'
import type { Route } from './+types/jobs'

interface StoryItemProps {
  story: any
  index: number
}

function StoryItem({ story, index }: StoryItemProps) {
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

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = 30

  try {
    const stories = await getStories('job', limit)
    return { stories, page }
  } catch (error) {
    console.error('Failed to load job stories:', error)
    return { stories: [], page }
  }
}

export default function JobStories({ loaderData }: Route.ComponentProps) {
  const { stories } = loaderData

  return (
    <div className="space-y-4">
      <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
        <h1 className="text-xl font-bold text-blue-900 mb-2">Jobs</h1>
        <p className="text-sm text-blue-700">
          Job opportunities shared by the Hacker News community
        </p>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading stories...</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
          {stories.map((story, index) => (
            <StoryItem key={story.id} story={story} index={index} />
          ))}
        </div>
      )}

      <div className="flex justify-center space-x-4 mt-6">
        <button
          className="px-4 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
          disabled
        >
          Previous
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
          Next
        </button>
      </div>
    </div>
  )
}
