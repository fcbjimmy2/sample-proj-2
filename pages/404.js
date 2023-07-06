import { m } from 'framer-motion';
import { useIntl } from 'react-intl';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Button, Typography } from '@mui/material';
// layouts
import Layout from '../src/layouts';
// components
import { Page, Image } from '../src/components';
import { MotionContainer, varBounce } from '../src/components/animate';
// config
import { BASE_URL } from '../src/config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(15, 2.5),
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
  },
}));

// ----------------------------------------------------------------------

export default function PageNotFound() {
  const intl = useIntl();

  return (
    <MotionContainer>
      <Page title={`404 ${intl.formatMessage({id: 'page-not-found'})}`}>
        <RootStyle>
          <Stack alignItems="center" sx={{ maxWidth: 480 }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph sx={{ color: 'text.primary' }}>
                { intl.formatMessage({id: 'page-not-found'}) }
              </Typography>
            </m.div>

            <m.div variants={varBounce().in}>
              <Image
                alt="404"
                src={`${BASE_URL}/assets/404.svg`}
                sx={{ maxWidth: 320, my: { xs: 6, sm: 8 } }}
              />
            </m.div>
            
            <Button 
              component={NextLink}
              size="large" 
              variant="contained"
              href={`${BASE_URL}/`}>
              { intl.formatMessage({id: 'go-to-home'}) }
            </Button>
          </Stack>
        </RootStyle>
      </Page>
    </MotionContainer>
  );
}

// ----------------------------------------------------------------------

PageNotFound.getLayout = function getLayout(page) {
  return (
    <Layout disabledHeader disabledFooter>
      {page}
    </Layout>
  );
};
