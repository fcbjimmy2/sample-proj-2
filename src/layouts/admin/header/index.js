import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, AppBar, Divider, Box, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// hooks
// hooks
import { useResponsive, useOffSetTop } from '../../../hooks';
// config
import { 
    HEADER_DESKTOP_HEIGHT, 
    HEADER_MOBILE_HEIGHT, 
    HEADER_DESKTOP_Y_OFFSET, 
    DRAWER_WIDTH, 
    DRAWER_MINI_WIDTH 
} from '../../../config';
// components
import { Iconify, Logo } from '../../../components';
// icons
import menu from '@iconify/icons-carbon/menu';
//
import DarkModeToggle from '../../header/DarkModeToggle';
import LanguagePopover from '../../header/LanguagePopover';
import AccountPopover from './AccountPopover';

// ----------------------------------------------------------------------
Header.propTypes = {
  isNavMini: PropTypes.bool,
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav, isNavMini }) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(HEADER_DESKTOP_HEIGHT);

  const renderContent = (
    <>
      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon={menu} />
        </IconButton>
      )}
      
      {isDesktop && (
        <Box sx={{ lineHeight: 0, position: 'relative' }}>
          <Logo />
        </Box>
      )}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"      
        spacing={{ xs: 0.5, sm: 1.5 }}
        sx={{ color: 'text.primary' }}
      >
        <DarkModeToggle />

        <LanguagePopover />  

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER_MOBILE_HEIGHT,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
          height: HEADER_DESKTOP_HEIGHT,
          ...(isOffset && {
            height: HEADER_DESKTOP_Y_OFFSET,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${DRAWER_MINI_WIDTH + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
