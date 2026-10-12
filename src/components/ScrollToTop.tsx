'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable browser automatic scroll restoration so the page always starts at top
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    };

    // Instant execution
    scrollToTop();

    // Secondary passes to overcome any layout adjustments or image mounting
    const frameId = requestAnimationFrame(scrollToTop);
    const timeout1 = setTimeout(scrollToTop, 20);
    const timeout2 = setTimeout(scrollToTop, 100);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [pathname]);

  useEffect(() => {
    const handleReset = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    };

    window.addEventListener('pageshow', handleReset);
    window.addEventListener('load', handleReset);
    window.addEventListener('beforeunload', handleReset);

    return () => {
      window.removeEventListener('pageshow', handleReset);
      window.removeEventListener('load', handleReset);
      window.removeEventListener('beforeunload', handleReset);
    };
  }, []);

  return null;
}
