import React from 'react';

// material-ui
import { Card, Typography } from '@mui/material';

// layouts
import AdminLayout from '../../../src/layouts/admin';

// project imports
import { CourseInformation } from '../../../src/sections/admin/material-course';

// third-party
import { useIntl } from 'react-intl';

const CreateCourse = () => {
  const intl = useIntl();

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        {intl.formatMessage({ id: 'create-course' })}
      </Typography>

      <Card sx={{ p: 3 }}>
        <CourseInformation />
      </Card>
    </AdminLayout>
  );
};

export default CreateCourse;
