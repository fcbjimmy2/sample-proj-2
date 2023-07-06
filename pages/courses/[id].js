import { useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Stack, Container, Typography, Divider } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
// auth
import PublicGuard from '../../src/auth/PublicGuard';
// hooks
import { useRequest, useResponsive } from '../../src/hooks';
// layouts
import Layout from '../../src/layouts';
// components
import {
  Page,
  ErrorScreen,
  LoadingScreen,
  DialogAnimate,
  SocialsButton,
} from '../../src/components';
// sections
import {
  ReviewForm,
  ReviewSummary,
  ReviewCourseList,
  ReviewToolbar,
} from '../../src/sections/reviews';
import {
  CourseMain,
  CourseInfo,
  CourseSimilar,
  CourseDetails,
  CourseTeachersInfo,
} from '../../src/sections/courses';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function CoursePage() {
  const router = useRouter();

  const isDesktop = useResponsive('up', 'md');

  const [sort, setSort] = useState('latest');
  const [openForm, setOpenForm] = useState(false);
  const [filter, setFilter] = useState(null);

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handleChangeFilters = (event) => {
    setFilter(event.target.value);
  };

  const { id } = router.query;

  const { data: courses = [] } = useRequest('/api/courses');

  const {
    data: course,
    error: courseError,
    isLoading: courseLoading,
  } = useRequest(id ? `/api/courses/${id}` : '');

  if (courseError) {
    return <ErrorScreen />;
  }

  if (courseLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page title={`${course.slug} - E-Learning`}>
      <RootStyle>
        <CourseMain course={course} />

        <Container
          sx={{
            pt: { xs: 10, md: 10 },
            pb: { xs: 15, md: 10 },
          }}
        >
          <Grid container spacing={8}>
            {!isDesktop && (
              <Grid item xs={12}>
                <CourseInfo course={course} />
              </Grid>
            )}

            <Grid item xs={12} md={7} lg={8}>
              <CourseDetails course={course} />
              <Stack spacing={2} direction="row" sx={{ mt: 5 }}>
                <Typography variant="subtitle2" sx={{ mt: 0.5, color: 'text.primary' }}>
                  Share:
                </Typography>
                <SocialsButton initialColor simple={false} links={course.shareLinks} />
              </Stack>

              <Divider sx={{ my: 5 }} />
              <CourseTeachersInfo teachers={course.teachers} />
            </Grid>

            <Grid item xs={12} md={5} lg={4}>
              <Stack spacing={5}>
                {isDesktop && <CourseInfo course={course} />}
              </Stack>
            </Grid>
          </Grid>
        </Container>

        <Divider
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        />

        <Container
          sx={{
            pt: { md: 15 },
          }}
        >
          <Grid item xs={12} md={7} lg={8}>
            <ReviewToolbar sort={sort} onChangeSort={handleChangeSort} />
          </Grid>

          <Grid container spacing={8} direction="row-reverse">
            <Grid item xs={12} md={5} lg={4}>
              <ReviewSummary
                reviews={course.reviews}
                ratings={course.ratings}
                filter={filter}
                onChangeFilters={handleChangeFilters}
                onOpenForm={() => setOpenForm(true)}
              />
              <DialogAnimate open={openForm} onClose={() => setOpenForm(false)}>
                <ReviewForm onClose={() => setOpenForm(false)} />
              </DialogAnimate>
            </Grid>

            <Grid item xs={12} md={7} lg={8}>
              <ReviewCourseList reviews={course.courseReviews} />
            </Grid>
          </Grid>
        </Container>

        <CourseSimilar courses={courses.slice(-3)} />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

CoursePage.getLayout = function getLayout(page) {
  return (
    <PublicGuard>
      <Layout>{page}</Layout>
    </PublicGuard>
  );
};
