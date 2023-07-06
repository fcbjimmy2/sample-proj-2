// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Stack, Container, Typography } from '@mui/material';
// third-party
import { useIntl } from 'react-intl';
// layouts
import Layout from '../../src/layouts';
// auth
import GuestGuard from '../../src/auth/GuestGuard';
// components
import { Page, Image } from '../../src/components';
import { RegisterForm } from '../../src/sections/user';
// config
import { BASE_URL } from '../../src/config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(12, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(22, 0),
  },
}));

// ----------------------------------------------------------------------

export default function Register() {
  const intl = useIntl();

  return (
    <Page title={intl.formatMessage({id: 'sign-up'})}>
      <RootStyle>
        <Container>
          <Grid container spacing={5} justifyContent="space-between">
            <Grid item xs={12} md={7} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Image
                alt="register"
                src={`${BASE_URL}/assets/user.svg`}
              />
            </Grid>

            <Grid item xs={12} md={5} lg={4}>
              <Stack
                spacing={4}
                sx={{
                  p: 4,
                  textAlign: { xs: 'center', md: 'left' },
                  borderRadius: 2,
                  boxShadow: (theme) => theme.customShadows.z24,
                }}
              >
                <div>
                  <Typography variant="h3" paragraph sx={{ color: 'text.primary' }}>
                    {intl.formatMessage({id: 'sign-up'})}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {intl.formatMessage({id: 'already-have-account'})}
                    {' '} 
                    <Link component={NextLink} variant="subtitle2" color="primary" href="/user/login">
                      {intl.formatMessage({id: 'login'})}
                    </Link>
                  </Typography>
                </div>

                <RegisterForm />
                
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

Register.getLayout = function getLayout(page) {
  return (    
    <GuestGuard>
      <Layout disabledFooter>{page}</Layout>
    </GuestGuard>
  );
};
