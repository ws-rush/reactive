import { Outlet } from 'react-router'
import { MainHeader } from './components/MainHeader'
import { MobileNav } from './components/MobileNav'
import { StorySidebar } from './components/StorySidebar'
import { cn } from '@/lib/utils'

export default function ShellLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200 flex flex-col">
      <MainHeader />

      {/* Main Layout Area */}
      <div className="flex-1 container-page py-6 lg:py-8 flex gap-8 items-start relative pb-20 lg:pb-8">
        {/* Sidebar - Hidden on mobile, visible on LG screens. 
            On LG screens, it's always visible as a list.
        */}
        <aside className="hidden lg:block sticky top-20 h-[calc(100vh-7rem)] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 flex-shrink-0">
          <StorySidebar />
        </aside>

        {/* Main Content Area */}
        <main
          className={cn(
            'flex-1 min-w-0 w-full animate-fade-in',
            // On mobile: if we are NOT on an item view, we assume we show the feed (which is the index route content)
            // But wait, the Sidebar IS the feed list on desktop.
            // On Mobile, the 'Outlet' renders the Feed OR the Item.
          )}
        >
          {/* 
              Responsive Logic:
              - Mobile: Outlet renders Feed or Item. Sidebar is hidden.
              - Desktop: Sidebar renders Feed. Outlet renders Content (Item) or Placeholder.
              
              Caveat: If Outlet renders Feed, and Sidebar renders Feed, we have double content on Desktop.
              Solution: The Feed Routes (_shell.new, etc) should act as the "Content" placeholder if no item selected?
              OR: We hide the Outlet content on Desktop if it is a Feed route?
              
              Let's accept duplication for a moment or hide the Outlet feed on desktop.
              Better: The feed routes ARE the list. 
              If we want Master-Detail:
              - Sidebar shows List.
              - Main area shows Item Details.
              - What if no item is selected? Main area shows "Select a story".
              
              So, if we are on a Feed Route (e.g. /new), the Outlet renders the Feed. 
              On Desktop, we might want to HIDE this Outlet content because the Sidebar shows it?
              NO. Current design:
              - Mobile: /new -> List
              - Desktop: /new -> List (in Main) + Empty Sidebar? 
              
              User asked for "show list as sidebar".
              This implies:
              - Desktop: Sidebar (List) + Main (Details or "Select Story").
              
              So, IF on Desktop AND on a "List Route", we should hide the Outlet List and show a placeholder?
              Let's handle this in the Route components themselves using CSS or in the ShellLayout.
              CSS is easiest: `lg:hidden` on the feed list container in the route.
           */}
          <Outlet />
        </main>
      </div>

      <MobileNav />
    </div>
  )
}
