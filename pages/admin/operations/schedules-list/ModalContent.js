import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports

// assets
import { Icon } from '@iconify/react';
import SearchIcon from '@iconify/icons-carbon/search';

//modal
import ChangeScheduleModal from './ChangeScheduleModal';
import ChangeTeacherModal from './change-teacher/ChangeTeacherModal';
import TransferClass from './transfer-class';

import { createTheme, ThemeProvider } from '@mui/material/styles';

// third-party
import { useIntl } from 'react-intl';

// table sort
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const mockData = [
  {
    ClassCode: '12345_A3#20220711#MON@1000-1100',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'MON',
    StartTime: '2022-07-11T10:00:00.000Z',
    EndTime: '2022-07-11T11:00:00.000Z',
    ClassDate: '2022-07-11T00:00:00.000Z',
    ClassRemark: '',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 0,
    Avaliable: 10,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220713#WED@1200-1300',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'SAT',
    StartTime: '2022-07-16T12:00:00.000Z',
    EndTime: '2022-07-16T13:00:00.000Z',
    ClassDate: '2022-07-16T00:00:00.000Z',
    ClassRemark: '2022-07-13 12:00 To 13:00 Teacher : U0018 Venue : C',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 0,
    Avaliable: 10,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220718#MON@1000-1100',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'FRI',
    StartTime: '2022-10-14T07:15:00.000Z',
    EndTime: '2022-10-14T08:30:00.000Z',
    ClassDate: '2022-10-14T00:00:00.000Z',
    ClassRemark: '2022-07-18 10:00 To 11:00 Teacher : U0018 Venue : C',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 1,
    Avaliable: 9,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220720#WED@1200-1300',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'MON',
    StartTime: '2022-10-17T07:00:00.000Z',
    EndTime: '2022-10-17T10:00:00.000Z',
    ClassDate: '2022-10-17T00:00:00.000Z',
    ClassRemark:
      '2022-07-20 12:00 To 13:00 Teacher : U0018 Venue : C2022-10-19 07:00 To 10:00 Teacher : U0018 Venue : C',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 0,
    Avaliable: 10,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220725#MON@1000-1100',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'FRI',
    StartTime: '2022-08-05T14:00:00.000Z',
    EndTime: '2022-08-05T15:00:00.000Z',
    ClassDate: '2022-08-05T00:00:00.000Z',
    ClassRemark:
      '2022-07-25 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-05 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-05 14:00 To 15:00 Teacher : U0018 Venue : C2022-08-11 14:00 To 15:00 Teacher : U0018 Venue : C',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 0,
    Avaliable: 10,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220727#WED@1200-1300',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'WED',
    StartTime: '2022-07-27T12:00:00.000Z',
    EndTime: '2022-07-27T13:00:00.000Z',
    ClassDate: '2022-07-27T00:00:00.000Z',
    ClassRemark: '',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 0,
    Avaliable: 10,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220801#MON@1000-1100',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'SAT',
    StartTime: '2022-08-13T11:00:00.000Z',
    EndTime: '2022-08-13T12:00:00.000Z',
    ClassDate: '2022-08-13T00:00:00.000Z',
    ClassRemark:
      '2022-08-01 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-09 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-10 11:00 To 12:00 Teacher : U0018 Venue : C',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 1,
    Avaliable: 9,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220803#WED@1200-1300',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'WED',
    StartTime: '2022-08-03T12:00:00.000Z',
    EndTime: '2022-08-03T13:00:00.000Z',
    ClassDate: '2022-08-03T00:00:00.000Z',
    ClassRemark: '',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 0,
    Avaliable: 10,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220808#MON@1000-1100',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'SAT',
    StartTime: '2022-08-20T10:00:00.000Z',
    EndTime: '2022-08-20T11:00:00.000Z',
    ClassDate: '2022-08-20T00:00:00.000Z',
    ClassRemark:
      '2022-08-08 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-10 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-12 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-15 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-17 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-20 10:00 To 11:00 Teacher : U0018 Venue : C',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 1,
    Avaliable: 9,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220711#MON@1000-1100',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'MON',
    StartTime: '2022-07-11T10:00:00.000Z',
    EndTime: '2022-07-11T11:00:00.000Z',
    ClassDate: '2022-07-11T00:00:00.000Z',
    ClassRemark: '',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 0,
    Avaliable: 10,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220713#WED@1200-1300',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'SAT',
    StartTime: '2022-07-16T12:00:00.000Z',
    EndTime: '2022-07-16T13:00:00.000Z',
    ClassDate: '2022-07-16T00:00:00.000Z',
    ClassRemark: '2022-07-13 12:00 To 13:00 Teacher : U0018 Venue : C',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 0,
    Avaliable: 10,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220718#MON@1000-1100',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'FRI',
    StartTime: '2022-10-14T07:15:00.000Z',
    EndTime: '2022-10-14T08:30:00.000Z',
    ClassDate: '2022-10-14T00:00:00.000Z',
    ClassRemark: '2022-07-18 10:00 To 11:00 Teacher : U0018 Venue : C',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 1,
    Avaliable: 9,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220720#WED@1200-1300',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'MON',
    StartTime: '2022-10-17T07:00:00.000Z',
    EndTime: '2022-10-17T10:00:00.000Z',
    ClassDate: '2022-10-17T00:00:00.000Z',
    ClassRemark:
      '2022-07-20 12:00 To 13:00 Teacher : U0018 Venue : C2022-10-19 07:00 To 10:00 Teacher : U0018 Venue : C',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 0,
    Avaliable: 10,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220725#MON@1000-1100',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'FRI',
    StartTime: '2022-08-05T14:00:00.000Z',
    EndTime: '2022-08-05T15:00:00.000Z',
    ClassDate: '2022-08-05T00:00:00.000Z',
    ClassRemark:
      '2022-07-25 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-05 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-05 14:00 To 15:00 Teacher : U0018 Venue : C2022-08-11 14:00 To 15:00 Teacher : U0018 Venue : C',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 0,
    Avaliable: 10,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220727#WED@1200-1300',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'WED',
    StartTime: '2022-07-27T12:00:00.000Z',
    EndTime: '2022-07-27T13:00:00.000Z',
    ClassDate: '2022-07-27T00:00:00.000Z',
    ClassRemark: '',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 0,
    Avaliable: 10,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220801#MON@1000-1100',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'SAT',
    StartTime: '2022-08-13T11:00:00.000Z',
    EndTime: '2022-08-13T12:00:00.000Z',
    ClassDate: '2022-08-13T00:00:00.000Z',
    ClassRemark:
      '2022-08-01 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-09 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-10 11:00 To 12:00 Teacher : U0018 Venue : C',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 1,
    Avaliable: 9,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220803#WED@1200-1300',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'WED',
    StartTime: '2022-08-03T12:00:00.000Z',
    EndTime: '2022-08-03T13:00:00.000Z',
    ClassDate: '2022-08-03T00:00:00.000Z',
    ClassRemark: '',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 0,
    Avaliable: 10,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '12345_A3#20220808#MON@1000-1100',
    Active: true,
    CourseCode: '12345_A3',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    WeekDay: 'SAT',
    StartTime: '2022-08-20T10:00:00.000Z',
    EndTime: '2022-08-20T11:00:00.000Z',
    ClassDate: '2022-08-20T00:00:00.000Z',
    ClassRemark:
      '2022-08-08 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-10 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-12 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-15 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-17 10:00 To 11:00 Teacher : U0018 Venue : C2022-08-20 10:00 To 11:00 Teacher : U0018 Venue : C',
    Name: 'Miss Chow',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 1,
    Avaliable: 9,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
];

const headCells = [
  {
    id: 'ClassDesc',
    numeric: true,
    label: 'Class Description',
    align: 'left',
  },
  {
    id: 'WeekDay',
    numeric: false,
    label: 'Week Day',
    align: 'left',
  },
  {
    id: 'StartTime',
    numeric: true,
    label: 'Date',
    align: 'left',
  },
  {
    id: 'StartTime',
    numeric: true,
    label: 'Class Start Time',
    align: 'left',
  },
  {
    id: 'EndTime',
    numeric: false,
    label: 'Class End Time',
    align: 'left',
  },
  {
    id: 'Name',
    numeric: true,
    label: 'Teacher',
    align: 'left',
  },
  {
    id: 'NoofStudent',
    numeric: true,
    label: 'Students',
    align: 'center',
  },
  {
    id: 'BranchCode',
    numeric: true,
    label: 'Branch Code',
    align: 'left',
  },
];

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const intl = useIntl();
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {intl.formatMessage({ id: `${headCell.label}` })}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  theme: PropTypes.object,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// ==============================|| Schedules (List) ||============================== //

const ModalContent = ({ handleClose, rowCode }) => {
  const theme = useTheme();
  // const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [transferClassStudents, setTransferClassStudents] = React.useState([
    {
      AttendaceStr: null,
      FirstName: 'Frankie ',
      Idx: 4955,
      StudentCode: '112757',
      CourseCode: '12345_A3',
      ClassCode: '12345_A3#20220718#MON@1000-1100',
      BookingDate: '2022-10-06T17:44:19.220Z',
      AttendaceTime: null,
      Cancelled: false,
      Attended: false,
      CartID: 'CA9656CB-E6F1-48A3-AF91-1BF510CC5264',
      PaymentCode: null,
      Active: true,
      BranchCode: 'CCBC-CEC',
      LastName: 'Yue',
      Email: 'frankie@yahoo.com',
      Mobile: '93145555',
      MaterialShared: '',
      QuizShared: '',
      Material: null,
      Remarks: null,
      AcademicPerformance: 0,
      LearningAttitude: 0,
      Participation: 0,
      Perseverance: 0,
      SocialInteraction: 0,
      UpdateBy: null,
      WeekDay: 'FRI',
      StartTime: '2022-10-14T07:15:00.000Z',
      EndTime: '2022-10-14T08:30:00.000Z',
      UserCode: 'U0018',
      ClassDesc: '中文寫作',
      CourseTitle: '中文寫作',
      Subject: '中文',
      CourseDesc: 'hi',
      ClassRemark: '2022-07-18 10:00 To 11:00 Teacher : U0018 Venue : C',
      CancelTime: null,
      CancelRequest: null,
      CancelRequestTime: null,
      CancelApproved: null,
      CancelApprovedBy: null,
      CancelApprovedTime: null,
      OnlineMeeting: '',
      AttendeePW: null,
      HostPW: null,
      Name: 'Miss Chow',
      TeacherCode: 'U0018',
      VenueCode: 'C',
      Points: null,
      PointsGivenBy: null,
      InvoiceNo: '000195',
      StudentClassActive: true,
      Color: '#D8D8D8',
    },
  ]);
  const intl = useIntl();
  //modal ScheduleModal
  const [openScheduleModal, setOpenScheduleModal] = React.useState(false);
  const [openTeacherModal, setOpenTeacherModal] = React.useState(false);
  const [transferClassModal, setTransferClassModal] = React.useState(false);

  const themeTypo = createTheme({
    typography: {
      fontSize: '13',
      padding: '15px',
    },
    components: {
      MuiTypography: {
        styleOverrides: { root: { padding: '6px' } },
      },
    },
  });

  const handleOpenScheduleModal = () => {
    setOpenScheduleModal(true);
  };

  const handleCloseScheduleModal = () => {
    setOpenScheduleModal(false);
  };

  const handleOpenTeacherModal = () => {
    setOpenTeacherModal(true);
  };

  const handleCloseTeacherModal = () => {
    setOpenTeacherModal(false);
  };

  const handleOpenTransferClassModal = () => {
    setTransferClassModal(true);
  };

  const handleCloseTransferClassModal = () => {
    setTransferClassModal(false);
  };

  // const { orders } = useSelector((state) => state.customer);
  // React.useEffect(() => {
  //     dispatch(getOrders());
  // }, [dispatch]);
  // React.useEffect(() => {
  //     setRows([orders]);
  // }, [orders]);
  React.useEffect(() => {
    setRows([...mockData]);
  }, []);

  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = rows.filter((row) => {
        let matches = true;

        const properties = [
          'ClassDesc',
          'WeekDay',
          'StartTime',
          'StartTime',
          'EndTime',
          'Name',
          'NoofStudent',
          'BranchCode',
        ];
        let containsQuery = false;

        properties.forEach((property) => {
          if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });
      setRows(newRows);
    } else {
      setRows(mockData);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     if (selected.length > 0) {
  //       setSelected([]);
  //     } else {
  //       const newSelectedId = rows.map((n) => n.name);
  //       setSelected(newSelectedId);
  //     }
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon={SearchIcon} />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
              placeholder=""
              value={search}
              size="small"
            />
          </Grid>
        </Grid>
      </CardContent>

      {/* table */}
      <ThemeProvider theme={themeTypo}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              theme={theme}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  /** Make sure no display bugs if row isn't an OrderData object */
                  if (typeof row === 'number') return null;

                  {
                    /* const isItemSelected = isSelected(row.name); */
                  }
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow role="checkbox" tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
                      {/* <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.name)}>
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId
                                                }}
                                            />
                                        </TableCell> */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        size="small"
                        // onClick={(event) => handleClick(event, row.name)}
                      >
                        <Typography>{row.ClassDesc} </Typography>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        // onClick={(event) => handleClick(event, row.name)}
                        sx={{ cursor: 'pointer' }}
                        size="small"
                      >
                        <Typography> {row.WeekDay} </Typography>
                      </TableCell>
                      <TableCell onClick={handleOpenScheduleModal} size="small">
                        <Tooltip title={intl.formatMessage({ id: 'Change Schedule' })} arrow>
                          <Typography
                            sx={{
                              color: '#0d6efd',
                            }}
                          >
                            {new Date(row.StartTime).toLocaleDateString('en-CA', {
                              timeZone: 'GMT',
                            })}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell onClick={handleOpenScheduleModal} size="small">
                        <Tooltip title={intl.formatMessage({ id: 'Change Schedule' })} arrow>
                          <Typography
                            sx={{
                              color: '#0d6efd',
                            }}
                          >
                            {new Date(row.StartTime).toLocaleTimeString('en-CA', {
                              timeZone: 'GMT',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left" onClick={handleOpenScheduleModal} size="small">
                        <Tooltip title={intl.formatMessage({ id: 'Change Schedule' })} arrow>
                          <Typography
                            sx={{
                              color: '#0d6efd',
                            }}
                          >
                            {new Date(row.EndTime).toLocaleTimeString('en-CA', {
                              timeZone: 'GMT',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}{' '}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left" onClick={handleOpenTeacherModal} size="small">
                        <Tooltip title={intl.formatMessage({ id: 'Change Teacher' })} arrow>
                          <Typography
                            sx={{
                              color: '#0d6efd',
                            }}
                          >
                            {row.Name}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center" size="small" onClick={handleOpenTransferClassModal}>
                        <Tooltip title={intl.formatMessage({ id: 'Transfer Class' })} arrow>
                          <Typography
                            sx={{
                              color: '#0d6efd',
                            }}
                          >
                            {row.NoofStudent}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left" size="small">
                        <Typography>{row.BranchCode}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>

      {/* table pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={intl.formatMessage({ id: 'Show' })}
      />
      <ChangeScheduleModal
        open={openScheduleModal}
        handleCloseScheduleModal={handleCloseScheduleModal}
      />
      <ChangeTeacherModal
        open={openTeacherModal}
        handleCloseTeacherModal={handleCloseTeacherModal}
      />
      <TransferClass
        open={transferClassModal}
        handleCloseTransferClassModal={handleCloseTransferClassModal}
        transferClassStudents={transferClassStudents}
      />
    </Box>
  );
};

export default ModalContent;
