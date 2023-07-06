// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
// auth
import PublicGuard from '../../src/auth/PublicGuard';
// hooks
import { useRequest } from '../../src/hooks';
// layouts
import Layout from '../../src/layouts';
// components
import { Page, ErrorScreen } from '../../src/components';
// sections
import { CourseList, CourseBarFilters } from '../../src/sections/courses';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function CoursesPage() {
  const { data: courses = [], error, isLoading } = useRequest('/api/courses');
  
  if (error) {
    return <ErrorScreen />;
  }

  return (
    <Page title="Courses">
      <RootStyle>
        <Container>
          <CourseBarFilters />

          <CourseList courses={courses} loading={isLoading} />
        </Container>

      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

CoursesPage.getLayout = function getLayout(page) {
  return (
    <PublicGuard>
      <Layout>{page}</Layout>
    </PublicGuard>
  );
};
