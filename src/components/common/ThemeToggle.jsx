import useLanguage from '../../hooks/useLanguage.js';
import useTheme from '../../hooks/useTheme.js';
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { translate } = useLanguage();

  const isDarkMode = theme === 'dark';

  const buttonLabel = isDarkMode
    ? translate('controls.enableLightMode')
    : translate('controls.enableDarkMode');

  return (
    <button
      className="preference-control theme-toggle"
      type="button"
      aria-label={buttonLabel}
      aria-pressed={isDarkMode}
      title={buttonLabel}
      onClick={toggleTheme}
    >
      <span aria-hidden="true">
        {isDarkMode ? '☀️' : '🌙'}
      </span>

      <span className="preference-control-text">
        {isDarkMode
          ? translate('controls.light')
          : translate('controls.dark')}
      </span>
    </button>
  );
}

export default ThemeToggle;