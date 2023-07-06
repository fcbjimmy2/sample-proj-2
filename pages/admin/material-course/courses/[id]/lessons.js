import React from 'react';

// material-ui
import { Step, Stepper, StepLabel, Card, Typography } from '@mui/material';

// layouts
import { CourseLayout } from '../../../../../src/sections/admin/material-course';

// third-party
import { useIntl } from 'react-intl';

const CourseInformation = () => {
    const intl = useIntl();

    return (
        <CourseLayout currentTab="lessons" />
    );
};

export default CourseInformation;
