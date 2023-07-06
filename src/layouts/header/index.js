import PropTypes from 'prop-types';
// third-party
import { FormattedMessage } from 'react-intl';
// next
import NextLink from 'next/link';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Box, Stack, Button, AppBar, Toolbar, Container } from '@mui/material';
// hooks
import { useOffSetTop, useResponsive } from '../../hooks';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../config';
// auth
import { useAuthContext } from '../../../src/auth/useAuthContext';
// components
import { Logo } from '../../components';
//
import LanguagePopover from './LanguagePopover';
import DarkModeToggle from './DarkModeToggle';
import AccountPopover from './AccountPopover';
import { NavMobile, NavDesktop, publicNavConfig } from './nav';

// ----------------------------------------------------------------------

export default function Header() {
  const { isAuthenticated } = useAuthContext();

  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isLight = theme.palette.mode === 'light';

  const isScrolling = useOffSetTop(HEADER_DESKTOP_HEIGHT);

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER_MOBILE_HEIGHT,
            md: HEADER_DESKTOP_HEIGHT,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isScrolling && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER_DESKTOP_HEIGHT - 16,
            },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo onDark={!isScrolling} />
          </Box>

          {isDesktop && (
            <NavDesktop
              isScrolling={isScrolling}
              isTransparent={isScrolling}
              navConfig={publicNavConfig}
            />
          )}

          <Box sx={{ flexGrow: 1 }} />
          
          <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }}>
            <DarkModeToggle />

            <LanguagePopover />           

            {isDesktop && !isAuthenticated && (
              <Stack direction="row" spacing={1}>
                <Button 
                  component={NextLink}
                  color="inherit" 
                  variant="outlined" 
                  href="/user/register"
                  sx={{
                    ...(!isLight && { color: 'common.white' }),
                    ...(isLight && { color: 'text.primary' }),
                  }}
                >
                  <FormattedMessage id="sign-up" />
                </Button>

                <Button 
                  component={NextLink}
                  variant="contained" 
                  href="/user/login"
                >
                  <FormattedMessage id="login" />
                </Button>
              </Stack>
            )}

            {isDesktop && isAuthenticated && (<AccountPopover />)}

            {!isDesktop && (
              <NavMobile
                navConfig={publicNavConfig}
                sx={{
                  ml: 0.5,
                  ...(isScrolling && { color: 'text.primary' }),
                }}
              />
            )}
          </Stack>
        </Container>
      </Toolbar>

      {isScrolling && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

Shadow.propTypes = {
  sx: PropTypes.object,
};

function Shadow({ sx, ...other }) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}