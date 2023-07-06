import { useEffect, useState, useCallback } from 'react';
// utils
import axios from '../../src/utils/axios';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// third-party
import { useIntl } from 'react-intl';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
// layouts
import Layout from '../../src/layouts';
// components
import { Page, ErrorScreen, LoadingScreen } from '../../src/components';
import { useSettings } from '../../src/hooks';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function PrivacyPolicyPage() {
  const { locale } = useSettings();
  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState('');
  const [error, setError] = useState(false);

  const intl = useIntl();

  const initialize = useCallback(async () => {
    try {
      const response = await axios.get('/api/terms-of-service');
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(true);
    }
  }, [locale]);
  
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  if (error) {
    return <ErrorScreen />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page title={intl.formatMessage({id: 'privacy-policy'})}>
      <RootStyle>
        <Container>
          <Typography variant="h4" sx={{ mb: 3, color: 'text.primary' }}>
            {intl.formatMessage({id: 'terms-of-service'})}
          </Typography>
          <Typography sx={{ color: 'text.primary' }} dangerouslySetInnerHTML={{__html: data}} />
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

PrivacyPolicyPage.getLayout = function getLayout(page) {
  return (
    <Layout>{page}</Layout>
  );
};