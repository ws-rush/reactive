import { HydratedRouter } from 'react-router/dom'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

async function enableMocking() {
    const is_mocking = ['true', 'TRUE'].includes(import.meta.env.VITE_IS_MOCKING)
    if (!is_mocking) {
        return
    }

    const { worker } = await import('./mocks/browser')

    return worker.start()
}

enableMocking().then(() => {
    startTransition(() => {
        hydrateRoot(
            document,
            <StrictMode>
                <HydratedRouter />
            </StrictMode>
        )
    })
})
