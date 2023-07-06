import { useEffect, useRef, useState } from 'react';

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
import { getEvents, addEvent, updateEvent, removeEvent } from '../../../store/slices/calendar';

// project imports
import MainCard from '../../cards/MainCard';
import SubCard from '../../cards/SubCard';
import CalendarStyled from '../calendar/CalendarStyled';
import Toolbar from '../calendar/Toolbar';
import AddEventForm from '../calendar/AddEventForm';

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import Iconify from '../../Iconify';

// ==============================|| APPLICATION CALENDAR ||============================== //

const Calendar_Without_Header = () => {
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const { locale } = useSettings();
  const matchSm = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // fetch events data
  const [events, setEvents] = useState([]);

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
    setIsModalOpen(true);
  };

  const handleEventSelect = (arg) => {
    if (arg.event.id) {
      const selectEvent = events.find((_event) => _event.id === arg.event.id);
      setSelectedEvent(selectEvent);
    } else {
      setSelectedEvent(null);
    }
    setIsModalOpen(true);
  };

  const handleEventUpdate = async ({ event }) => {
    try {
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
    setSelectedEvent(null);
    setSelectedRange(null);
  };

  const handleEventCreate = async (data) => {
    dispatch(addEvent(data));
    handleModalClose();
  };

  const handleUpdateEvent = async (eventId, update) => {
    dispatch(updateEvent({ eventId, update }));
    handleModalClose();
  };

  const handleEventDelete = async (id) => {
    try {
      dispatch(removeEvent(id));
      handleModalClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
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
            plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
          />
        </SubCard>
      </CalendarStyled>

      {/* Dialog renders its body even if not open */}
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleModalClose}
        open={isModalOpen}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        {isModalOpen && (
          <AddEventForm
            event={selectedEvent}
            range={selectedRange}
            onCancel={handleModalClose}
            handleDelete={handleEventDelete}
            handleCreate={handleEventCreate}
            handleUpdate={handleUpdateEvent}
          />
        )}
      </Dialog>
    </MainCard>
  );
};

export default Calendar_Without_Header;
