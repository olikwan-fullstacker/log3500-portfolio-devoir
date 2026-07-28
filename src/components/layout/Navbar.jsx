import { NavLink } from 'react-router-dom';

import LanguageSelector from '../common/LanguageSelector.jsx';
import ThemeToggle from '../common/ThemeToggle.jsx';
import useLanguage from '../../hooks/useLanguage.js';

const navigationItems = [
  {
    path: '/',
    translationKey: 'nav.home',
    end: true,
  },
  {
    path: '/equipe',
    translationKey: 'nav.team',
  },
  {
    path: '/projets',
    translationKey: 'nav.projects',
  },
  {
    path: '/contact',
    translationKey: 'nav.contact',
  },
];

function Navbar() {
  const { translate } = useLanguage();

  return (
    <header className="site-header">
      <nav
        className="navbar"
        aria-label="Navigation principale"
      >
        <NavLink className="site-logo" to="/">
          Développeurs Pros
        </NavLink>

        <div className="navbar-right">
          <ul className="navigation-list">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'navigation-link active'
                      : 'navigation-link'
                  }
                  end={item.end}
                  to={item.path}
                >
                  {translate(item.translationKey)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div
            className="navigation-preferences"
            aria-label="Préférences d’affichage"
          >
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;