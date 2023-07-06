import React from 'react';

// layouts
import AdminLayout from '../../../../src/layouts/admin';

// project imports
import Calendar from '../../../../src/components/extended/calendar';

// third-party
import { useIntl } from 'react-intl';

const Schedule = () => {
  const intl = useIntl();

  return <Calendar title={intl.formatMessage({ id: 'schedule' })} />;
};

export default Schedule;

// ----------------------------------------------------------------------

Schedule.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
