import { useContext } from 'react';

import LanguageContext from '../context/language-context.js';

function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage doit être utilisé dans un LanguageProvider.',
    );
  }

  return context;
}

export default useLanguage;