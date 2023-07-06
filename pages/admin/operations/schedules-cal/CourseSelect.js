import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Checkbox,
  Grid,
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
  Typography,
} from '@mui/material';

// third-party
import { format } from 'date-fns';
import { useIntl } from 'react-intl';

// project imports

// assets
import { Icon } from '@iconify/react';
import SearchIcon from '@iconify/icons-carbon/search';

const sample = [
  {
    ClassCode: '2304DO00001#20230403#MON@1500-1700',
    Active: true,
    CourseCode: '2304DO00001',
    ClassDesc: 'DoClever Training (Mon)',
    TeacherCode: 'U0012',
    VenueCode: '01',
    WeekDay: 'MON',
    StartTime: '2023-04-03T15:00:00.000Z',
    EndTime: '2023-04-03T17:00:00.000Z',
    ClassDate: '2023-04-03T00:00:00.000Z',
    ClassRemark: '',
    Name: 'AlanL',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 99,
    NoofStudent: 2,
    Avaliable: 97,
    Attended: 0,
    CourseMasterCode: 'DO00001',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '15:00',
    TimeEnd: '17:00',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: '2303abc123#20230404#TUE@1600-1700',
    Active: true,
    CourseCode: '2303abc123',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'TUE',
    StartTime: '2023-04-04T16:00:00.000Z',
    EndTime: '2023-04-04T17:00:00.000Z',
    ClassDate: '2023-04-04T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 3,
    NoofStudent: 0,
    Avaliable: 3,
    Attended: 0,
    CourseMasterCode: 'abc123',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '16:00',
    TimeEnd: '17:00',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: 'EngG12#20230405#WED@1130-1230',
    Active: true,
    CourseCode: 'EngG12',
    ClassDesc: 'Eng Grammar',
    TeacherCode: 'U0028',
    VenueCode: '01',
    WeekDay: 'WED',
    StartTime: '2023-04-05T11:30:00.000Z',
    EndTime: '2023-04-05T12:30:00.000Z',
    ClassDate: '2023-04-05T00:00:00.000Z',
    ClassRemark: '',
    Name: 'raymond',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 16,
    NoofStudent: 2,
    Avaliable: 14,
    Attended: 0,
    CourseMasterCode: 'Eng',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '11:30',
    TimeEnd: '12:30',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: '2304abc123#20230406#THU@0930-1030',
    Active: true,
    CourseCode: '2304abc123',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'THU',
    StartTime: '2023-04-06T09:30:00.000Z',
    EndTime: '2023-04-06T10:30:00.000Z',
    ClassDate: '2023-04-06T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 5,
    NoofStudent: 1,
    Avaliable: 4,
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
  {
    ClassCode: '2304DO00001#20230410#MON@1500-1700',
    Active: true,
    CourseCode: '2304DO00001',
    ClassDesc: 'DoClever Training (Mon)',
    TeacherCode: 'U0012',
    VenueCode: '01',
    WeekDay: 'MON',
    StartTime: '2023-04-10T15:00:00.000Z',
    EndTime: '2023-04-10T17:00:00.000Z',
    ClassDate: '2023-04-10T00:00:00.000Z',
    ClassRemark: '',
    Name: 'AlanL',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 99,
    NoofStudent: 2,
    Avaliable: 97,
    Attended: 0,
    CourseMasterCode: 'DO00001',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '15:00',
    TimeEnd: '17:00',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: '2303abc123#20230411#TUE@1600-1700',
    Active: true,
    CourseCode: '2303abc123',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'TUE',
    StartTime: '2023-04-11T16:00:00.000Z',
    EndTime: '2023-04-11T17:00:00.000Z',
    ClassDate: '2023-04-11T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 3,
    NoofStudent: 1,
    Avaliable: 2,
    Attended: 0,
    CourseMasterCode: 'abc123',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '16:00',
    TimeEnd: '17:00',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: 'EngG12#20230412#WED@1130-1230',
    Active: true,
    CourseCode: 'EngG12',
    ClassDesc: 'Eng Grammar',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'WED',
    StartTime: '2023-04-12T11:30:00.000Z',
    EndTime: '2023-04-12T12:30:00.000Z',
    ClassDate: '2023-04-12T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 16,
    NoofStudent: 1,
    Avaliable: 15,
    Attended: 0,
    CourseMasterCode: 'Eng',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '11:30',
    TimeEnd: '12:30',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: '2304abc123#20230413#THU@0930-1030',
    Active: true,
    CourseCode: '2304abc123',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'THU',
    StartTime: '2023-04-13T09:30:00.000Z',
    EndTime: '2023-04-13T10:30:00.000Z',
    ClassDate: '2023-04-13T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 5,
    NoofStudent: 1,
    Avaliable: 4,
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
  {
    ClassCode: '2304DO00001#20230417#MON@1500-1700',
    Active: true,
    CourseCode: '2304DO00001',
    ClassDesc: 'DoClever Training (Mon)',
    TeacherCode: 'U0012',
    VenueCode: '01',
    WeekDay: 'MON',
    StartTime: '2023-04-17T15:00:00.000Z',
    EndTime: '2023-04-17T17:00:00.000Z',
    ClassDate: '2023-04-17T00:00:00.000Z',
    ClassRemark: '',
    Name: 'AlanL',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 99,
    NoofStudent: 2,
    Avaliable: 97,
    Attended: 0,
    CourseMasterCode: 'DO00001',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '15:00',
    TimeEnd: '17:00',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: '2303abc123#20230418#TUE@1600-1700',
    Active: true,
    CourseCode: '2303abc123',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'TUE',
    StartTime: '2023-04-18T16:00:00.000Z',
    EndTime: '2023-04-18T17:00:00.000Z',
    ClassDate: '2023-04-18T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 3,
    NoofStudent: 1,
    Avaliable: 2,
    Attended: 0,
    CourseMasterCode: 'abc123',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '16:00',
    TimeEnd: '17:00',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: 'EngG12#20230419#WED@1130-1230',
    Active: true,
    CourseCode: 'EngG12',
    ClassDesc: 'Eng Grammar',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'WED',
    StartTime: '2023-04-19T11:30:00.000Z',
    EndTime: '2023-04-19T12:30:00.000Z',
    ClassDate: '2023-04-19T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 16,
    NoofStudent: 1,
    Avaliable: 15,
    Attended: 0,
    CourseMasterCode: 'Eng',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '11:30',
    TimeEnd: '12:30',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: '2304abc123#20230420#THU@0930-1030',
    Active: true,
    CourseCode: '2304abc123',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'THU',
    StartTime: '2023-04-20T09:30:00.000Z',
    EndTime: '2023-04-20T10:30:00.000Z',
    ClassDate: '2023-04-20T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 5,
    NoofStudent: 1,
    Avaliable: 4,
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
  {
    ClassCode: '2304DO00001#20230424#MON@1500-1700',
    Active: true,
    CourseCode: '2304DO00001',
    ClassDesc: 'DoClever Training (Mon)',
    TeacherCode: 'U0012',
    VenueCode: '01',
    WeekDay: 'MON',
    StartTime: '2023-04-24T15:00:00.000Z',
    EndTime: '2023-04-24T17:00:00.000Z',
    ClassDate: '2023-04-24T00:00:00.000Z',
    ClassRemark: '',
    Name: 'AlanL',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 99,
    NoofStudent: 2,
    Avaliable: 97,
    Attended: 0,
    CourseMasterCode: 'DO00001',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '15:00',
    TimeEnd: '17:00',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: 'EngG12#20230426#WED@1130-1230',
    Active: true,
    CourseCode: 'EngG12',
    ClassDesc: 'Eng Grammar',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'WED',
    StartTime: '2023-04-26T11:30:00.000Z',
    EndTime: '2023-04-26T12:30:00.000Z',
    ClassDate: '2023-04-26T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 16,
    NoofStudent: 1,
    Avaliable: 15,
    Attended: 0,
    CourseMasterCode: 'Eng',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '11:30',
    TimeEnd: '12:30',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: '2304abc123#20230427#THU@0930-1030',
    Active: true,
    CourseCode: '2304abc123',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'THU',
    StartTime: '2023-04-27T09:30:00.000Z',
    EndTime: '2023-04-27T10:30:00.000Z',
    ClassDate: '2023-04-27T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 5,
    NoofStudent: 1,
    Avaliable: 4,
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
  {
    ClassCode: 'EngG12#20230503#WED@1130-1230',
    Active: true,
    CourseCode: 'EngG12',
    ClassDesc: 'Eng Grammar',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'WED',
    StartTime: '2023-05-03T11:30:00.000Z',
    EndTime: '2023-05-03T12:30:00.000Z',
    ClassDate: '2023-05-03T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 16,
    NoofStudent: 1,
    Avaliable: 15,
    Attended: 0,
    CourseMasterCode: 'Eng',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '11:30',
    TimeEnd: '12:30',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: 'EngG12#20230510#WED@1130-1230',
    Active: true,
    CourseCode: 'EngG12',
    ClassDesc: 'Eng Grammar',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'WED',
    StartTime: '2023-05-10T11:30:00.000Z',
    EndTime: '2023-05-10T12:30:00.000Z',
    ClassDate: '2023-05-10T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 16,
    NoofStudent: 1,
    Avaliable: 15,
    Attended: 0,
    CourseMasterCode: 'Eng',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '11:30',
    TimeEnd: '12:30',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: 'EngG12#20230517#WED@1130-1230',
    Active: true,
    CourseCode: 'EngG12',
    ClassDesc: 'Eng Grammar',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'WED',
    StartTime: '2023-05-17T11:30:00.000Z',
    EndTime: '2023-05-17T12:30:00.000Z',
    ClassDate: '2023-05-17T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 16,
    NoofStudent: 1,
    Avaliable: 15,
    Attended: 0,
    CourseMasterCode: 'Eng',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '11:30',
    TimeEnd: '12:30',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: 'EngG12#20230524#WED@1130-1230',
    Active: true,
    CourseCode: 'EngG12',
    ClassDesc: 'Eng Grammar',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'WED',
    StartTime: '2023-05-24T11:30:00.000Z',
    EndTime: '2023-05-24T12:30:00.000Z',
    ClassDate: '2023-05-24T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 16,
    NoofStudent: 1,
    Avaliable: 15,
    Attended: 0,
    CourseMasterCode: 'Eng',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '11:30',
    TimeEnd: '12:30',
    Column24: 0,
    ClassStatus: 'Pending',
  },
  {
    ClassCode: 'EngG12#20230531#WED@1130-1230',
    Active: true,
    CourseCode: 'EngG12',
    ClassDesc: 'Eng Grammar',
    TeacherCode: 'U0022',
    VenueCode: '01',
    WeekDay: 'WED',
    StartTime: '2023-05-31T11:30:00.000Z',
    EndTime: '2023-05-31T12:30:00.000Z',
    ClassDate: '2023-05-31T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 16,
    NoofStudent: 1,
    Avaliable: 15,
    Attended: 0,
    CourseMasterCode: 'Eng',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
    Color: '#D8D8D8',
    TimeStart: '11:30',
    TimeEnd: '12:30',
    Column24: 0,
    ClassStatus: 'Pending',
  },
];

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

// table header options
const headCells = [
  {
    id: 'cid',
    numeric: false,
    label: 'All',
    align: 'left',
  },
];

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }) => (
  <Toolbar
    sx={{
      p: 0,
      pl: 2,
      pr: 1,
      color: numSelected > 0 ? 'secondary.main' : 'inherit',
    }}
  >
    {numSelected > 0 ? (
      <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="h6" component="div">
        {numSelected} Selected
      </Typography>
    ) : (
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        Select
      </Typography>
    )}
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  theme,
  selected,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {numSelected > 0 && (
          <TableCell padding="none" colSpan={7}>
            <EnhancedTableToolbar numSelected={selected.length} />
          </TableCell>
        )}
        {numSelected <= 0 &&
          headCells.map((headCell) => (
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
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Typography component="span" sx={{ display: 'none' }}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Typography>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        {/* {numSelected <= 0 && (
          <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900' }}
            >
              Action
            </Typography>
          </TableCell>
        )} */}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  theme: PropTypes.object,
  selected: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// ==============================|| PRODUCT LIST ||============================== //

const CourseSelect = () => {
  const theme = useTheme();
  const intl = useIntl();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [unique, setUnique] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let csa;
  React.useEffect(() => {
    csa = sample
      .map((obj) => obj.CourseCode)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((item) => ({ cid: item }));
    setRows(csa);
    setUnique(csa);
  }, []);

  const handleSearch = (event) => {
    const newString = event.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = rows.filter((row) => {
        let matches = true;

        const properties = ['cid'];
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
      setRows(unique);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelectedId = rows.map((n) => n.name);
  //     setSelected(newSelectedId);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      if (selected.length > 0) {
        setSelected([]);
      } else {
        const newSelectedId = rows.map((n) => n.cid);
        setSelected(newSelectedId);
      }
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    if (event.target.value) setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item lg={12}>
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
      <TableContainer>
        <Table sx={{ minWidth: 250 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            theme={theme}
            selected={selected}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                if (typeof row === 'number') return null;
                const isItemSelected = isSelected(row.cid);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={{ pl: 3 }}
                      onClick={(event) => handleClick(event, row.cid)}
                    >
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color:
                            theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900',
                          textDecoration: 'none',
                        }}
                      >
                        {row.cid}
                      </Typography>
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
                <TableCell colSpan={2} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
    </Card>
  );
};

export default CourseSelect;
