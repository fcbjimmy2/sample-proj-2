import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Box, Tab, Tabs, Typography } from '@mui/material';

// project imports
import ClaimHistoryTable from './ClaimHistoryTable';

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

const ClaimHistory = () => {
    const intl = useIntl();
    const [tab, setTab] = React.useState(0);

    const statuses = ['pending', 'approved', 'rejected'];

    const handleTabChange = (event, tab) => {
        setTab(tab);
    };

    return (
        <>
            <Tabs
                value={tab}
                variant="scrollable"
                onChange={handleTabChange}
            >
                {statuses.map((status, index) =>(
                <Tab
                    key={index}
                    to="#"
                    label={intl.formatMessage({id: status})}
                    {...a11yProps(0)}
                />
                ))}
            </Tabs>
            {statuses.map((status, index) =>(
            <TabPanel key={index} value={tab} index={index}>
                <ClaimHistoryTable status={status} />
            </TabPanel>
            ))}
        </>
    );
};

export default ClaimHistory;
