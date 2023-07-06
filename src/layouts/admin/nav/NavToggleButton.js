import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
// hooks
import { useResponsive } from '../../../hooks';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// config
import { DRAWER_WIDTH } from '../../../config';
// components
import { Iconify } from '../../../components';
// icons
import chevronLeft from '@iconify/icons-carbon/chevron-left';
import chevronRight from '@iconify/icons-carbon/chevron-right';

// ----------------------------------------------------------------------

NavToggleButton.propTypes = {
  isNavMini: PropTypes.bool,
  onToggleLayout: PropTypes.func,
  sx: PropTypes.object,
};

export default function NavToggleButton({ isNavMini, onToggleLayout, sx, ...other }) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'lg');

  if (!isDesktop) {
    return null;
  }

  return (
    <IconButton
      size="small"
      onClick={onToggleLayout}
      sx={{
        p: 0.5,
        top: 32,
        position: 'fixed',
        left: DRAWER_WIDTH - 12,
        zIndex: theme.zIndex.appBar + 1,
        border: `dashed 1px ${theme.palette.divider}`,
        ...bgBlur({ opacity: 0.48, color: theme.palette.background.default }),
        '&:hover': {
          bgcolor: theme.palette.action.hover,
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify
        width={16}
        icon={isNavMini ? chevronRight : chevronLeft}
      />
    </IconButton>
  );
}
