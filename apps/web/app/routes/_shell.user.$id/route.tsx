import { NavLink } from 'react-router'
import { getUser, getStory, type Story } from '@/lib/hacker-news-api'
import type { Route } from './+types/route'
import { StoryCard } from '@/components/StoryCard'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params

  if (!id) {
    throw new Response('User ID is required', { status: 400 })
  }

  try {
    const user = await getUser(id)
    let submittedStories: Story[] = []

    if (user.submitted && user.submitted.length > 0) {
      // Fetch details for the first 30 submissions
      const storyPromises = user.submitted
        .slice(0, 30)
        .map(async (storyId) => {
          try {
            const item = await getStory(storyId)
            // Only include actual stories, not comments
            return (item.type === 'story' || item.type === 'job') ? item : null
          } catch {
            return null
          }
        })

      const results = await Promise.all(storyPromises)
      submittedStories = results.filter((s): s is Story => s !== null)
    }

    return { user, submittedStories }
  } catch (error) {
    console.error('Failed to load user:', error)
    throw new Response('User not found', { status: 404 })
  }
}

export default function UserProfile({ loaderData }: Route.ComponentProps) {
  const { user, submittedStories } = loaderData

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">User not found</h1>
        <NavLink
          to="/"
          className="text-hn-orange hover:underline text-sm font-medium"
        >
          &larr; Back to stories
        </NavLink>
      </div>
    )
  }

  const createdDate = new Date(user.created * 1000).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* User Header */}
      <Card className="p-6">
        <div className="flex items-start md:items-center space-x-6">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
            <span className="text-3xl font-bold text-gray-400 dark:text-gray-600">
              {user.id.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{user.id}</h1>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-hn-orange text-base">{user.karma.toLocaleString()}</span>
                <span>Karma</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-medium text-gray-900 dark:text-gray-300">Created</span>
                <span>{createdDate}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-medium text-gray-900 dark:text-gray-300">Submissions</span>
                <span>{user.submitted?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {user.about && (
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">About</h2>
            <div
              className="text-gray-700 dark:text-gray-300 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: user.about }}
            />
          </div>
        )}
      </Card>

      {/* Recent Submissions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          Recent Stories
          <Badge variant="secondary" size="sm" className="font-normal">Last 30</Badge>
        </h2>

        {submittedStories.length > 0 ? (
          <div className="grid gap-3">
            {submittedStories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg border border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-gray-500">No story submissions found.</p>
          </div>
        )}
      </div>

      <div className="text-center pt-4">
        <NavLink
          to="/"
          className="inline-flex items-center text-gray-500 hover:text-hn-orange transition-colors text-sm font-medium"
        >
          &larr; Back to all stories
        </NavLink>
      </div>
    </div>
  )
}

