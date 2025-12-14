import { NavLink, useMatches, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import { getStories, type Story } from '@/lib/hacker-news-api'
import { cn } from '@/lib/utils'

function SidebarLoading() {
  return (
    <div className="space-y-4 p-4 animate-pulse">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="h-16 bg-gray-100 dark:bg-gray-800 rounded-md"
        ></div>
      ))}
    </div>
  )
}

// Determine the story type/category based on URL or default to 'top'
const getCategoryFromPath = (pathname: string) => {
  if (pathname.includes('/new')) return 'new'
  if (pathname.includes('/best')) return 'best'
  if (pathname.includes('/ask')) return 'ask'
  if (pathname.includes('/show')) return 'show'
  if (pathname.includes('/jobs')) return 'job'
  return 'top' // default
}

export function StorySidebar() {
  const matches = useMatches()
  const location = useLocation()

  const category = getCategoryFromPath(location.pathname)
  const [prevCategory, setPrevCategory] = useState(category)

  // Try to find stories in the current route loaders
  const matchWithStories = matches.find(
    (m) => m.data && (m.data as { stories: Story[] }).stories,
  )
  const routeStories = matchWithStories
    ? ((matchWithStories.data as { stories: Story[] }).stories as Story[])
    : null

  const [fetchedStories, setFetchedStories] = useState<Story[]>([])
  // Initialize loading based on whether we need to fetch immediately
  const [loading, setLoading] = useState(!routeStories)

  // Reset state when category changes
  if (category !== prevCategory) {
    setPrevCategory(category)
    setFetchedStories([])
    setLoading(true)
  }

  // Use route stories if available, otherwise use fetched stories
  const stories = routeStories || fetchedStories

  useEffect(() => {
    if (routeStories) {
      // If we have stories from the route, we use them directly.
      return
    }

    let ignore = false
    // setLoading(true) is handled by the state reset above during render

    getStories(category, 30) // Fetch top 30 for sidebar
      .then((data) => {
        if (!ignore) {
          setFetchedStories(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        console.error(err)
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [category, routeStories])

  if (loading && !stories.length) return <SidebarLoading />

  return (
    <div className="h-full overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 w-full sm:w-80 lg:w-96 flex-shrink-0 flex flex-col">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xs z-10">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">
          {location.pathname.startsWith('/item')
            ? 'Trending Stories'
            : 'Stories'}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {stories.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No stories found
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {stories.map((story, i) => (
              <NavLink
                key={story.id}
                to={`/item/${story.id}`}
                className={({ isActive }) =>
                  cn(
                    'block p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors',
                    isActive &&
                      'bg-orange-50 dark:bg-orange-900/10 border-l-4 border-hn-orange pl-[12px]',
                  )
                }
              >
                <div className="flex gap-3">
                  <span className="text-gray-400 font-medium text-sm tabular-nums flex-shrink-0 w-6 text-right">
                    {i + 1}.
                  </span>
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3
                      className={cn(
                        'text-sm font-medium leading-snug line-clamp-2',
                        'text-gray-900 dark:text-gray-100',
                      )}
                    >
                      {story.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="text-hn-orange font-medium">
                        {story.score} pts
                      </span>
                      <span>•</span>
                      <span>{story.descendants || 0} comments</span>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
