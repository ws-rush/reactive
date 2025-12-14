import { Outlet } from 'react-router'
import { MainHeader } from './components/MainHeader'
import { MobileNav } from './components/MobileNav'

export default function ShellLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
      <MainHeader />

      <main className="container-page py-6 pb-20 lg:pb-8 animate-fade-in">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
          {/* Future Right Sidebar could go here */}
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
