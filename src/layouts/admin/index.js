import PropTypes from 'prop-types';
import { useState } from 'react';

import { Provider } from 'react-redux';

import { store } from '../../store';

// config
import { 
  HEADER_MOBILE_HEIGHT, 
  HEADER_DESKTOP_HEIGHT, 
  DRAWER_WIDTH,
  DRAWER_MINI_WIDTH  
} from '../../config';
// @mui
import { Box } from '@mui/material';
// hooks
import { useResponsive } from '../../hooks';
// auth
import AuthGuard from '../../auth/AuthGuard';
//
import Header from './header';
import NavMini from './nav/NavMini';
import Nav from './nav/Nav';

import { Page } from '../../components/admin';

// ----------------------------------------------------------------------

AdminLayout.propTypes = {
  children: PropTypes.node,
};

export default function AdminLayout({ children }) {  
  const [isNavMini, setIsNavMini] = useState(false);

  const onToggleLayout = () => {
    setIsNavMini(!isNavMini)
  };
  
  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const nav = <Nav openNav={open} onCloseNav={handleClose} isNavMini={isNavMini} onToggleLayout={onToggleLayout} />;

  const renderContent = () => {
    return (      
      <AuthGuard isAdmin>
        <Provider store={store}>
          <Header isNavMini={isNavMini} onOpenNav={handleOpen} />

          <Box
            sx={{
              display: { lg: 'flex' },
              minHeight: '100%',
              bgcolor: 'background.default'
            }}
          >

            {isNavMini ? (isDesktop ? <NavMini isNavMini={isNavMini} onToggleLayout={onToggleLayout} /> : nav) : nav}

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                pt: `${HEADER_MOBILE_HEIGHT + 8}px`,
                pb: `${48}px`,
                px: 2,
                ...(isDesktop && {
                  pt: `${HEADER_DESKTOP_HEIGHT + 8}px`,
                  width: `calc(100% - ${DRAWER_WIDTH}px)`,
                  ...(isNavMini && {
                    width: `calc(100% - ${DRAWER_MINI_WIDTH}px)`,
                  }),
                }),
              }}
            >
              <Page>
                {children}
              </Page>              
            </Box>
          </Box>
        </Provider>
      </AuthGuard>
    );
  };

  return renderContent();
}
