import PropTypes from 'prop-types';
import { useState } from 'react';
// icons
import searchIcon from '@iconify/icons-carbon/search';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Button, Divider, TextField } from '@mui/material';
// utils
import { bgBlur } from '../../utils/cssStyles';
// components
import { Iconify } from '../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

const BarStyle = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'onDark',
})(({ onDark, theme }) => ({
  width: '100%',
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.neutral,
  padding: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    ...(onDark && {
      ...bgBlur({
        blur: 4,
        opacity: 0.08,
        color: theme.palette.common.white,
      }),
      '& .MuiFilledInput-root': {
        color: theme.palette.common.white,
        '& .MuiFilledInput-input': {
          '&::placeholder': {
            color: theme.palette.grey[600],
          },
        },
        '& .MuiInputAdornment-root svg': {
          color: theme.palette.grey[600],
        },
      },
    }),
  },
}));

export const InputStyle = styled((props) => <TextField fullWidth {...props} />)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    backgroundColor: 'transparent',
    '&.Mui-focused, &:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiFilledInput-input': {
      ...theme.typography.subtitle1,
      padding: 0,
      height: 48,
    },
    '& .MuiInputAdornment-root': {
      marginTop: '0 !important',
    },
  },
}));

// ----------------------------------------------------------------------

CourseBarFilters.propTypes = {
  onDark: PropTypes.bool,
  sx: PropTypes.object,
};

export default function CourseBarFilters({ onDark = false, sx }) {
  const [departureDay, setDepartureDay] = useState(null);
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
  });

  return (
    <RootStyle sx={sx}>
      <BarStyle
        spacing={2.5}
        alignItems={{ md: 'center' }}
        direction="row"
        onDark={onDark}
      >
        <Stack
          spacing={2.5}
          sx={{ width: 1 }}
          alignItems="center"
          direction={{ xs: 'column', md: 'row' }}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: 'none', md: 'block' },
              }}
            />
          }
        >            
          <Box sx={{ width: 1, ...sx }}>
            <InputStyle
              variant="filled"
              placeholder="Search..."
            /> 
          </Box>    
        </Stack>

        <Button
          size="large"
          color="secondary"
          variant="contained"
          sx={{
            px: 0,
            flexShrink: 0,
            minWidth: 48,
          }}
        >
          <Iconify icon={searchIcon} sx={{ width: 20, height: 20 }} />
        </Button>
      </BarStyle>
    </RootStyle>
  );
}
