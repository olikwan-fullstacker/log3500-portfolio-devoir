import { useContext } from 'react';

import ThemeContext from '../context/theme-context.js';

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme doit être utilisé dans un ThemeProvider.',
    );
  }

  return context;
}

export default useTheme;