import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Box, Tab, Tabs, Typography } from '@mui/material';

// layouts
import AdminLayout from '../../../../src/layouts/admin';

// project imports
import MainCard from '../../../../src/components/cards/MainCard';
import LeaveApplication from './LeaveApplication';
import LeaveHistory from './LeaveHistory';

// third-party
import { useIntl } from 'react-intl';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const Leave = () => {
    const intl = useIntl();
    const [tab, setTab] = React.useState(0);

    const handleTabChange = (event, tab) => {
        setTab(tab);
    };

    return (
        <>
            <MainCard title={intl.formatMessage({id: 'leave'})} boxShadow>
                <Tabs
                    value={tab}
                    variant="scrollable"
                    onChange={handleTabChange}
                >
                    <Tab
                        to="#"
                        label={intl.formatMessage({id: 'application'})}
                        {...a11yProps(0)}
                    />
                    <Tab
                        to="#"
                        label={intl.formatMessage({id: 'history'})}
                        {...a11yProps(0)}
                    />
                </Tabs>
                <TabPanel value={tab} index={0}>
                    <LeaveApplication />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <LeaveHistory />
                </TabPanel>
            </MainCard>
        </>
    );
};

export default Leave;

// ----------------------------------------------------------------------

Leave.getLayout = function getLayout(page) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    );
};