import React, { useState, useEffect } from 'react';

// material-ui
import {
  Button,
  InputLabel,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import '@mui/lab';

// third-party
import { useIntl, FormattedMessage } from 'react-intl';

// redux
import { useDispatch, useSelector } from '../../../store';
import { updateEvent, getEvents } from '../../../store/slices/calendar';

import moment from 'moment';

export default function Change_Schedule_Modal({ onCancel, selectedRange }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(selectedRange.start);
  const calendarState = useSelector((state) => state.calendar);

  const handleApply = () => {
    try {
      const eventIds = findEventIdsByStartDate(calendarState.events, selectedRange.start);

      console.log(selectedDate);

      eventIds.forEach((eventId) => {
        const event = calendarState.events.find((e) => e.id === eventId);
        const duration = moment.duration(moment(event.end).diff(moment(event.start))).asMinutes();
        const newEnd = calculateEndDate(selectedDate, duration);
        dispatch(
          updateEvent({
            eventId: eventId,
            update: {
              start: selectedDate,
              end: newEnd,
            },
          })
        );
      });
      onCancel();
    } catch (err) {
      console.error(err);
    }
  };

  function findEventIdsByStartDate(events, selectedDate) {
    const selectedStartDate = new Date(selectedDate).toLocaleDateString('en-CA', {
      timeZone: 'Asia/Hong_Kong',
    });
    const matchingEvents = events.filter((event) => {
      const eventStartDate = new Date(event.start).toLocaleDateString('en-CA', {
        timeZone: 'Asia/Hong_Kong',
      });
      return eventStartDate === selectedStartDate;
    });
    const matchingEventIds = matchingEvents.map((event) => event.id);
    return matchingEventIds;
  }

  function calculateEndDate(startDate, duration) {
    const startMoment = moment(startDate);
    const endMoment = startMoment.clone().add(duration, 'minutes');
    return endMoment.toDate();
  }

  return (
    <>
      <DialogTitle style={{ fontSize: '1.5vw' }}>
        {intl.formatMessage({ id: 'Change Scheduled Date' })}
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={8}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                <InputLabel>{intl.formatMessage({ id: 'Start Date' })}</InputLabel>
              </Grid>
              <Grid item xs={12} sm={9} lg={6}>
                <DatePicker
                  value={selectedRange.start}
                  onChange={(date) => setSelectedDate(date)}
                  inputFormat="dd/MM/yyyy"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="contained" onClick={handleApply}>
                <FormattedMessage id="Apply" />
              </Button>
              <Button type="button" variant="outlined" onClick={onCancel}>
                <FormattedMessage id="cancel" />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
}
