import * as React from 'react';

// material-ui
import {
  Grid,
  Box,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Tooltip,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// layouts
import AdminLayout from '../../../../src/layouts/admin';
import { Page } from '../../../../src/components/admin';

// third-party
import { useIntl } from 'react-intl';

// project imports
import MainCard from '../../../../src/components/extended/MainCard';
import SubCard from '../../../../src/components/extended/SubCard';

// assets
import { Icon } from '@iconify/react';
import CloseIcon from '@iconify/icons-carbon/close';
import CheckIcon from '@iconify/icons-carbon/checkmark-outline';

//imports
import Attendance from './modal/Attendance';
import ChangeTeacher from '../../../../src/components/extended/operations/change-teacher-modal/ChangeTeacher';

//data
let branch = [
  {
    BranchCode: 'CCBC-CC',
    RegistrationName: 'CCBC',
    RegistrationNameChi: '阡陌中心',
    RegistrationNameCN: '阡陌中心',
  },
  {
    BranchCode: 'CCBC-CEC',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    RegistrationNameCN: '阡陌中心（长沙湾）',
  },
];

let venue = [
  { VenueCode: '01', VenueName: 'Room 1', BranchCode: 'CCBC-CEC' },
  { VenueCode: '02', VenueName: 'Room 2', BranchCode: 'CCBC-CEC' },
  { VenueCode: '03', VenueName: 'Room 3', BranchCode: 'CCBC-CEC' },
  { VenueCode: '04', VenueName: 'Room 4', BranchCode: 'CCBC-CEC' },
  { VenueCode: '05', VenueName: 'Room 5', BranchCode: 'CCBC-CEC' },
  { VenueCode: '06', VenueName: 'Room 6', BranchCode: 'CCBC-CC' },
  { VenueCode: 'A', VenueName: '輔導室A', BranchCode: 'CCBC-CEC' },
  { VenueCode: 'B', VenueName: '輔導室B', BranchCode: 'CCBC-CEC' },
  { VenueCode: 'C', VenueName: '輔導室C', BranchCode: 'CCBC-CEC' },
];

const classes = [
  {
    ClassCode: '2304abc123#20230413#THU@0930-1030',
    Active: true,
    CourseCode: '2304abc123',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'TUE',
    StartTime: '2023-04-18T09:30:00.000Z',
    EndTime: '2023-04-18T10:30:00.000Z',
    ClassDate: '2023-04-18T00:00:00.000Z',
    ClassRemark:
      '2023-04-13 09:30 To 10:30 Teacher : U0022 Venue : 012023-04-18 09:30 To 10:30 Teacher : U0022 Venue : 01',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 5,
    NoofStudent: 2,
    Avaliable: 3,
    Attended: 0,
    CourseMasterCode: 'abc123',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '09:30',
    TimeEnd: '10:30',
    Column24: 0,
    ClassStatus: 'Pending',
  },
];

//headcells
const headCells = [
  {
    id: 'CourseCode',
    numeric: true,
    label: 'start time',
    align: 'left',
  },
  {
    id: 'Subject',
    numeric: false,
    label: 'end time',
    align: 'left',
  },
  {
    id: 'CourseTitle',
    numeric: true,
    label: 'attendance',
    align: 'left',
  },
  {
    id: 'Name',
    numeric: true,
    label: 'teacher',
    align: 'left',
  },
  {
    id: 'CourseQuota',
    numeric: false,
    label: 'course code',
    align: 'left',
  },
  {
    id: 'BranchCode',
    numeric: true,
    label: 'description',
    align: 'left',
  },
];

export default function Operations() {
  const [date1, setDate1] = React.useState(new Date());
  const [openAttendance, setOpenAttendance] = React.useState(false);
  const [openTeacherModal, setOpenTeacherModal] = React.useState(false);
  const [classCode, setClassCode] = React.useState('');

  const intl = useIntl();

  const handleOpenAttendance = () => {
    setOpenAttendance(true);
  };

  const handleCloseAttendance = () => {
    setOpenAttendance(false);
  };

  const openTeacherModalHandler = () => {
    setOpenTeacherModal(true);
  };

  const closeTeacherModalHandler = () => {
    setOpenTeacherModal(false);
  };

  return (
    <AdminLayout>
      <MainCard title="Classes">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12}>
              <DatePicker
                label="Date"
                value={date1}
                onChange={(newValue) => setDate1(newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
        {branch.map((branch, index) => {
          return (
            <Paper key={index}>
              <Typography variant="h4" sx={{ mt: 2, ml: 1, mb: 1 }}>
                {branch.RegistrationName}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {venue.map((room, indx) => {
                if (room.BranchCode === branch.BranchCode) {
                  return (
                    <SubCard title={room.VenueName} key={indx} sx={{ mb: 3 }}>
                      <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                          <TableHead>
                            <TableRow>
                              {headCells.map((headCell) => (
                                <TableCell
                                  key={headCell.id}
                                  align={headCell.align}
                                  padding={headCell.disablePadding ? 'none' : 'normal'}
                                  sx={{ fontWeight: '600' }}
                                >
                                  {intl.formatMessage({ id: `${headCell.label}` })}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          {classes.length > 0 ? (
                            classes.map((lesson, index) => {
                              const avatarSrc = lesson.avatar
                                ? `/avatars/${lesson.avatar}`
                                : '/avatars/user.png';
                              const labelId = `enhanced-table-checkbox-${index}`;
                              if (
                                room.VenueCode === lesson.VenueCode &&
                                branch.BranchCode === lesson.BranchCode
                              ) {
                                return (
                                  <TableBody key={index}>
                                    <TableRow
                                      hover
                                      role="checkbox"
                                      tabIndex={-1}
                                      sx={{ cursor: 'pointer' }}
                                    >
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        sx={{ cursor: 'pointer' }}
                                      >
                                        <Typography>{lesson.TimeStart}</Typography>
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        sx={{ cursor: 'pointer' }}
                                      >
                                        <Typography>{lesson.TimeEnd}</Typography>
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        sx={{
                                          cursor: 'pointer',
                                        }}
                                      >
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <Tooltip title={intl.formatMessage({ id: 'attendance' })}>
                                            <IconButton
                                              onClick={() => {
                                                setClassCode(lesson.ClassCode);
                                                handleOpenAttendance();
                                              }}
                                            >
                                              <Icon
                                                icon={CheckIcon}
                                                fontSize="large"
                                                style={{ color: 'red' }}
                                              />
                                            </IconButton>
                                          </Tooltip>
                                          <Typography
                                            color="secondary"
                                            sx={{ ml: 1 }}
                                          >{`${lesson.Attended}/${lesson.NoofStudent}`}</Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell component="th" id={labelId} scope="row">
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <Tooltip
                                            title={intl.formatMessage({ id: 'Change Teacher' })}
                                          >
                                            <Avatar
                                              src={avatarSrc}
                                              alt={`Avatar of ${lesson.name}`}
                                              sx={{ width: 42, height: 42, mr: 2 }}
                                              onClick={openTeacherModalHandler}
                                            />
                                          </Tooltip>
                                          <Typography color="secondary">{lesson.Name}</Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        sx={{ cursor: 'pointer' }}
                                      >
                                        <Typography>{lesson.CourseCode}</Typography>
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        sx={{ cursor: 'pointer' }}
                                      >
                                        <Typography>{lesson.ClassDesc}</Typography>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                );
                              } else {
                                return (
                                  <TableBody key={index}>
                                    <TableRow
                                      hover
                                      role="checkbox"
                                      tabIndex={-1}
                                      sx={{ cursor: 'pointer' }}
                                    >
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        sx={{ cursor: 'pointer' }}
                                        colSpan={6}
                                      >
                                        <Typography>No classes</Typography>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                );
                              }
                            })
                          ) : (
                            <TableBody key={indx}>
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                sx={{ cursor: 'pointer' }}
                              >
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={{ cursor: 'pointer' }}
                                  colSpan={6}
                                >
                                  <Typography>No classes</Typography>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          )}
                        </Table>
                      </TableContainer>
                    </SubCard>
                  );
                }
              })}
            </Paper>
          );
        })}
      </MainCard>
      <Attendance open={openAttendance} handleClose={handleCloseAttendance} classCode={classCode} />
      <ChangeTeacher open={openTeacherModal} handleClose={closeTeacherModalHandler} />
    </AdminLayout>
  );
}

