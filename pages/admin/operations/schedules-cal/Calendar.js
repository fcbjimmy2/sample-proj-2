import React, {Component, useEffect} from 'react';
import dynamic from 'next/dynamic'

import {DayPilot, DayPilotCalendar} from "daypilot-pro-react";
import Multiselect from 'multiselect-react-dropdown';
import { Button, Card, Chip, Stack, CardHeader, Grid, Select, FormControl, MenuItem, OutlinedInput, Box,
  InputLabel, Checkbox, ListItemText, TextField, FormLabel, Input, Modal, ModalDialog, Typography, IconButton  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { useTheme } from '@mui/material/styles';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
// third-party
import { useIntl } from 'react-intl';

// utils
import axios from '../../../../src/utils/axios';


var defaultStartDate = new Date();
var defaultEndDate = new Date().setDate(defaultStartDate.getDate() + 7);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  // bgcolor: 'background.paper',
  // border: '1px solid #000',
  // boxShadow: 24,
  p: 4,
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function findMaxOverlap(start, end, n)
{
  // Sort
  start.sort((a, b) => a.getTime() - b.getTime());
  end.sort((a, b) => a.getTime() - b.getTime());

  // counter indicates number of time at a date
  let counter = 1, currentMax = 1, time = start[0];
  let i = 1, j = 0;

  // Similar to merge in merge sort to process
  // all times in sorted order
  while (i < n && j < n)
  {
    if (start[i] <= end[j])
    {
      counter++;

      // Update currentMax if needed
      if (counter > currentMax)
      {
        currentMax = counter;
        time = start[i];
      }
      i++; 
    }
    else 
    {    
      counter--;
      j++;
    }
  }
  // console.log('Max interval (' + currentMax + ') occured in Start-Time (' + time + ')');

  return currentMax;
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      teacherList: [],
      courseList: [],
      venueList: [],
      openNewClass: false,
      filterCourseList: [],
      filterStartDate: defaultStartDate,
      filterEndDate: defaultEndDate,
      filterCourses: [],
      data: [],
      resources: [],
      // Class related
        courseGuid: "",
        min: "0",
        max: "0",
        classTitle: "",
        classContent: "",
        classStage: 0,
        point: 0,
        restrictByStage: 0,
        courseType: "Course",
        ppt: 0,
        teacherGuid: "",
        venueGuid: "",
        weekday: null,
        timeslot: null,
        timescale: null,
        classDate: null,
        classStart: null,
        classEnd: null,
        active: 1,


      viewType: "Resources",
      locale: "en-us",
      columnWidthSpec: "Fixed",
      columnWidth: 200,
      headerLevels: 1,
      headerHeight: 30,
      cellHeight: 30,
      heightSpec: "Fixed",
      height: 500,
      crosshairType: "Header",
      showCurrentTime: false,
      eventArrangement: "SideBySide",
      allowEventOverlap: true,
      timeRangeSelectedHandling: "Enabled",
      dayBeginsHour: 9,
      dayEndsHour: 24,
      businessBeginsHour: 9,
      businessEndsHour: 21,
      eventDeleteHandling: "Disabled",
      eventMoveHandling: "Update",
      onEventMoved: (args) => {
        console.log("Event moved: " + args.e.text());
      },
      eventResizeHandling: "Update",
      onEventResized: (args) => {
        console.log("Event resized: " + args.e.text());
      },
      eventClickHandling: "Disabled",
      eventHoverHandling: "Bubble",

      onEventFilter: (args) => {
        
        if (args.filter.course.length > 0) {
          if (!args.filter.course.includes(args.e.tag('course'))) {
            args.visible = false;
          }
        }
        if(args.filter.text !== '')
        {
          if (!args.filter.course.includes(args.e.tag('course')) || args.e.tag('rawData').toUpperCase().indexOf(args.filter.text.toUpperCase()) === -1) {
            args.visible = false;
          }
        }
      },

      contextMenu: new DayPilot.Menu({
        items: [
        {
          text: "Edit", onClick: function (args) {
            // dp.events.edit(args.source);
            console.log(args);
          }
        },
        {
          text: "Delete", onClick: function (args) {
            // dp.events.remove(args.source);
            console.log(args);
          }
        }]
      })
    };
  }

  componentDidMount() {

    axios.get('/api/admin/operations/schedules-cal/course-list')
    .then((response) => { this.setState({ courseList: response.data }) })
    .catch((error) => { console.log(error); });

    axios.get('/api/admin/operations/schedules-cal/teacher-list')
    .then((response) => { this.setState({ teacherList: response.data }) })
    .catch((error) => { console.log(error); });

    axios.get('/api/admin/operations/schedules-cal/venue-list')
    .then((response) => { this.setState({ venueList: response.data }) })
    .catch((error) => { console.log(error); });

    axios.get('/api/admin/operations/schedules-cal/class-list', { params: { startDate: formatDate(this.state.filterStartDate), endDate: formatDate(this.state.filterEndDate) } })
    .then((response) => { console.log(response.data) })
    .catch((error) => { console.log(error); });

    // load resource and event data
    this.setState({
      startDate: DayPilot.Date.today(),
      events: this.state.data,
      columns: this.state.resources,
    });
  }

  get calendar() {
    return this.calendarRef.current.control;
  }


  render() {
    
    var globalFilter = { course: this.state.filterCourses, text: '' };

    return (
      
      <div>

        <Card>
          <CardHeader
            title={'schedules'}
            // subheader={subheader}
            action={
              <Stack sx={{ px: 1, my: 0 }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<AddIcon />}
                  onClick={() => this.setState({ openNewClass: true })}
                >
                  New Class
                </Button>
              </Stack>
            }
          />
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Stack sx={{ px: 3, my: 0 }}>
                <DatePicker
                  label="Start date"
                  value={this.state.filterStartDate}
                  onChange={(newValue) => this.setState({ filterStartDate: newValue })}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      sx={{
                        maxWidth: { md: INPUT_WIDTH },
                      }}
                    />
                  )}
                />
              </Stack>
            </Grid>
            <Grid item xs={6} md={3}>
              <Stack sx={{ px: 1, my: 0 }}>
                <DatePicker
                  label="End date"
                  value={this.state.filterEndDate}
                  onChange={(newValue) => this.setState({ filterEndDate: newValue })}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      sx={{
                        maxWidth: { md: INPUT_WIDTH },
                      }}
                    />
                  )}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack sx={{ px: 3, my: 0, rx: 1 }}>
                <TextField id="outlined-basic" label="Text Search..." variant="outlined" onChange={(event) => {
                  globalFilter.text = event.target.value;
                  this.calendar.events.filter(globalFilter);
                }} />
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={12}>
              <Stack sx={{ px: 3, my: 0 }}>
                <FormControl>
                  <InputLabel id="multiple-chip-label">Course</InputLabel>
                  <Select
                    fullWidth
                    labelId="multiple-chip-label"
                    label="Course"
                    multiple
                    value={this.state.filterCourses??[]}
                    onChange={(event) => { 
                      this.setState({ filterCourses: event.target.value === 'string' ? event.target.value.split(',') : event.target.value });
                      globalFilter.course = event.target.value;
                      this.calendar.events.filter(globalFilter);
                    }}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {this.state.filterCourseList.map((course) => (
                      <MenuItem
                        key={course.code}
                        value={course.code}
                      >
                        <Checkbox checked={this.state.filterCourses.indexOf(course.code) > -1} />
                        <ListItemText primary={course.code} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
              <Stack sx={{ px: 3, my: 0 }}>
                <DayPilotCalendar
                  {...this.state}
                  ref={this.calendarRef}
                />
              </Stack>
            </Grid>
          </Grid>
        </Card>

        <Modal open={this.state.openNewClass??false} onClose={() => this.setState({ openNewClass: false })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card style={style}>
            <CardHeader
              title={'New Class'}
              // subheader={subheader}
              action={
                <Stack>
                  <IconButton
                    onClick={() => this.setState({ openNewClass: false })}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
              }
            />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack sx={{ px: 2, my: 0 }}>
                  <FormControl>
                    <InputLabel id="course-select-label">Course</InputLabel>
                    <Select
                      labelId="course-select-label"
                      value={this.state.courseGuid}
                      label="Course"
                      onChange={(event) => { 
                        this.setState({ courseGuid: event.target.value });
                      }}
                    >
                      {this.state.courseList.map((course) => (
                        <MenuItem
                          key={course.course_guid}
                          value={course.course_guid}
                        >
                          {course.course_code}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              
              <Grid item xs={6}>
                <Stack sx={{ px: 2, my: 0 }}>
                <TextField
                  id="outlined-number" label="Min." type="number" value={this.state.min}
                  onChange={(event, newValue) => { 
                    this.setState({ min: event.target.value });
                  }}
                />
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack sx={{ px: 2, my: 0 }}>
                <TextField
                  id="outlined-number" label="Max." type="number" value={this.state.max}
                  onChange={(event, newValue) => { 
                    this.setState({ max: event.target.value });
                  }}
                />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack sx={{ px: 2, my: 0 }}>
                <TextField 
                  id="outlined-basic" label="Class Title" variant="outlined" value={this.state.classTitle}
                  onChange={(event, newValue) => { 
                    this.setState({ classTitle: event.target.value });
                  }}
                />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack sx={{ px: 2, my: 0 }}>
                <TextField 
                  id="outlined-basic" label="Class Content" variant="outlined" value={this.state.classContent}
                  onChange={(event, newValue) => { 
                    this.setState({ classContent: event.target.value });
                  }}
                />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack sx={{ px: 2, my: 0 }}>
                  <FormControl>
                    <InputLabel id="teacher-select-label">Teacher</InputLabel>
                    <Select
                      labelId="teacher-select-label"
                      value={this.state.teacherGuid}
                      label="Teacher"
                      onChange={(event) => { 
                        this.setState({ teacherGuid: event.target.value });
                      }}
                    >
                      {this.state.teacherList.map((teacher) => (
                        <MenuItem
                          key={teacher.user_guid}
                          value={teacher.user_guid}
                        >
                          {teacher.full_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack sx={{ px: 2, my: 0 }}>
                  <FormControl>
                    <InputLabel id="venue-select-label">Venue</InputLabel>
                    <Select
                      labelId="venue-select-label"
                      value={this.state.venueGuid}
                      label="Venue"
                      onChange={(event) => { 
                        this.setState({ venueGuid: event.target.value });
                      }}
                    >
                      {this.state.venueList.map((venue) => (
                        <MenuItem
                          key={venue.venue_guid}
                          value={venue.venue_guid}
                        >
                          {venue.venue_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack sx={{ px: 2, my: 0 }}>
                <DatePicker label="Date" 
                  onChange={(newValue) => { 
                    this.setState({ classDate: newValue});
                  }}/>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack sx={{ px: 2, my: 0 }}>
                <TimePicker label="Start Time"
                  onChange={(newValue) => { 
                    this.setState({ classStart: newValue });
                  }} />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack sx={{ px: 2, my: 0 }}>
                <TimePicker label="End Time"
                  onChange={(newValue) => { 
                    this.setState({ classEnd: newValue });
                  }} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack sx={{ px: 2, my: 0, }}>
                  <Button variant="contained" 
                    disabled={
                      !this.state.min || 
                      !this.state.max || 
                      !this.state.teacherGuid || 
                      !this.state.venueGuid || 
                      !this.state.classDate || 
                      !this.state.classStart || 
                      !this.state.classEnd
                    }
                  >
                    Submit
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
          </Card>
        </Modal>
      </div>
    );
  }
}

export default Calendar;
