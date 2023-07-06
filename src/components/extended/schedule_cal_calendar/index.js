import { useEffect, useRef, useState } from 'react';
import tippy from 'tippy.js';

// material-ui
import { Button, Dialog, useMediaQuery } from '@mui/material';

// third-party
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';

import { useSettings } from '../../../hooks';

// redux
import { useDispatch, useSelector } from '../../../store';
import { getEvents, updateEvent } from '../../../store/slices/calendar';

// project imports
import MainCard from '../../cards/MainCard';
import SubCard from '../../cards/SubCard';
import CalendarStyled from '../calendar/CalendarStyled';
import Toolbar from '../calendar/Toolbar';
import Transfer_student_Modal from './Transfer_student_Modal';
import Change_Schedule_Modal from './Change_Schedule_Modal';

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import Iconify from '../../Iconify';

// ==============================|| APPLICATION CALENDAR ||============================== //

const Custom_Schedule = () => {
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const { locale } = useSettings();
  const matchSm = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // fetch events data
  const [events, setEvents] = useState([]);
  const calendarState = useSelector((state) => state.calendar);

  // set events data
  const [valLeft, setValLeft] = useState({});
  const [valRight, setValRight] = useState({});

  // reset transfer modal
  const handleReset = () => {
    setValLeft({});
    setValRight({});
  };

  useEffect(() => {
    dispatch(getEvents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setEvents(calendarState.events);
  }, [calendarState]);

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(matchSm ? 'listWeek' : 'dayGridMonth');

  // calendar toolbar events
  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  // set calendar view
  useEffect(() => {
    handleViewChange(matchSm ? 'listWeek' : 'dayGridMonth');
  }, [matchSm]);

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangeScheduleOpen, setIsChangeScheduleOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // calendar event select/add/edit/delete
  const handleRangeSelect = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    setSelectedRange({
      start: arg.start,
      end: arg.end,
    });
    setIsChangeScheduleOpen(true);
  };

  const handleEventSelect = (arg) => {
    if (arg.event.id) {
      const selectEvent = events.find((_event) => _event.id === arg.event.id);
      setSelectedEvent(selectEvent);

      if (Object.keys(valLeft).length === 0 && Object.keys(valRight).length === 0) {
        setValLeft({ ...valLeft, selectEvent });
      } else {
        setValRight({ ...valRight, selectEvent });
      }

      setIsModalOpen(true);
    } else {
      setSelectedEvent(null);
    }
  };

  const handleEventUpdate = async ({ event }) => {
    try {
      console.log(event.start);
      console.log(event.end);
      dispatch(
        updateEvent({
          eventId: event.id,
          update: {
            allDay: event.allDay,
            start: event.start,
            end: event.end,
          },
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsChangeScheduleOpen(false);
    setSelectedEvent(null);
    setSelectedRange(null);
  };

  const eventRender = (info) => {
    // create a new tooltip instance for each event
    tippy(info.el, {
      placement: 'top',
      trigger: 'mouseenter',
      content: `${info.event._def.publicId}<br>${info.event._def.extendedProps.course}`,
      allowHTML: true,
    });
  };

  return (
    <MainCard boxShadow>
      <CalendarStyled>
        <Toolbar
          date={date}
          view={view}
          onClickNext={handleDateNext}
          onClickPrev={handleDatePrev}
          onClickToday={handleDateToday}
          onChangeView={handleViewChange}
        />
        <SubCard>
          <FullCalendar
            weekends
            editable
            droppable
            selectable
            locales={allLocales}
            locale={locale}
            events={events}
            ref={calendarRef}
            rerenderDelay={10}
            initialDate={date}
            initialView={view}
            dayMaxEventRows={3}
            eventDisplay="block"
            headerToolbar={false}
            allDayMaintainDuration
            eventResizableFromStart
            select={handleRangeSelect}
            eventDrop={handleEventUpdate}
            eventClick={handleEventSelect}
            eventResize={handleEventUpdate}
            height={matchSm ? 'auto' : 720}
            eventDidMount={eventRender}
            plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
          />
        </SubCard>
      </CalendarStyled>

      {/* Dialog renders its body even if not open */}
      <Dialog
        maxWidth="lg"
        fullWidth
        onClose={handleModalClose}
        open={isModalOpen}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        {isModalOpen && (
          <Transfer_student_Modal
            event={selectedEvent}
            onCancel={handleModalClose}
            valLeft={valLeft}
            valRight={valRight}
            onReset={handleReset}
          />
        )}
      </Dialog>

      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleModalClose}
        open={isChangeScheduleOpen}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        {isChangeScheduleOpen && (
          <Change_Schedule_Modal onCancel={handleModalClose} selectedRange={selectedRange} />
        )}
      </Dialog>
    </MainCard>
  );
};

export default Custom_Schedule;
