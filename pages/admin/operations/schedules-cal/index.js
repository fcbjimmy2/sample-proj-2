'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'

// layouts
import AdminLayout from '../../../../src/layouts/admin';

// project imports

import { Grid, Box, CardContent } from '@mui/material';
import MainCard from '../../../../src/components/extended/MainCard';
import Multiselect from 'multiselect-react-dropdown';

const Calendar = dynamic(() => import('./Calendar'), {
  ssr: false
})
// import Calendar from "./Calendar";

// third-party
import { useIntl } from 'react-intl';

const SchedulesCal = () => {
  const intl = useIntl();

  return (
    // <MainCard title={intl.formatMessage({ id: 'schedules (cal)' })} content={false}>
    //   <CardContent>
      <>
        <Calendar />
      </> 
    //   </CardContent>
    // </MainCard>
  );
};

export default SchedulesCal;

// ----------------------------------------------------------------------

SchedulesCal.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
