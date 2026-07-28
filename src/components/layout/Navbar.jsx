import { NavLink } from 'react-router-dom';

const navigationItems = [
  { path: '/', label: 'Accueil', end: true },
  { path: '/equipe', label: 'Équipe' },
  { path: '/projets', label: 'Projets' },
  { path: '/contact', label: 'Contact' },
];

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Navigation principale">
        <NavLink className="site-logo" to="/">
          LOG3500 Portfolio
        </NavLink>

        <ul className="navigation-list">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'navigation-link active' : 'navigation-link'
                }
                end={item.end}
                to={item.path}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;