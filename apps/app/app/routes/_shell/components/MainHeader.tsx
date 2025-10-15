import { NavLink } from 'react-router'

export function MainHeader() {
  return (
    <header className="sticky top-0 left-80 right-0 z-30 bg-white border-b border-gray-100 backdrop-blur-xl bg-opacity-95">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <nav className="hidden lg:flex items-center space-x-1 text-sm">
            {[
              { to: '/', label: 'top' },
              { to: '/new', label: 'new' },
              { to: '/best', label: 'best' },
              { to: '/ask', label: 'ask' },
              { to: '/show', label: 'show' },
              { to: '/jobs', label: 'jobs' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                prefetch="viewport"
                viewTransition
                className={({ isPending, isActive }) => `
                  px-3 py-1.5 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 font-medium
                  ${isActive ? 'text-gray-900 bg-gray-100' : ''}
                  ${isPending ? 'opacity-60' : ''}
                `}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <NavLink
              to="/submit"
              prefetch="viewport"
              viewTransition
              className={({ isPending }) => `
                px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-all duration-200
                ${isPending ? 'opacity-60' : ''}
              `}
            >
              submit
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  )
}
