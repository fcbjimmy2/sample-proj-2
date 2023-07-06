// @mui
import { styled } from '@mui/material/styles';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../src/config';
// auth
import PublicGuard from '../src/auth/PublicGuard';
// hooks
import { useRequest } from '../src/hooks';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
// sections
import {
  HomeMain,
  HomeAbout,
  HomeCoreValues,
  HomeTeachingTeam,
  HomeCustomerSay
} from '../src/sections/home';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function Index() {
  const {     
    data = {teachingTeam: [], customerSays: []},
    error,
    isLoading,
  } = useRequest('/api/home');

  return (
    <Page>
      <RootStyle>
        <HomeMain />

        <HomeAbout />

        <HomeCoreValues />

        <HomeTeachingTeam teachingTeam={data.teachingTeam} />

        <HomeCustomerSay testimonials={data.customerSays} />

      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

Index.getLayout = function getLayout(page) {
  return (
    <PublicGuard>
      <Layout>{page}</Layout>
    </PublicGuard>
  );
};
