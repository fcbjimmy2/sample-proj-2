// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'react-18-image-lightbox/style.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// froala editor
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// tooltip
import 'tippy.js/dist/tippy.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

// editor
import 'react-quill/dist/quill.snow.css';

import { AuthProvider } from '../src/auth/JwtContext';

// ----------------------------------------------------------------------

import PropTypes from 'prop-types';
// next
import Head from 'next/head';
// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
// contexts
import { SettingsProvider } from '../src/contexts/SettingsContext';
// theme
import ThemeProvider from '../src/theme';

// components
import Locales from '../src/components/Locales';
import ProgressBar from '../src/components/ProgressBar';
import SnackbarProvider from '../src/components/snackbar';
import MotionLazyContainer from '../src/components/animate/MotionLazyContainer';

// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SettingsProvider>
            <ThemeProvider>
              <Locales>
                <MotionLazyContainer>
                  <SnackbarProvider>
                    <ProgressBar />
                    {getLayout(<Component {...pageProps} />)}
                  </SnackbarProvider>
                </MotionLazyContainer>
              </Locales>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </AuthProvider>
    </>
  );
}
