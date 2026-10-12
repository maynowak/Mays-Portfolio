import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'mn-theme';
const DEFAULT_THEME: Theme = 'dark';

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  return window.localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : DEFAULT_THEME;
}

/** Farbschema: dunkel ist die Markenwelt, hell per Umschalter. Wird persistiert. */
export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
