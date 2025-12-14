import { getStories } from '@/lib/hacker-news-api'
import type { Route } from './+types/route'
import { StoryItem } from './components/StoryItem'

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = 30

  try {
    const stories = await getStories('new', limit)
    return { stories, page }
  } catch (error) {
    console.error('Failed to load new stories:', error)
    return { stories: [], page }
  }
}

export default function NewStories({ loaderData }: Route.ComponentProps) {
  const { stories } = loaderData

  return (
    <div className="space-y-4">
      <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4">
        <h1 className="text-xl font-bold text-yellow-900 mb-2">New Stories</h1>
        <p className="text-sm text-yellow-700">
          The latest stories submitted to Hacker News
        </p>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
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
          type="button"
          className="px-4 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
          disabled
        >
          Previous
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}
