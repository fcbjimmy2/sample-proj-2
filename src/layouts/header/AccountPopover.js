import { useState } from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// next
import { useRouter } from 'next/router';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, MenuItem } from '@mui/material';
// auth
import { useAuthContext } from '../../../src/auth/useAuthContext';
// components
import { CustomAvatar } from '../../../src/components/custom-avatar';
import { useSnackbar } from '../../../src/components/snackbar';
import MenuPopover from '../../../src/components/menu-popover';
import { IconButtonAnimate } from '../../../src/components/animate';
// config
import { BASE_URL } from '../../../src/config';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { push } = useRouter();

  const { user, logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path) => {
    handleClosePopover();
    //push(path);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar src={`${BASE_URL}/avatars/user.png`} alt={user?.fullName} name={user?.fullName} />
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.fullName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => handleClickItem('')} sx={{ m: 1 }}>
          <FormattedMessage id="profile" />
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          <FormattedMessage id="logout" />
        </MenuItem>
      </MenuPopover>
    </>
  );
}
