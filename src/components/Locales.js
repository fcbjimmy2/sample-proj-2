import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// third-party
import { IntlProvider } from 'react-intl';
import { useSettings } from '../hooks';

// load locales files
const loadLocaleData = (locale) => {
    switch (locale) {
        case 'zh-Hant':
            return import('../utils/locales/zh-Hant.json');
        case 'zh-Hans':
            return import('../utils/locales/zh-Hans.json');
        case 'en':
            return import('../utils/locales/en.json');
    }
};

// ==============================|| LOCALIZATION ||============================== //

const Locales = ({ children }) => {
    const { locale } = useSettings();
    const [messages, setMessages] = useState();

    useEffect(() => {
        loadLocaleData(locale).then((d) => {
            setMessages(d.default);
        });
    }, [locale]);

    return (
        <>
            {messages && (
                <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
                    {children}
                </IntlProvider>
            )}
        </>
    );
};

Locales.propTypes = {
    children: PropTypes.node
};

export default Locales;
