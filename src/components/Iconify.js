import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sx: PropTypes.object,
};

export default function Iconify({ icon, width = 20, sx, ...other }) {
  return <Box component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />;
}
