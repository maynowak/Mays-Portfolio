import { useEffect, useRef, useState } from 'react';

/**
 * true, wenn das Element gerade im sichtbaren Bereich liegt.
 * Dekorative Daueranimationen werden außerhalb pausiert.
 */
export function useInView<T extends Element = Element>(rootMargin = '160px') {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Ohne IntersectionObserver bleibt der Startwert `true` — Inhalte sind
    // dann immer sichtbar und vollständig bedienbar.
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting);
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
