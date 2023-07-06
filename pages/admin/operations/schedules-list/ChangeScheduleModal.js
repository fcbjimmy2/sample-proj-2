import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import {
  Button,
  CardContent,
  CardActions,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
  TextField,
  FormHelperText,
} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, MobileTimePicker } from '@mui/x-date-pickers';

// project imports
import MainCard from '../../../../src/components/extended/MainCard';
import InputLabel from '../../../../src/components/extended/InputLabel';

// assets
import { Icon } from '@iconify/react';
import CloseIcon from '@iconify/icons-carbon/close';

// third-party
import { useIntl } from 'react-intl';

// generate random
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

// modal position
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Body = React.forwardRef(
  (
    {
      modalStyle,
      handleCloseScheduleModal,
      dateValue,
      setDateValue,
      startTime,
      setStartTime,
      endTime,
      setEndTime,
      intl,
    },
    ref
  ) => (
    <div ref={ref} tabIndex={-1}>
      <MainCard
        sx={{
          position: 'absolute',
          width: { xs: 350, lg: 650 },
          height: { xs: 380, lg: '40%' },
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        title={intl.formatMessage({ id: 'Change Schedule' })}
        content={false}
        secondary={
          <IconButton onClick={handleCloseScheduleModal} size="large">
            <Icon icon={CloseIcon} />
          </IconButton>
        }
      >
        <CardContent sx={{ minHeight: '65%' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                  <InputLabel horizontal sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                    {intl.formatMessage({ id: 'Date' })} :
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sm={9} lg={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      renderInput={(props) => <TextField fullWidth {...props} helperText="" />}
                      label={intl.formatMessage({ id: 'Date' })}
                      value={dateValue}
                      onChange={(newValue) => {
                        setDateValue(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                  <InputLabel horizontal sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                    {intl.formatMessage({ id: 'Start Time' })} :
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sm={9} lg={6}>
                  <LocalizationProvider>
                    <MobileTimePicker
                      renderInput={(props) => <TextField fullWidth {...props} helperText="" />}
                      label={intl.formatMessage({ id: 'Start Time' })}
                      value={startTime}
                      onChange={(newValue) => setStartTime(newValue)}
                      minutesStep={5}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                  <InputLabel horizontal sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                    {intl.formatMessage({ id: 'End Time' })} :
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sm={9} lg={6}>
                  <LocalizationProvider>
                    <MobileTimePicker
                      renderInput={(props) => <TextField fullWidth {...props} helperText="" />}
                      label={intl.formatMessage({ id: 'End Time' })}
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
                      minutesStep={5}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
            <Grid item>
              <Button variant="contained" sx={{ marginRight: 2 }}>
                {intl.formatMessage({ id: 'Apply' })}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </MainCard>
    </div>
  )
);

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func,
  dateValue: PropTypes.date,
  setDateValue: PropTypes.func,
  startTime: PropTypes.number,
  setStartTime: PropTypes.func,
  endTime: PropTypes.number,
  setEndTime: PropTypes.func,
  intl: PropTypes.any,
  handleCloseScheduleModal: PropTypes.func,
};

// ==============================|| SIMPLE MODAL ||============================== //

export default function ChangeScheduleModal({ open, handleCloseScheduleModal }) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [dateValue, setDateValue] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState(Date.now());
  const [endTime, setEndTime] = React.useState(Date.now());
  const intl = useIntl();

  return (
    <Grid container justifyContent="flex-end">
      {/* <Button variant="contained" type="button" onClick={handleOpen}>
                Open Modal
            </Button> */}
      <Modal
        open={open}
        onClose={handleCloseScheduleModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Body
          modalStyle={modalStyle}
          handleCloseScheduleModal={handleCloseScheduleModal}
          dateValue={dateValue}
          setDateValue={setDateValue}
          setStartTime={setStartTime}
          startTime={startTime}
          endTime={endTime}
          setEndTime={setEndTime}
          intl={intl}
        />
      </Modal>
    </Grid>
  );
}
