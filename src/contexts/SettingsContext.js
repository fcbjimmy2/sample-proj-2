import PropTypes from 'prop-types';
import { createContext } from 'react';
// hooks
import { useLocalStorage } from '../hooks';
// config
import { defaultSettings } from '../config';

// ----------------------------------------------------------------------

const initialState = {
  ...defaultSettings,
  onToggleMode: () => {},
  onChangeLocale: () => {}
};

const SettingsContext = createContext(initialState);

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function SettingsProvider({ children }) {
  let defaultThemeMode = 'light';
  let defaultLocale = 'en';

  if (typeof window !== 'undefined') {
    const mediaQueryObj = window.matchMedia('(prefers-color-scheme: dark)');
    const isDarkMode = mediaQueryObj.matches;
    defaultThemeMode = isDarkMode ? 'dark' : 'light';

    if (typeof window.navigator !== 'undefined') {
      const intlLocale = new Intl.Locale(window.navigator.language);
      const language = intlLocale.language;
      const script = intlLocale.script;
      const region = intlLocale.region;
      if (language == 'zh' && ((!script && !region) || script == 'Hant' || region == 'HK' || region == 'MO' || region == 'TW')) {
        defaultLocale = 'zh-Hant';
      } else if (language == 'zh' && (script == 'Hans' || region == 'CN' || region == 'SG')) {
        defaultLocale = 'zh-Hans';
      }
    }
  }

  const [settings, setSettings] = useLocalStorage('settings', {
    ...defaultSettings,
    themeMode: defaultThemeMode,
    locale: defaultLocale
  });

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    });
  };

  const onChangeLocale = (locale) => {
      setSettings({
          ...settings,
          locale
      });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        onToggleMode,
        onChangeLocale
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
