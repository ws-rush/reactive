import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

export function Loader() {
  return (
    <div className="h-screen grid place-items-center">
      <h1>I am Loader, Put your Logo here</h1>
    </div>
  )
}

createRoot(document.querySelector('#root') as Element).render(
  <StrictMode>
    <RouterProvider
      fallbackElement={<Loader />}
      router={router}
    />
  </StrictMode>
)
