import useLanguage from '../../hooks/useLanguage.js';

function LanguageSelector() {
  const {
    language,
    changeLanguage,
    translate,
  } = useLanguage();

  return (
    <div className="language-control">
      <label
        className="visually-hidden"
        htmlFor="language-selector"
      >
        {translate('controls.language')}
      </label>

      <select
        id="language-selector"
        className="preference-control language-selector"
        value={language}
        aria-label={translate('controls.language')}
        onChange={(event) =>
          changeLanguage(event.target.value)
        }
      >
        <option value="fr">FR</option>
        <option value="en">EN</option>
        <option value="ht">HT</option>
      </select>
    </div>
  );
}

export default LanguageSelector;