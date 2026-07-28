import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import ThemeContext from './theme-context.js';

function getInitialTheme() {
  const savedTheme = localStorage.getItem('log3500-theme');

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  return prefersDarkMode ? 'dark' : 'light';
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('log3500-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light',
    );
  }

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;