// next
import NextLink from 'next/link';
// @mui
import { Box, Container, Link, Typography } from '@mui/material';
// third-party
import { useIntl } from 'react-intl';
// config
import { BASE_URL } from '../../config';

// ----------------------------------------------------------------------

export default function Footer() {
  const intl = useIntl();

  return (   
    <Box
      component="footer"
      sx={{
        py: 4,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Typography sx={{ color: 'text.secondary', typography: 'subtitle2', mb: 1 }}> 
          <Link component={NextLink} sx={{ color: 'text.secondary', typography: 'subtitle2' }} href={`${BASE_URL}/terms-of-service`}>
            {intl.formatMessage({id: 'terms-of-service'})}
          </Link>
          {' | '} 
          <Link component={NextLink} sx={{ color: 'text.secondary', typography: 'subtitle2' }} href={`${BASE_URL}/privacy-policy`}>
            {intl.formatMessage({id: 'privacy-policy'})}
          </Link>
        </Typography>
        <Typography variant="body3" sx={{ color: 'text.secondary' }}>
          © 2021. All rights reserved
        </Typography>
      </Container>
    </Box>
  );
}
