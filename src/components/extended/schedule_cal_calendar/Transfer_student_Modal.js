import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
  Tooltip,
} from '@mui/material';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { ThemeProvider, createTheme } from '@mui/material/styles';

// third-party
import { useFormik, Form, FormikProvider } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

// project imports
import Course_Details_Modal from './Course_Details_Modal';

// icons
import { Icon } from '@iconify/react';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});
// ==============================|| CALENDAR EVENT ADD / EDIT / DELETE ||============================== //

const Transfer_student_Modal = ({ event, onCancel, onReset, valLeft, valRight }) => {
  const intl = useIntl();

  return (
    <ThemeProvider theme={theme}>
      <DialogTitle style={{ fontSize: '2vw' }}>
        {intl.formatMessage({ id: 'Class Detail' })}
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* transfer buttons */}
          <Grid container item justifyContent="center" style={{ lineHeight: '2em' }}>
            <Grid item xs={2} container justifyContent="center" alignItems="center">
              <Typography variant="body2" style={{ fontSize: '1.5vw', color: '#0dcaf0' }}>
                (A)
              </Typography>
            </Grid>
            <Grid item xs={5} spacing={1} container justifyContent="center">
              <Grid item>
                <Tooltip title={intl.formatMessage({ id: 'Transfer Student(s) from (A) to (B)' })}>
                  <Button variant="contained" size="large" color="neutral">
                    <Icon icon="carbon:caret-right" style={{ fontSize: '3em' }} />
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={intl.formatMessage({ id: 'Reset' })}>
                  <Button variant="contained" size="large" color="neutral" onClick={onReset}>
                    <Icon icon="carbon:reset" style={{ fontSize: '3em' }} />
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={intl.formatMessage({ id: 'Transfer Student(s) from (B) to (A)' })}>
                  <Button variant="contained" size="large" color="neutral">
                    <Icon icon="carbon:caret-left" style={{ fontSize: '3em' }} />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={2} container justifyContent="center" alignItems="center">
              <Typography variant="body2" style={{ fontSize: '1.5vw', color: '#0dcaf0' }}>
                (B)
              </Typography>
            </Grid>
          </Grid>

          {/* course detail and student table */}

          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={6}>
              {/* have to change the value */}
              <Course_Details_Modal values={valLeft} />
            </Grid>
            <Grid item xs={6}>
              {/* have to change the value */}
              <Course_Details_Modal values={valRight} />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button type="button" variant="outlined" onClick={onCancel}>
                <FormattedMessage id="cancel" />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogActions>
    </ThemeProvider>
  );
};

Transfer_student_Modal.propTypes = {
  event: PropTypes.object,
  onCancel: PropTypes.func,
};

export default Transfer_student_Modal;
