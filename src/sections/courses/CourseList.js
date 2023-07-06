import PropTypes from 'prop-types';
// @mui
import { Pagination, Box } from '@mui/material';
// components
import CourseItemSkeleton from './CourseItemSkeleton';
import CourseItem from './CourseItem';

// ----------------------------------------------------------------------

CourseList.propTypes = {
  loading: PropTypes.bool,
  courses: PropTypes.array,
};

export default function CourseList({ courses, loading }) {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          columnGap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {(loading ? [...Array(8)] : courses).map((course, index) =>
          course ? <CourseItem key={course.id} course={course} vertical /> : <CourseItemSkeleton key={index} vertical />
        )}
      </Box>

      <Pagination
        count={10}
        color="primary"
        size="large"
        sx={{
          pt: 10,
          pb: { xs: 10, md: 15 },
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
