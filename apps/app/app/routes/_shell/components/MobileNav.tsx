import { NavLink } from 'react-router'

export function MobileNav() {
  return (
    <nav className="lg:hidden bg-white border-t border-gray-100 sticky bottom-0 z-40 backdrop-blur-xl bg-opacity-95">
      <div className="flex justify-around py-1">
        {[
          { to: '/', label: 'top' },
          { to: '/new', label: 'new' },
          { to: '/ask', label: 'ask' },
          { to: '/show', label: 'show' },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            prefetch="viewport"
            viewTransition
            className={({ isPending, isActive }) => `
              flex flex-col items-center p-2 text-xs font-medium transition-all duration-200
              ${isActive ? 'text-gray-900' : 'text-gray-500'}
              ${isPending ? 'opacity-60' : ''}
            `}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
