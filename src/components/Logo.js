import PropTypes from 'prop-types';
import { memo } from 'react';
// config
import { 
  BASE_URL, 
  LOGO,
  LOGO_DARK
} from '../../src/config';
// components
import { Image } from '../../src/components';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  onDark: PropTypes.bool,
  sx: PropTypes.object,
};

function Logo({ onDark = false, sx }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        height: 40,
        lineHeight: 0,
        display: 'inline-flex',
        ...sx,
      }}
    >
      {(isLight && !onDark) ? (
        <Image
          src={`${BASE_URL}${LOGO}`}
          sx={{
            maxHeight: 40
          }}
        />
      ) : (
        <Image
          src={`${BASE_URL}${LOGO_DARK}`}
          sx={{
            maxHeight: 40
          }}
        />
      )}
    </Box>
  );
}

export default memo(Logo);
