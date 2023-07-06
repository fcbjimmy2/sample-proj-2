import PropTypes from 'prop-types';
// icon
import rotate360 from '@iconify/icons-carbon/rotate-360';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Stack, Button } from '@mui/material';
//
import Image from './Image';
import Iconify from './Iconify';
// next
import { useRouter } from 'next/router';
// third-party
import { useIntl } from 'react-intl';
// config
import { BASE_URL } from '../config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

ErrorScreen.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default function ErrorScreen({ title, description, ...other }) {
  const router = useRouter();

  const handleReload = () => {
    router.reload();
  };

  const intl = useIntl();

  const theme = useTheme();
  
  const isLight = theme.palette.mode === 'light';
  
  return (
    <RootStyle {...other}>
      <Stack spacing={5} alignItems="center">
        <Image
          alt="500"
          src={`${BASE_URL}/assets/500.svg`}
          sx={{ maxWidth: 240 }}
        />

        <Stack spacing={2}>
          <Typography variant="h3" sx={{ color: 'text.primary' }}> {title || intl.formatMessage({id: 'unexpected-error-occurred'})}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {description || 'Unable to download data please try again'}
          </Typography>
        </Stack>
        <Button
          variant="outlined"
          size="large"
          color="inherit"
          startIcon={<Iconify icon={rotate360} sx={{ width: 20, height: 20 }} />}
          onClick={handleReload}
          sx={{
            ...(!isLight && { color: 'common.white' }),
          }}
        >
          Reload
        </Button>
      </Stack>
    </RootStyle>
  );
}
