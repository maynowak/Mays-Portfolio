import { useEffect, useState } from 'react';

/**
 * true, wenn das Browser-Tab sichtbar UND fokussiert ist.
 * Dekorative Daueranimationen werden darüber pausiert, damit im
 * Hintergrund keine Arbeit (und kein Akku) verbraucht wird.
 */
export function usePageActive(): boolean {
  const [active, setActive] = useState(() =>
    typeof document === 'undefined' ? true : document.visibilityState === 'visible',
  );

  useEffect(() => {
    const sync = () => setActive(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('focus', sync);
    window.addEventListener('blur', sync);
    return () => {
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('focus', sync);
      window.removeEventListener('blur', sync);
    };
  }, []);

  return active;
}
