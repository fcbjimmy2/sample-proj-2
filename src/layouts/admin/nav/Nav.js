import PropTypes from 'prop-types';
import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Stack, Drawer } from '@mui/material';
// hooks
import { useResponsive } from '../../../hooks';
// config
import { DRAWER_WIDTH } from '../../../config';
// components
import { Logo, Scrollbar } from '../../../components';
import { NavSection } from '../../../components/admin';
//
import { adminNavConfig } from '../../../nav-config';
import NavToggleButton from './NavToggleButton';

// ----------------------------------------------------------------------

Nav.propTypes = {
  isNavMini: PropTypes.bool,
  onToggleLayout: PropTypes.func,
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ isNavMini, onToggleLayout, openNav, onCloseNav }) {
  const { pathname } = useRouter();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        py: 2,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {!isDesktop && (
        <Stack
          spacing={3}
          sx={{
            pb: 2,
            px: 2.5,
            flexShrink: 0,
          }}
        >
          <Logo />        
        </Stack>
      )}

      <NavSection navConfig={adminNavConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: DRAWER_WIDTH },
      }}
    >
      <NavToggleButton isNavMini={isNavMini} onToggleLayout={onToggleLayout} />

      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: DRAWER_WIDTH,
              bgcolor: 'transparent',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
