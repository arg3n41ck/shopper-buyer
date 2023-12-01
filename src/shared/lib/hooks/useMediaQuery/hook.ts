import React from 'react'
import { screenSizes, screenType } from './config'

export function useMediaQuery(screen: screenType): boolean | undefined {
  const query = `(max-width: ${screenSizes[screen]}px)`
  const [matches, setMatches] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const updateMatches = (event: MediaQueryListEvent) => setMatches(event.matches)
    media.addEventListener('change', updateMatches)

    return () => media.removeEventListener('change', updateMatches)
  }, [query])

  return matches
}
