import mitt from 'mitt'

import { useEffect } from 'react'
import { type NavigateOptions, type To, useNavigate } from 'react-router' // This hook should work

export const NAVIGATE_EVENT = 'APP_NAVIGATE' // Choose a unique event name

type NavigateEventPayload = {
  path: To
  options?: NavigateOptions
}

type Events = {
  [NAVIGATE_EVENT]: NavigateEventPayload
}

export const bus = mitt<Events>()

export function GlobalBusHandler() {
  const navigate = useNavigate()

  useEffect(() => {
    function handler(payload: NavigateEventPayload) {
      if (payload?.path) {
        navigate(payload.path, payload.options)
      }
    }

    bus.on(NAVIGATE_EVENT, handler)

    return () => {
      bus.off(NAVIGATE_EVENT, handler)
    }
  }, [navigate]) // Re-subscribe if navigate function instance changes (unlikely but good practice)

  return null // This component doesn't render anything visible
}
