import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// icons
import menuIcon from '@iconify/icons-carbon/menu';
import chevronRight from '@iconify/icons-carbon/chevron-right';
import chevronDown from '@iconify/icons-carbon/chevron-down';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Stack,
  Button,
  Drawer,
  Collapse,
  ListItemText,
  ListItemButton,
} from '@mui/material';
// config
import { DRAWER_WIDTH, BASE_URL } from '../../../config';
// components
import { Logo, Scrollbar, Iconify, NavSection } from '../../../components';
import { IconButtonAnimate } from '../../../components/animate';
//
import NavAccount from './NavAccount';
import { useSnackbar } from '../../../components/snackbar';

// ----------------------------------------------------------------------

const RootLinkStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active, theme }) => ({  
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 48,
  // Active
  ...(active && {
    color: theme.palette.primary.main,
    ...theme.typography.subtitle2,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }),
}));

// ----------------------------------------------------------------------

NavMobile.propTypes = {
  navConfig: PropTypes.array.isRequired,
  sx: PropTypes.object,
};

export default function NavMobile({ navConfig, sx }) {
  const { isAuthenticated, logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const { pathname, push } = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLogout = async () => {
    try {
      logout();
      handleDrawerClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <>
      <IconButtonAnimate 
        onClick={handleDrawerOpen}
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <Iconify icon={menuIcon} sx={{ width: 40, height: 40 }} />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: { width: DRAWER_WIDTH },
        }}
      >
        <Scrollbar>
          <Box sx={{ px: 2.5, py: 3, lineHeight: 0 }}>
            <Logo />
          </Box>

          <List sx={{ px: 0 }}>
            {navConfig.map((link, index) => (
              <NavItemMobile key={index} item={link} />
            ))}
          </List>

          {!isAuthenticated && (
            <Stack spacing={2} sx={{ p: 2.5, pb: 5 }}>
              <Button fullWidth component={NextLink} href="/user/login" variant="outlined" color="inherit">
                <FormattedMessage id="login" />
              </Button>

              <Button fullWidth component={NextLink} href="/user/register" variant="contained" color="inherit">
                <FormattedMessage id="sign-up" />
              </Button>
            </Stack>
          )}

          {isAuthenticated && (
            <Stack spacing={2} sx={{ p: 2.5, pb: 5 }}>
              <NavAccount />

              <Button fullWidth onClick={() => {}}  variant="outlined" color="inherit">
                <FormattedMessage id="profile" />
              </Button>

              <Button fullWidth onClick={handleLogout} variant="outlined" color="inherit">
                <FormattedMessage id="logout" />
              </Button>
            </Stack>
          )}
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

NavItemMobile.propTypes = {
  item: PropTypes.object,
};

function NavItemMobile({ item }) {
  const { pathname } = useRouter();

  const { title, path, children } = item;

  const isSubActive = (subChildren) => {
    return (!!subChildren && !!subChildren.find(element => !!element && (element.path === pathname || isSubActive(element.children))));
  };

  const isActive = pathname === path || isSubActive(children);

  const [open, setOpen] = useState(isActive);

  const handleOpen = () => {
    setOpen(!open);
  };

  if (children) {
    return (
      <>
        <RootLinkStyle onClick={handleOpen} active={isActive}>
          <ListItemText disableTypography primary={title} />
          <Iconify icon={open ? chevronDown : chevronRight} sx={{ width: 16, height: 16, ml: 1 }} />
        </RootLinkStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <NavSection
              navConfig={children}
              sx={{
                // Root
                position: 'relative',
                '&:before': {
                  top: 0,
                  bottom: 0,
                  height: 0.96,
                  my: 'auto',
                  left: 20,
                  width: '1px',
                  content: "''",
                  bgcolor: 'divider',
                  position: 'absolute',
                },
                '& .MuiListSubheader-root': { mb: 1 },
                '& .MuiListItemButton-root': {
                  backgroundColor: 'transparent',
                  '&:before': { display: 'none' },
                },
                // Sub
                '& .MuiCollapse-root': {
                  '& .MuiList-root': {
                    '&:before': {
                      top: 0,
                      bottom: 0,
                      left: 40,
                      my: 'auto',
                      height: 0.82,
                      width: '1px',
                      content: "''",
                      bgcolor: 'divider',
                      position: 'absolute',
                    },
                  },
                  '& .MuiListItemButton-root': {
                    pl: 8,
                    '& .MuiListItemIcon-root, .MuiTouchRipple-root': {
                      display: 'none',
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  },
                },
              }}
            />
          </Box>
        </Collapse>
      </>
    );
  }

  return (
    <RootLinkStyle component={NextLink} href={path} active={isActive}>
      <ListItemText disableTypography>{title}</ListItemText>
    </RootLinkStyle>
  );
}
