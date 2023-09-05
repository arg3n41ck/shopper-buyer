import { useEffect, useState } from 'react';

type ScreenSize = 'small' | 'medium' | 'large';

const screenSizeBreakpoints: Record<ScreenSize, number> = {
  small: 576,
  medium: 768,
  large: 992,
};

function useScreenSize(width: number): ScreenSize {
  if (width < screenSizeBreakpoints.small) {
    return 'small';
  } else if (width < screenSizeBreakpoints.medium) {
    return 'medium';
  } else {
    return 'large';
  }
}

export function useWindowResize() {
  const isClient = typeof window === 'object';

  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  return windowSize;
}

export function useScreenSizeCheck(targetSize: ScreenSize): boolean {
  const isClient = typeof window === 'object';

  const { width } = useWindowResize();

  if (!isClient) {
    return false;
  }

  const currentSize = useScreenSize(width);

  return currentSize === targetSize;
}
