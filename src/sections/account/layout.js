import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Button, Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// config
import { NAV } from '../../config';
// components
import Iconify from '../../components/Iconify';
//
import ProfileMenu from './menu';

// ----------------------------------------------------------------------

const ProfileLayout = ({ value, children }) => {
  const isMdUp = useResponsive('up', 'md');

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <>

      <Container>
        <Stack
          direction={{
            md: 'row',
          }}
          alignItems={{
            md: 'flex-start',
          }}
          sx={{
            mb: {
              xs: 8,
              md: 10,
            },
          }}
        >
          <ProfileMenu value={value} open={menuOpen} onClose={handleMenuClose} />

          <Box
            sx={{
              flexGrow: 1,
              pl: { md: 8 },
              width: { md: `calc(100% - ${NAV.W_DRAWER}px)` },
            }}
          >
            {children}
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default ProfileLayout;