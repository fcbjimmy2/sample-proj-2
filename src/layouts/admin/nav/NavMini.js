import PropTypes from 'prop-types';
// @mui
import { Stack, Box } from '@mui/material';
// config
import { DRAWER_MINI_WIDTH } from '../../../config';
// utils
import { hideScrollbarX } from '../../../utils/cssStyles';
// components
import { NavSectionMini } from '../../../components/admin/nav-section';
//
import { adminNavConfig } from '../../../nav-config';
import NavToggleButton from './NavToggleButton';

// ----------------------------------------------------------------------

NavMini.propTypes = {
  isNavMini: PropTypes.bool,
  onToggleLayout: PropTypes.func
};

export default function NavMini({ isNavMini, onToggleLayout }) {
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: DRAWER_MINI_WIDTH },
      }}
    >
      <NavToggleButton isNavMini={isNavMini} onToggleLayout={onToggleLayout} 
        sx={{
          left: DRAWER_MINI_WIDTH - 12,
        }}
      />

      <Stack
        sx={{
          py: 2,
          height: 1,
          position: 'fixed',
          width: DRAWER_MINI_WIDTH,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <NavSectionMini navConfig={adminNavConfig} />
      </Stack>
    </Box>
  );
}
