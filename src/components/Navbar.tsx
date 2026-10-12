import { useEffect, useState } from 'react';
import type { Theme } from '../hooks/useTheme';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './icons';

const NAV_ITEMS = [
  { href: '#projekte', label: 'Projekte' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#ueber-mich', label: 'Über mich' },
  { href: '#kontakt', label: 'Kontakt' },
] as const;

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="#top" aria-label="Zur Startseite (May Nowak)">
          <span className="brand-mark" aria-hidden="true">
            MN
          </span>
          <span>May Nowak</span>
        </a>

        <nav aria-label="Hauptnavigation">
          <ul
            id="nav-menu"
            className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}
            style={{ listStyle: 'none' }}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a className="nav__link" href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="icon-button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Zu hellem Farbschema wechseln' : 'Zu dunklem Farbschema wechseln'}
            aria-pressed={theme === 'light'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className="icon-button nav__burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
