import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// layouts
import AdminLayout from '../../../../src/layouts/admin';

// project imports
import MainCard from '../../../../src/components/cards/MainCard';
import LeaveTable from './LeaveTable';
import AffectedCourseTable from './AffectedCourseTable';

// third-party
import { useIntl, FormattedMessage } from 'react-intl';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const LeaveManagement = () => {
  const intl = useIntl();
  const [tab, setTab] = React.useState(0);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const handleRowClick = (row) => {
    setModalData(row);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const statuses = ['pending', 'approved', 'rejected'];

  const handleTabChange = (event, tab) => {
    setTab(tab);
  };

  const branch_codes = ['CCBC-CC', 'CCBC-CEC'];

  return (
    <>
      <MainCard title={intl.formatMessage({ id: 'leave-management' })} boxShadow>
        <Tabs value={tab} variant="scrollable" onChange={handleTabChange}>
          {statuses.map((status, index) => (
            <Tab key={index} to="#" label={intl.formatMessage({ id: status })} {...a11yProps(0)} />
          ))}
          <Tab key={3} to="#" label={intl.formatMessage({ id: 'report' })} {...a11yProps(0)} />
        </Tabs>
        {statuses.map((status, index) => (
          <TabPanel key={index} value={tab} index={index}>
            <LeaveTable status={status} />
          </TabPanel>
        ))}
        <TabPanel key={3} value={tab} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="branch-code">
                  {intl.formatMessage({ id: 'branch-code' })}
                </InputLabel>
                <Select
                  value={branch_codes[0]}
                  labelId="branch-code"
                  id="branch-code"
                  name="branch-code"
                  label={intl.formatMessage({ id: 'branch-code' })}
                >
                  {branch_codes.map((branch_code, index) => (
                    <MenuItem key={index} value={branch_code}>
                      {branch_code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                id="start-date"
                name="start-date"
                label={intl.formatMessage({ id: 'start-date' })}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                id="end-date"
                name="end-date"
                label={intl.formatMessage({ id: 'end-date' })}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                {intl.formatMessage({ id: 'submit' })}
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </MainCard>
      <Dialog open={isModalOpen} onClose={handleModalClose} maxWidth="lg" fullWidth>
        <DialogContent>
          <Stack container spacing={3} sx={{ py: 3 }}>
            <AffectedCourseTable />
            <TextField
              id="remarks"
              name="remarks"
              label={intl.formatMessage({ id: 'remarks' })}
              fullWidth
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} variant="contained">
            <FormattedMessage id="approve" />
          </Button>
          <Button onClick={handleModalClose} variant="contained" color="error">
            <FormattedMessage id="reject" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LeaveManagement;

// ----------------------------------------------------------------------

LeaveManagement.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
