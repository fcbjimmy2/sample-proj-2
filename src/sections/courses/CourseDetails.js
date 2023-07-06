import PropTypes from 'prop-types';
// icons
import checkmarkIcon from '@iconify/icons-carbon/checkmark';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, Typography, Chip, Box } from '@mui/material';
// components
import { Iconify } from '../../components';
//
import CourseDetailsLessons from './CourseDetailsLessons';

// ----------------------------------------------------------------------

CourseDetails.propTypes = {
  course: PropTypes.shape({
    learnList: PropTypes.array,
    lessons: PropTypes.array,
    skills: PropTypes.array,
  }),
};

export default function CourseDetails({ course }) {
  const { lessons, skills, learnList } = course;

  return (
    <Stack spacing={5}>
      <CourseDetailsLessons lessons={lessons} />

      {/* --  Learn -- */}
      <section>
        <Typography variant="h4" sx={{ mb: 3, color: 'text.primary' }}>
          What You Will Learn
        </Typography>

        <Stack spacing={1}>
          {learnList?.map((learn) => (
            <Stack key={learn} direction="row" alignItems="center">
              <Box
                sx={{
                  mr: 1.5,
                  width: 20,
                  height: 20,
                  display: 'flex',
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: (theme) => alpha(theme?.palette?.primary?.main, 0.08),
                }}
              >
                <Iconify
                  icon={checkmarkIcon}
                  sx={{ width: 16, height: 16, color: 'primary.main' }}
                />
              </Box>
              <Typography sx={{ color: 'text.primary' }}>{learn}</Typography>              
            </Stack>
          ))}
        </Stack>
      </section>

      {/* -- Skills -- */}
      <section>
        <Typography variant="h4" sx={{ mb: 3, color: 'text.primary' }}>
          Skills You Will Gain
        </Typography>
        <Stack direction="row" flexWrap="wrap">
          {skills?.map((skill) => (
            <Chip key={skill} label={skill} sx={{ m: 0.5 }} onClick={() => {}} />
          ))}
        </Stack>
      </section>

      {/* -- Overview -- */}
      <section>
        <Typography variant="h4" sx={{ mb: 2, color: 'text.primary' }}>
          Overview
        </Typography>
        <Typography sx={{ color: 'text.primary' }}>
          Consentaneum aeternitate dignitati commoventur primisque cupit mea officia peccata parens
          egone dolorem minuis. Secundae neglegi sextilius conantur commodaita siti philosophi ioca
          tenere lorem apparet assentior pudoris sint leves neglegebat unde reliquisti simile.{' '}
        </Typography>
      </section>
    </Stack>
  );
}
