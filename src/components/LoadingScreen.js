import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { LinearProgress, Box } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 9998,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

LoadingScreen.propTypes = {
  sx: PropTypes.object,
};

export default function LoadingScreen() {
  return (
    <>
      <RootStyle>
        <LinearProgress sx={{ width: 1, maxWidth: 320, m: 5 }} />
      </RootStyle>
    </>
  );
}
