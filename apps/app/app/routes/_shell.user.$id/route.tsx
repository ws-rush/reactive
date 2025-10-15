import { NavLink } from 'react-router'
import { getUser } from '@/lib/hacker-news-api'
import type { Route } from './+types/route'
import { StoryLink } from './components/StoryLink'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params

  if (!id) {
    throw new Response('User ID is required', { status: 400 })
  }

  try {
    const user = await getUser(id)
    return { user }
  } catch (error) {
    console.error('Failed to load user:', error)
    throw new Response('User not found', { status: 404 })
  }
}

export default function UserProfile({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData

  if (!user) {
    return (
      <div className="text-center py-8">
        <h1 className="text-xl font-bold text-gray-900 mb-2">User not found</h1>
        <p className="text-gray-600">
          The user you're looking for doesn't exist.
        </p>
        <NavLink
          to="/"
          prefetch="viewport"
          viewTransition
          className="inline-block mt-4 text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to stories
        </NavLink>
      </div>
    )
  }

  const createdDate = new Date(user.created * 1000).toLocaleDateString()

  return (
    <div className="space-y-6">
      {/* User Header */}
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-gray-600">
              {user.id.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.id}</h1>

            <div className="mt-2 space-y-1">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">Karma:</span>
                <span className="font-bold text-orange-600">
                  {user.karma.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">Created:</span>
                <span>{createdDate}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">Submissions:</span>
                <span>{user.submitted?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {user.about && (
          <div className="mt-4 pt-4 border-t">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">About</h2>
            <div
              className="text-sm text-gray-800 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: user.about }}
            />
          </div>
        )}
      </div>

      {/* Recent Submissions */}
      {user.submitted && user.submitted.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Submissions
          </h2>

          <div className="bg-white rounded-lg border border-gray-100 divide-y divide-gray-100">
            {user.submitted.slice(0, 30).map((storyId, index) => (
              <StoryLink key={storyId} storyId={storyId} index={index} />
            ))}
          </div>

          {user.submitted.length > 30 && (
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Showing 30 of {user.submitted.length} submissions
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-center pt-6 border-t">
        <NavLink
          to="/"
          prefetch="viewport"
          viewTransition
          className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
        >
          ← Back to stories
        </NavLink>
      </div>
    </div>
  )
}
