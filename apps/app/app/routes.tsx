import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { routes } from 'virtual:routes'

export const router = createBrowserRouter(routes)
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector('#app')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
