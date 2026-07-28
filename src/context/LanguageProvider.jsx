import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import translations from '../data/translations.js';
import LanguageContext from './language-context.js';

const supportedLanguages = ['fr', 'en', 'ht'];

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem(
    'log3500-language',
  );

  if (supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  return 'fr';
}

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    getInitialLanguage,
  );

  useEffect(() => {
    document.documentElement.lang = language;

    localStorage.setItem(
      'log3500-language',
      language,
    );
  }, [language]);

  const changeLanguage = useCallback((nextLanguage) => {
    if (supportedLanguages.includes(nextLanguage)) {
      setLanguage(nextLanguage);
    }
  }, []);

  const translate = useCallback(
    (translationKey) => {
      const translatedValue = translationKey
        .split('.')
        .reduce(
          (currentValue, keyPart) =>
            currentValue?.[keyPart],
          translations[language],
        );

      return translatedValue ?? translationKey;
    },
    [language],
  );

  const contextValue = useMemo(
    () => ({
      language,
      changeLanguage,
      translate,
    }),
    [language, changeLanguage, translate],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;