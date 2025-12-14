import React from 'react'
import { NavLink } from 'react-router'
import type { Story } from '@/lib/hacker-news-api'
import type { StorySidebarProps } from '../types'

export function StorySidebar({ stories, isLoading }: StorySidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [filteredStories, setFilteredStories] = React.useState<Story[]>([])
  const [currentPage, setCurrentPage] = React.useState(0)
  const [allStories, setAllStories] = React.useState<Story[]>([])

  const storiesPerPage = 20
  const totalPages = Math.ceil(filteredStories.length / storiesPerPage)
  const paginatedStories = filteredStories.slice(
    currentPage * storiesPerPage,
    (currentPage + 1) * storiesPerPage,
  )

  // Initialize all stories when stories prop changes
  React.useEffect(() => {
    setAllStories(stories)
    setFilteredStories(stories)
    setCurrentPage(0)
  }, [stories])

  // Filter stories based on search query
  React.useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allStories.filter(
        (story) =>
          story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.by.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredStories(filtered)
      setCurrentPage(0)
    } else {
      setFilteredStories(allStories)
      setCurrentPage(0)
    }
  }, [searchQuery, allStories])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  return (
    <aside className="hidden lg:block w-80 bg-white border-r border-gray-100 fixed left-0 top-0 h-screen z-40">
      {/* Sidebar Header */}
      <div className="h-12 flex items-center border-b border-gray-100">
        <div className="p-4">
          <NavLink
            to="/"
            prefetch="viewport"
            viewTransition
            className={({ isPending }) => `
              text-xl font-light text-gray-900 tracking-tight hover:text-gray-700 transition-all duration-200 block
              ${isPending ? 'opacity-60' : ''}
            `}
          >
            Hacker News
          </NavLink>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="h-[calc(100vh-3rem)] overflow-y-auto scrollbar-elegant">
        {/* Search Section */}
        <div className="p-4 border-b border-gray-100">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-gray-50 transition-colors"
            />
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Stories
            </h2>
            <span className="text-xs text-gray-500">
              {filteredStories.length} results
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-2 px-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="p-3 bg-gray-50 animate-pulse-subtle">
                <div className="h-3 bg-gray-200 rounded mb-1 w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="bg-white divide-y divide-gray-100">
              {paginatedStories.map((story, index) => (
                <NavLink
                  key={story.id}
                  to={`/item/${story.id}`}
                  prefetch="intent"
                  viewTransition
                  className={({ isActive, isPending }) => `
                      block px-3 py-3 hover:bg-gray-50 transition-colors duration-200 group
                      ${isActive ? 'bg-gray-50' : ''}
                      ${isPending ? 'opacity-60' : ''}
                    `}
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-xs font-medium text-gray-400 mt-0.5 w-4 flex-shrink-0">
                      {currentPage * storiesPerPage + index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 leading-tight group-hover:text-gray-700 transition-colors line-clamp-2">
                        {story.title}
                      </h3>
                      <div className="flex items-center space-x-1.5 text-xs text-gray-500 mt-1">
                        <span className="font-medium">{story.score}</span>
                        <span className="text-gray-400">points</span>
                        <span className="text-gray-300">•</span>
                        <span>{story.by}</span>
                        <span className="text-gray-300">•</span>
                        <span>{story.descendants || 0}</span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                  className="px-3 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <span className="text-xs text-gray-500">
                  Page {currentPage + 1} of {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="px-3 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  )
}
