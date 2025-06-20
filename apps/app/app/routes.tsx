import { routes } from 'virtual:routes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

export const router = createBrowserRouter(routes)

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector('#app')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
