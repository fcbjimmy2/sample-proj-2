import PropTypes from 'prop-types';
// icons
import directionStraightRight from '@iconify/icons-carbon/direction-straight-right';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Stack, Button, Typography } from '@mui/material';
// components
import { Iconify } from '../../components';
//
import CourseItem from './CourseItem';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

CourseSimilar.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default function CourseSimilar({ courses }) {
  return (
    <RootStyle>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ mb: { xs: 8, md: 6 } }}
        >
          <Typography variant="h3" sx={{ color: 'text.primary' }}>Similar Courses</Typography>

          <Button component={NextLink} href="/courses" 
            endIcon={<Iconify icon={directionStraightRight} sx={{ width: 22, height: 22 }} />}
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
            }}
          >
            View All
          </Button>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 4,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {courses.map((course) => (
            <CourseItem key={course.id} course={course} vertical />
          ))}
        </Box>

        <Stack
          alignItems="center"
          sx={{
            mt: 8,
            display: { xs: 'flex', md: 'none' },
          }}
        >
          <Button component={NextLink} href="/courses" 
            endIcon={<Iconify icon={directionStraightRight} sx={{ width: 22, height: 22 }} />}
          >
            View All
          </Button>
        </Stack>
      </Container>
    </RootStyle>
  );
}
