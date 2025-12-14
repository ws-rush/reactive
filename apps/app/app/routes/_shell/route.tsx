import React from 'react'
import { Outlet } from 'react-router'
import { type Story, getStories } from '@/lib/hacker-news-api'
import { MainHeader } from './components/MainHeader'
import { MobileNav } from './components/MobileNav'
import { StorySidebar } from './components/StorySidebar'

export default function ShellLayout() {
  // We'll get stories from the child routes instead
  const [stories, setStories] = React.useState<Story[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  // Load top stories by default for the sidebar
  React.useEffect(() => {
    getStories('top', 20)
      .then(setStories)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StorySidebar stories={stories} isLoading={isLoading} />

      <div className="flex-1 flex flex-col">
        <MainHeader />

        <main className="flex-1 px-4 py-4 pb-16 lg:pb-4 flex items-start justify-center">
          <div className="w-full max-w-2xl">
            <Outlet />
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  )
}
