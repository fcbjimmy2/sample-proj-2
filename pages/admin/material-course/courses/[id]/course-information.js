import React from 'react';
// layouts
import { CourseLayout } from '../../../../../src/sections/admin/material-course';

// third-party
import { useIntl } from 'react-intl';

const CourseInformation = () => {
    const intl = useIntl();

    return (
        <CourseLayout currentTab="course-information" />
    );
};

export default CourseInformation;
