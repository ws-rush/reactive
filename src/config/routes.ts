import { createBrowserRouter } from 'react-router-dom'
import { routes } from 'virtual:routes'

console.log(routes)

export const router = createBrowserRouter(routes)