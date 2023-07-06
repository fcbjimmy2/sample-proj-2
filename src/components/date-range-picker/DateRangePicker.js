import PropTypes from 'prop-types';
// @mui
import {
  Paper,
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormHelperText,
} from '@mui/material';
import { DatePicker, DateCalendar  } from '@mui/x-date-pickers';
// hooks
import useResponsive from '../../hooks/useResponsive';

// third-party
import { useIntl } from 'react-intl';
// ----------------------------------------------------------------------

DateRangePicker.propTypes = {
  open: PropTypes.bool,
  isError: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  onChangeEndDate: PropTypes.func,
  onChangeStartDate: PropTypes.func,
  variant: PropTypes.oneOf(['input', 'calendar']),
  startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
};

export default function DateRangePicker({

  title = 'Select Date Range',
  variant = 'input',
  //
  startDate,
  endDate,
  //
  onChangeStartDate,
  onChangeEndDate,
  //
  open,
  onClose,
  //
  isError,
}) {
  const intl = useIntl();

  const isDesktop = useResponsive('up', 'md');

  const isCalendarView = variant === 'calendar';

  return (
    <Dialog
      fullWidth
      maxWidth={isCalendarView ? false : 'xs'}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          ...(isCalendarView && {
            maxWidth: 720,
          }),
        },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      <DialogContent
        sx={{
          ...(isCalendarView &&
            isDesktop && {
              overflow: 'unset',
            }),
        }}
      >
        <Stack
          spacing={isCalendarView ? 3 : 2}
          direction={isCalendarView && isDesktop ? 'row' : 'column'}
          justifyContent="center"
          sx={{
            pt: 1,
            '& .MuiCalendarPicker-root': {
              ...(!isDesktop && {
                width: 'auto',
              }),
            },
          }}
        >
          {isCalendarView ? (
            <>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, borderColor: 'divider', borderStyle: 'dashed' }}
              >
                <DateCalendar date={startDate} onChange={onChangeStartDate} />
              </Paper>

              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, borderColor: 'divider', borderStyle: 'dashed' }}
              >
                <DateCalendar date={endDate} onChange={onChangeEndDate} />
              </Paper>
            </>
          ) : (
            <>
              <DatePicker
                label="Start date"
                value={startDate}
                onChange={onChangeStartDate}
                renderInput={(params) => <TextField {...params} />}
              />

              <DatePicker
                label="End date"
                value={endDate}
                onChange={onChangeEndDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </>
          )}
        </Stack>

        {isError && (
          <FormHelperText error sx={{ px: 2 }}>
            {intl.formatMessage({id: 'date-error-message'})}
          </FormHelperText>
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          {intl.formatMessage({id: 'cancel'})}
        </Button>

        <Button disabled={isError} variant="contained" onClick={onClose}>
          {intl.formatMessage({id: 'Apply'})}
        </Button>
      </DialogActions>
    </Dialog>
  );
}