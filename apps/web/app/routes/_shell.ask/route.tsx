import { Link } from 'react-router'
import { getStories } from '@/lib/hacker-news-api'
import type { Route } from './+types/route'
import { StoryCard } from '@/components/StoryCard'
import { cn } from '@/lib/utils'

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = 30
  const offset = (page - 1) * limit

  try {
    const stories = await getStories('ask', limit, offset)
    return { stories, page }
  } catch (error) {
    console.error('Failed to load ask stories:', error)
    return { stories: [], page }
  }
}

export default function AskStories({ loaderData }: Route.ComponentProps) {
  const { stories, page } = loaderData

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Ask HN
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Questions and discussions from the community
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Page {page}
        </div>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500">No stories found or failed to load.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {stories.map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              index={(page - 1) * 30 + index}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center space-x-4 pt-6">
        <Link
          to={`?page=${page - 1}`}
          className={cn(
            "px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
            page <= 1 && "pointer-events-none opacity-50"
          )}
          preventScrollReset={false}
        >
          Previous
        </Link>
        <Link
          to={`?page=${page + 1}`}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          preventScrollReset={false}
        >
          Next
        </Link>
      </div>
    </div>
  )
}

