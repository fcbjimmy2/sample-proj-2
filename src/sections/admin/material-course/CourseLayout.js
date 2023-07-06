import PropTypes from 'prop-types';

import { BASE_URL } from '../../../config';

// material-ui
import { Box, Button, Divider, Card, Stack, Typography, Tabs, Tab } from '@mui/material';

// layouts
import AdminLayout from '../../../layouts/admin';

// project imports
import CourseInformation from './CourseInformation';
import CourseLesson from './CourseLesson';

// third-party
import { useIntl } from 'react-intl';
import Iconify from '../../../components/Iconify';

// next
import { useRouter } from 'next/router'

const CourseLayout = ({ currentTab }) => {
    const { query,  push } = useRouter();
    
    const { id } = query

    const intl = useIntl();

    const TABS = [
      { value: 'course-information', label: intl.formatMessage({ id: 'course-information' }), component: <CourseInformation courseId={id} /> },
      { value: 'lessons', label: intl.formatMessage({ id: 'Lessons' }), component: <CourseLesson courseId={id} /> },
    ];

    const handleTabChange = (event, tab) => {
        push(BASE_URL + '/admin/material-course/courses/' + id + '/' + tab)
    };

    return (
        <AdminLayout>
            <Box sx={{ mb: 5 }}>                
                <Stack direction="row" alignItems="center">
                    <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', flexGrow: 1 }}>
                        {intl.formatMessage({id: 'create-course'})}
                    </Typography>  

                    <Button variant="contained">Submit</Button>
                </Stack>
            </Box>

            <Card>
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    sx={{
                        px: 2,
                        bgcolor: 'background.neutral',
                    }}
                >                   
                    {TABS.map((tab, index) => (
                        <Tab key={index} value={tab.value} label={tab.label} />
                    ))}
                </Tabs>

                <Divider />

                {TABS.map((tab, index) => (tab.value === currentTab) && (
                    <Box key={index} sx={{ p: 3 }}>
                        {tab.component}
                    </Box>
                ))}
            </Card>
        </AdminLayout>
    );
};

CourseLayout.propTypes = {
    currentTab: PropTypes.string,
};

export default CourseLayout;