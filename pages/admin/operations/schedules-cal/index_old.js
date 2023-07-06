import { useEffect, useState } from 'react';

// layouts
import AdminLayout from '../../../../src/layouts/admin';

// project imports
import { Grid, Box, CardContent } from '@mui/material';
import MainCard from '../../../../src/components/extended/MainCard';
import DataSelect from './DataSelect';
import CourseSelect from './CourseSelect';
import Custom_Schedule from '../../../../src/components/extended/schedule_cal_calendar';

// third-party
import { useIntl } from 'react-intl';

const SchedulesCal = () => {
  const intl = useIntl();

  return (
    <MainCard title={intl.formatMessage({ id: 'schedules (cal)' })} content={false}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item lg={3}>
            <DataSelect />
          </Grid>
          <Grid item lg={9}>
            <Box />
          </Grid>
          <Grid item lg={3}>
            <CourseSelect />
          </Grid>
          <Grid item lg={9}>
            <div>
              <Custom_Schedule />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default SchedulesCal;

// ----------------------------------------------------------------------

SchedulesCal.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
