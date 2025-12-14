import { Link } from 'react-router'
import { getStories } from '@/lib/hacker-news-api'
import type { Route } from './+types/route'
import { StoryCard } from '@/components/StoryCard'
import { cn } from '@/lib/utils'

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = 30
  // Calculate offset based on page (1-based index)
  const offset = (page - 1) * limit

  try {
    const stories = await getStories('new', limit, offset)
    return { stories, page }
  } catch (error) {
    console.error('Failed to load new stories:', error)
    return { stories: [], page }
  }
}

export default function NewStories({ loaderData }: Route.ComponentProps) {
  const { stories, page } = loaderData

  return (
    <>
      <div className="space-y-6 lg:hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            New Stories
          </h1>
          <div className="text-sm text-gray-500">Page {page}</div>
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
              'px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
              page <= 1 && 'pointer-events-none opacity-50',
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

      <div className="hidden lg:flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Select a story
        </h3>
        <p className="text-gray-500 max-w-sm mt-2">
          Choose a story from the sidebar to view its details and comments.
        </p>
      </div>
    </>
  )
}
