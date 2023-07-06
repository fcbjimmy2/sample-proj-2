// layouts
import AdminLayout from '../../../../src/layouts/admin';
import { Page } from '../../../../src/components/admin';

import PropTypes from 'prop-types';
import * as React from 'react';

// next
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
import Chip from '../../../../src/components/extended/Chip';
import MainCard from '../../../../src/components/extended/MainCard';
// import { useDispatch, useSelector } from 'store';
// import { getOrders } from 'store/slices/customer';

// assets
import { Icon } from '@iconify/react';
import DeleteIcon from '@iconify/icons-carbon/trash-can';
import SearchIcon from '@iconify/icons-carbon/search';

// third-party
import { useIntl } from 'react-intl';

//modal
import SimpleModal from './SimpleModal';

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

const mockData = [
  {
    CourseCode: '12345_A3',
    CourseType: '中文寫作',
    Subscription: false,
    CourseTitle: '中文寫作',
    CourseDesc: 'hi',
    CourseRemark: 'dasddasd',
    InvoiceItemDesc: 'hi',
    Year: '2023',
    Form: '',
    Subject: '中文',
    CourseStart: '2022-07-11T00:00:00.000Z',
    CourseEnd: '2022-08-08T00:00:00.000Z',
    CourseActiveDate: '2022-07-04T00:00:00.000Z',
    CourseDeactiveDate: '2022-07-08T00:00:00.000Z',
    CourseQuota: 10,
    CoursePrice: 300,
    MethodCode: '01',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'MON (10:00-11:00)\rWED (12:00-13:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: '12345',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 9,
    CourseInternalRemark: 'Test',
    TeacherCost2: 0,
    Name: 'Miss Chow',
    VenueName: '輔導室C',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '12345X',
    CourseType: '中文寫作',
    Subscription: false,
    CourseTitle: '中文寫作',
    CourseDesc: 'hi',
    CourseRemark: '',
    InvoiceItemDesc: 'hi',
    Year: '2022',
    Form: '',
    Subject: '中文',
    CourseStart: '2022-07-01T00:00:00.000Z',
    CourseEnd: '2022-07-02T00:00:00.000Z',
    CourseActiveDate: '2022-06-30T00:00:00.000Z',
    CourseDeactiveDate: '2022-07-02T00:00:00.000Z',
    CourseQuota: 5,
    CoursePrice: 500,
    MethodCode: '04',
    TeacherCode: 'U0020',
    VenueCode: '06',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'FRI-SAT (10:00-11:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: '12345',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 2,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'Teacher Leung',
    VenueName: 'Room 6',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '202206001A_001',
    CourseType: '繪畫',
    Subscription: false,
    CourseTitle: '兒童繪畫初班 A',
    CourseDesc: '兒童繪畫初班 A',
    CourseRemark: '',
    InvoiceItemDesc: '兒童繪畫初班 A',
    Year: '2022',
    Form: '',
    Subject: '繪畫',
    CourseStart: '2022-06-01T00:00:00.000Z',
    CourseEnd: '2022-06-29T00:00:00.000Z',
    CourseActiveDate: '2022-05-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-06-30T00:00:00.000Z',
    CourseQuota: 20,
    CoursePrice: 3000,
    MethodCode: '04',
    TeacherCode: 'U0022',
    VenueCode: '02',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'MON,WED,FRI (10:00-11:30)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: '202206001A',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 12,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'MIss Kitty',
    VenueName: 'Room 2',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2206266000',
    CourseType: '數理',
    Subscription: false,
    CourseTitle: '2206266001 - 奧數(初班)Zoom+ ',
    CourseDesc: '數理\r\n2206266001 - 奧數(初班)',
    CourseRemark: '',
    InvoiceItemDesc: '數理\r\n2206266001 - 奧數(初班)',
    Year: '2023',
    Form: '',
    Subject: '數學',
    CourseStart: '2022-06-02T00:00:00.000Z',
    CourseEnd: '2022-06-30T00:00:00.000Z',
    CourseActiveDate: '2022-05-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-06-30T00:00:00.000Z',
    CourseQuota: 20,
    CoursePrice: 450,
    MethodCode: '01',
    TeacherCode: 'U0012',
    VenueCode: '05',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'TUE,THU (15:00-17:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: '266000',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 9,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'AlanL',
    VenueName: 'Room 5',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2206266001',
    CourseType: '數理',
    Subscription: false,
    CourseTitle: '2206266001 - 奧數(中班)Zoom+ ',
    CourseDesc: '數理\r\n2206266001 - 奧數(中班)Zoom+ ',
    CourseRemark: '',
    InvoiceItemDesc: '數理\r\n2206266001 - 奧數(中班)Zoom+ ',
    Year: '2023',
    Form: '',
    Subject: '數學',
    CourseStart: '2022-06-20T00:00:00.000Z',
    CourseEnd: '2022-07-11T00:00:00.000Z',
    CourseActiveDate: '2022-06-15T00:00:00.000Z',
    CourseDeactiveDate: '2022-07-15T00:00:00.000Z',
    CourseQuota: 12,
    CoursePrice: 150,
    MethodCode: '01',
    TeacherCode: 'U0027',
    VenueCode: '01',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'MON (16:00-17:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: '266001',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 4,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: '陳麗貞',
    VenueName: 'Room 1',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2210BF',
    CourseType: 'BF',
    Subscription: false,
    CourseTitle: '2022',
    CourseDesc: 'XXX',
    CourseRemark: 'XX',
    InvoiceItemDesc: 'XXX',
    Year: '2023',
    Form: '',
    Subject: '',
    CourseStart: '2022-10-01T00:00:00.000Z',
    CourseEnd: '2022-10-31T00:00:00.000Z',
    CourseActiveDate: '2022-10-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-10-31T00:00:00.000Z',
    CourseQuota: 100,
    CoursePrice: 150,
    MethodCode: '01',
    TeacherCode: 'U0014',
    VenueCode: '05',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: null,
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'BF',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 0,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: '阡陌中心',
    VenueName: 'Room 5',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2210Do',
    CourseType: 'DoClever',
    Subscription: false,
    CourseTitle: 'DoClever Training',
    CourseDesc: 'DoClever Training',
    CourseRemark: 'DoClever Training',
    InvoiceItemDesc: 'DoClever Training',
    Year: '2022',
    Form: '',
    Subject: 'DoClever Training',
    CourseStart: '2022-10-01T00:00:00.000Z',
    CourseEnd: '2022-10-31T00:00:00.000Z',
    CourseActiveDate: '2022-10-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-10-30T00:00:00.000Z',
    CourseQuota: 20,
    CoursePrice: 150,
    MethodCode: '01',
    TeacherCode: 'U0027',
    VenueCode: 'B',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'SUN (10:15-10:30)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'Do',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 5,
    CourseInternalRemark: 'DoClever Training',
    TeacherCost2: 0,
    Name: '陳麗貞',
    VenueName: '輔導室B',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2210Do01',
    CourseType: 'DoClever',
    Subscription: false,
    CourseTitle: 'DoClever Training',
    CourseDesc: 'DoClever Training',
    CourseRemark: 'DoClever Training',
    InvoiceItemDesc: 'DoClever Training',
    Year: '2022',
    Form: '',
    Subject: 'DoClever Training',
    CourseStart: '2022-10-01T00:00:00.000Z',
    CourseEnd: '2022-10-31T00:00:00.000Z',
    CourseActiveDate: '2022-10-26T00:00:00.000Z',
    CourseDeactiveDate: '2022-10-29T00:00:00.000Z',
    CourseQuota: 20,
    CoursePrice: 150,
    MethodCode: '01',
    TeacherCode: 'U0012',
    VenueCode: '01',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: null,
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'Do',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 0,
    CourseInternalRemark: 'DoClever Training',
    TeacherCost2: 0,
    Name: 'AlanL',
    VenueName: 'Room 1',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2210Do02',
    CourseType: 'DoClever',
    Subscription: false,
    CourseTitle: 'DoClever Training',
    CourseDesc: 'DoClever Training',
    CourseRemark: 'DoClever Training',
    InvoiceItemDesc: 'DoClever Training',
    Year: '2023',
    Form: '',
    Subject: 'DoClever Training',
    CourseStart: '2022-10-01T00:00:00.000Z',
    CourseEnd: '2022-10-31T00:00:00.000Z',
    CourseActiveDate: '2022-10-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-10-31T00:00:00.000Z',
    CourseQuota: 20,
    CoursePrice: 150,
    MethodCode: '01',
    TeacherCode: 'U0012',
    VenueCode: '02',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'SUN (12:00-12:30)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'Do',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 5,
    CourseInternalRemark: 'DoClever Training',
    TeacherCost2: 0,
    Name: 'AlanL',
    VenueName: 'Room 2',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2211D20220002',
    CourseType: 'DoClever',
    Subscription: false,
    CourseTitle: 'DoClever Training',
    CourseDesc: 'DoClever Training',
    CourseRemark: 'DoClever Training',
    InvoiceItemDesc: 'DoClever Training',
    Year: '2023',
    Form: '',
    Subject: 'DoClever Training',
    CourseStart: '2022-11-01T00:00:00.000Z',
    CourseEnd: '2022-11-30T00:00:00.000Z',
    CourseActiveDate: '2022-10-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-11-30T00:00:00.000Z',
    CourseQuota: 120,
    CoursePrice: 150,
    MethodCode: '01',
    TeacherCode: 'U0030',
    VenueCode: 'C',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'TUE (16:00-17:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'D20220002',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 5,
    CourseInternalRemark: 'DoClever Training',
    TeacherCost2: 0,
    Name: 'Alan Lau',
    VenueName: '輔導室C',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2211D20220003',
    CourseType: 'DoClever',
    Subscription: false,
    CourseTitle: 'DoClever Training (WED)',
    CourseDesc: 'DoClever Training',
    CourseRemark: 'DoClever Training',
    InvoiceItemDesc: 'DoClever Training',
    Year: '2022',
    Form: '',
    Subject: 'DoClever Training',
    CourseStart: '2022-11-01T00:00:00.000Z',
    CourseEnd: '2022-11-30T00:00:00.000Z',
    CourseActiveDate: '2022-10-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-11-30T00:00:00.000Z',
    CourseQuota: 20,
    CoursePrice: 150,
    MethodCode: '01',
    TeacherCode: 'U0027',
    VenueCode: '05',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: null,
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'D20220003',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 0,
    CourseInternalRemark: 'DoClever Training',
    TeacherCost2: 0,
    Name: '陳麗貞',
    VenueName: 'Room 5',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2211D20220004',
    CourseType: 'DoClever',
    Subscription: false,
    CourseTitle: 'DoClever Training (WED)',
    CourseDesc: 'DoClever Training',
    CourseRemark: 'DoClever Training',
    InvoiceItemDesc: 'DoClever Training',
    Year: '2022',
    Form: '',
    Subject: 'DoClever Training',
    CourseStart: '2022-11-01T00:00:00.000Z',
    CourseEnd: '2022-11-30T00:00:00.000Z',
    CourseActiveDate: '2022-10-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-11-30T00:00:00.000Z',
    CourseQuota: 20,
    CoursePrice: 150,
    MethodCode: '01',
    TeacherCode: 'U0027',
    VenueCode: '05',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'WED (14:00-15:30)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'D20220004',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 4,
    CourseInternalRemark: 'DoClever Training',
    TeacherCost2: 0,
    Name: '陳麗貞',
    VenueName: 'Room 5',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2211D20220005',
    CourseType: 'DoClever',
    Subscription: false,
    CourseTitle: 'DoClever Training (FRI)',
    CourseDesc: 'DoClever Training',
    CourseRemark: 'DoClever Training',
    InvoiceItemDesc: 'DoClever Training',
    Year: '2022',
    Form: '',
    Subject: 'DoClever Training',
    CourseStart: '2022-11-01T00:00:00.000Z',
    CourseEnd: '2022-11-30T00:00:00.000Z',
    CourseActiveDate: '2022-10-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-11-30T00:00:00.000Z',
    CourseQuota: 20,
    CoursePrice: 150,
    MethodCode: '01',
    TeacherCode: 'U0027',
    VenueCode: '05',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'FRI (10:00-11:30)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'D20220005',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 4,
    CourseInternalRemark: 'DoClever Training',
    TeacherCost2: 0,
    Name: '陳麗貞',
    VenueName: 'Room 5',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2211MATH1100FRI',
    CourseType: 'MATH',
    Subscription: false,
    CourseTitle: 'MATH F1',
    CourseDesc: 'MATH F1',
    CourseRemark: 'MATH F1',
    InvoiceItemDesc: 'MATH F1',
    Year: '2022',
    Form: '',
    Subject: 'MATH F1',
    CourseStart: '2022-11-01T00:00:00.000Z',
    CourseEnd: '2022-11-30T00:00:00.000Z',
    CourseActiveDate: '2022-10-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-11-30T00:00:00.000Z',
    CourseQuota: 10,
    CoursePrice: 200,
    MethodCode: '01',
    TeacherCode: 'U0022',
    VenueCode: 'C',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'FRI (11:00-13:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'MATH1100FRI',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 4,
    CourseInternalRemark: 'MATH F1',
    TeacherCost2: 0,
    Name: 'MIss Kitty',
    VenueName: '輔導室C',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2211MATH1100THU',
    CourseType: 'MATH',
    Subscription: false,
    CourseTitle: 'MATH F1',
    CourseDesc: 'MATH F1',
    CourseRemark: 'MATH F1',
    InvoiceItemDesc: 'MATH F1',
    Year: '2022',
    Form: '',
    Subject: 'MATH F1',
    CourseStart: '2022-11-01T00:00:00.000Z',
    CourseEnd: '2022-11-30T00:00:00.000Z',
    CourseActiveDate: '2022-10-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-11-30T00:00:00.000Z',
    CourseQuota: 10,
    CoursePrice: 200,
    MethodCode: '01',
    TeacherCode: 'U0022',
    VenueCode: 'C',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'THU (11:00-13:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'MATH1100THU',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 4,
    CourseInternalRemark: 'MATH F1',
    TeacherCost2: 0,
    Name: 'MIss Kitty',
    VenueName: '輔導室C',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2211MATH1100TUE',
    CourseType: 'MATH',
    Subscription: false,
    CourseTitle: 'MATH F1',
    CourseDesc: 'MATH F1',
    CourseRemark: 'MATH F1',
    InvoiceItemDesc: 'MATH F1',
    Year: '2022',
    Form: '',
    Subject: 'MATH F1',
    CourseStart: '2022-11-01T00:00:00.000Z',
    CourseEnd: '2022-11-30T00:00:00.000Z',
    CourseActiveDate: '2022-10-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-11-30T00:00:00.000Z',
    CourseQuota: 10,
    CoursePrice: 200,
    MethodCode: '01',
    TeacherCode: 'U0022',
    VenueCode: 'C',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'TUE (11:00-13:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'MATH1100TUE',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 5,
    CourseInternalRemark: 'MATH F1',
    TeacherCost2: 0,
    Name: 'MIss Kitty',
    VenueName: '輔導室C',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2211MATH1100WED',
    CourseType: 'MATH',
    Subscription: false,
    CourseTitle: 'MATH F1',
    CourseDesc: 'MATH F1',
    CourseRemark: 'MATH F1',
    InvoiceItemDesc: 'MATH F1',
    Year: '2022',
    Form: '',
    Subject: 'MATH F1',
    CourseStart: '2022-11-01T00:00:00.000Z',
    CourseEnd: '2022-11-30T00:00:00.000Z',
    CourseActiveDate: '2022-10-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-11-30T00:00:00.000Z',
    CourseQuota: 10,
    CoursePrice: 200,
    MethodCode: '01',
    TeacherCode: 'U0018',
    VenueCode: 'C',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'WED (11:00-13:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'MATH1100WED',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 4,
    CourseInternalRemark: 'MATH F1',
    TeacherCost2: 0,
    Name: 'Miss Chow',
    VenueName: '輔導室C',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2302DO0001',
    CourseType: 'Trinning',
    Subscription: false,
    CourseTitle: 'DoCleverTraining',
    CourseDesc: 'DoCleverTraining',
    CourseRemark: 'DoCleverTraining',
    InvoiceItemDesc: 'DoCleverTraining',
    Year: '2023',
    Form: '',
    Subject: 'Trinning',
    CourseStart: '2023-02-01T00:00:00.000Z',
    CourseEnd: '2023-02-28T00:00:00.000Z',
    CourseActiveDate: '2023-01-01T00:00:00.000Z',
    CourseDeactiveDate: '2023-01-31T00:00:00.000Z',
    CourseQuota: 20,
    CoursePrice: 1000,
    MethodCode: '01',
    TeacherCode: 'U0022',
    VenueCode: '04',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'TUE,THU (10:00-11:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'DO0001',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 8,
    CourseInternalRemark: 'DoCleverTraining',
    TeacherCost2: 0,
    Name: 'MIss Kitty',
    VenueName: 'Room 4',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2302DO0002',
    CourseType: 'Training',
    Subscription: false,
    CourseTitle: 'DoCleverTraining',
    CourseDesc: 'DoCleverTraining',
    CourseRemark: '',
    InvoiceItemDesc: 'DoCleverTraining',
    Year: '',
    Form: '',
    Subject: '',
    CourseStart: '2023-02-28T00:00:00.000Z',
    CourseEnd: '2023-03-31T00:00:00.000Z',
    CourseActiveDate: '2023-01-01T00:00:00.000Z',
    CourseDeactiveDate: '2023-02-28T00:00:00.000Z',
    CourseQuota: 20,
    CoursePrice: 1000,
    MethodCode: '01',
    TeacherCode: 'U0012',
    VenueCode: '06',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CC',
    CourseTime: 'MON-TUE (19:00-21:30)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'DO0002',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 9,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'AlanL',
    VenueName: 'Room 6',
    PriceString: null,
    CourseActive: 1,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2303DO00003',
    CourseType: 'Training',
    Subscription: false,
    CourseTitle: 'DoClever Training',
    CourseDesc: 'DoClever Training',
    CourseRemark: 'DoClever Training',
    InvoiceItemDesc: 'DoClever Training',
    Year: '2023',
    Form: '',
    Subject: 'DoClever Training',
    CourseStart: '2023-03-01T00:00:00.000Z',
    CourseEnd: '2023-03-31T00:00:00.000Z',
    CourseActiveDate: '2023-02-01T00:00:00.000Z',
    CourseDeactiveDate: '2023-02-28T00:00:00.000Z',
    CourseQuota: 10,
    CoursePrice: 1000,
    MethodCode: '04',
    TeacherCode: 'U0018',
    VenueCode: '02',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'TUE (15:15-16:15)',
    NumOfStudent: 2,
    Status: '-',
    CourseMasterCode: 'DO00003',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 4,
    CourseInternalRemark: 'DoClever Training',
    TeacherCost2: 0,
    Name: 'Miss Chow',
    VenueName: 'Room 2',
    PriceString: null,
    CourseActive: 1,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: '2304DO00001',
    CourseType: 'Training',
    Subscription: false,
    CourseTitle: 'DoClever Training (Mon)',
    CourseDesc: 'DoClever Training (Mon)',
    CourseRemark: 'DoClever Training (Mon)',
    InvoiceItemDesc: 'DoClever Training (Mon)',
    Year: '2023',
    Form: '',
    Subject: 'DoClever Training (Mon)',
    CourseStart: '2023-04-01T00:00:00.000Z',
    CourseEnd: '2023-04-30T00:00:00.000Z',
    CourseActiveDate: '2023-03-01T00:00:00.000Z',
    CourseDeactiveDate: '2023-03-31T00:00:00.000Z',
    CourseQuota: 99,
    CoursePrice: 2000,
    MethodCode: '04',
    TeacherCode: 'U0012',
    VenueCode: '01',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'MON (15:00-17:00)',
    NumOfStudent: 1,
    Status: '-',
    CourseMasterCode: 'DO00001',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 4,
    CourseInternalRemark: 'DoClever Training (Mon)',
    TeacherCost2: 0,
    Name: 'AlanL',
    VenueName: 'Room 1',
    PriceString: null,
    CourseActive: 1,
    CourseEnrollActive: 1,
  },
  {
    CourseCode: '847632764023640',
    CourseType: 'CHPI',
    Subscription: false,
    CourseTitle: 'CHPI',
    CourseDesc: 'CHPI',
    CourseRemark: 'CHPI',
    InvoiceItemDesc: 'CHPI',
    Year: '2022',
    Form: '',
    Subject: '',
    CourseStart: '2022-10-27T00:00:00.000Z',
    CourseEnd: '2022-12-24T00:00:00.000Z',
    CourseActiveDate: '2022-10-21T00:00:00.000Z',
    CourseDeactiveDate: '2022-10-31T00:00:00.000Z',
    CourseQuota: 99,
    CoursePrice: 120,
    MethodCode: '01',
    TeacherCode: 'U0058',
    VenueCode: 'A',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'THU,SAT (14:00-16:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'hihi',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 18,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'doclever demo',
    VenueName: '輔導室A',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'chinese1.0',
    CourseType: 'DSE中文寫作 ',
    Subscription: false,
    CourseTitle: 'DSE中文寫作',
    CourseDesc: 'hi',
    CourseRemark: '',
    InvoiceItemDesc: 'hi',
    Year: '2022',
    Form: '',
    Subject: '中文',
    CourseStart: '2022-08-16T00:00:00.000Z',
    CourseEnd: '2022-09-15T00:00:00.000Z',
    CourseActiveDate: '2022-08-10T00:00:00.000Z',
    CourseDeactiveDate: '2022-08-26T00:00:00.000Z',
    CourseQuota: 12,
    CoursePrice: 200,
    MethodCode: '01',
    TeacherCode: 'U0052',
    VenueCode: '02',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'TUE,THU (16:00-17:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'Chinese ',
    CourseMinLimit: 6,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 10,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'Miss Ma',
    VenueName: 'Room 2',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'chineseW',
    CourseType: '中文寫作',
    Subscription: false,
    CourseTitle: '中文寫作',
    CourseDesc: 'hhhhhh',
    CourseRemark: '',
    InvoiceItemDesc: 'hhhhhh',
    Year: '2023',
    Form: '',
    Subject: '中文',
    CourseStart: '2022-06-21T00:00:00.000Z',
    CourseEnd: '2022-07-14T00:00:00.000Z',
    CourseActiveDate: '2022-06-16T00:00:00.000Z',
    CourseDeactiveDate: '2022-06-20T00:00:00.000Z',
    CourseQuota: 10,
    CoursePrice: 500,
    MethodCode: '01',
    TeacherCode: 'U0049',
    VenueCode: '01',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'TUE,THU (15:30-16:30)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'Chinese ',
    CourseMinLimit: 6,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 8,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'Li Sir',
    VenueName: 'Room 1',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'CHP12207',
    CourseType: 'CHPI',
    Subscription: false,
    CourseTitle: 'CHPI',
    CourseDesc: 'CHPI',
    CourseRemark: 'CHPI',
    InvoiceItemDesc: 'CHPI',
    Year: '22',
    Form: '',
    Subject: '',
    CourseStart: '2022-07-01T00:00:00.000Z',
    CourseEnd: '2022-07-29T00:00:00.000Z',
    CourseActiveDate: '2022-06-23T00:00:00.000Z',
    CourseDeactiveDate: '2022-06-30T00:00:00.000Z',
    CourseQuota: 99,
    CoursePrice: 120,
    MethodCode: '01',
    TeacherCode: 'U0022',
    VenueCode: '01',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'MON,WED,FRI (16:00-17:15)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'CHP1',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 13,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'MIss Kitty',
    VenueName: 'Room 1',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'D123_A',
    CourseType: 'Maths',
    Subscription: false,
    CourseTitle: 'A Maths',
    CourseDesc: 'A Maths ',
    CourseRemark: '',
    InvoiceItemDesc: 'A Maths ',
    Year: '2022',
    Form: '',
    Subject: 'Maths',
    CourseStart: '2022-07-01T00:00:00.000Z',
    CourseEnd: '2022-07-29T00:00:00.000Z',
    CourseActiveDate: '2022-06-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-07-31T00:00:00.000Z',
    CourseQuota: 20,
    CoursePrice: 450,
    MethodCode: '01',
    TeacherCode: 'U0033',
    VenueCode: 'B',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'FRI (09:00-11:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'D123',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 5,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'Teacher S',
    VenueName: '輔導室B',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'D20220708A',
    CourseType: 'DoClever',
    Subscription: false,
    CourseTitle: 'DoClever Training',
    CourseDesc: 'DoClever Operation',
    CourseRemark: '',
    InvoiceItemDesc: 'DoClever Operation',
    Year: '2022',
    Form: '',
    Subject: 'Software',
    CourseStart: '2022-07-05T00:00:00.000Z',
    CourseEnd: '2022-07-28T00:00:00.000Z',
    CourseActiveDate: '2022-06-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-07-31T00:00:00.000Z',
    CourseQuota: 20,
    CoursePrice: 300,
    MethodCode: '01',
    TeacherCode: 'U0033',
    VenueCode: '06',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'TUE,THU (09:30-11:30)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'D20220708',
    CourseMinLimit: 5,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 8,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'Teacher S',
    VenueName: 'Room 6',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'D20220708B',
    CourseType: 'DoClever',
    Subscription: false,
    CourseTitle: 'DoClever Training',
    CourseDesc: 'DoClever Operation',
    CourseRemark: '',
    InvoiceItemDesc: 'DoClever Operation',
    Year: '2022',
    Form: '',
    Subject: 'Software',
    CourseStart: '2022-07-01T00:00:00.000Z',
    CourseEnd: '2022-07-29T00:00:00.000Z',
    CourseActiveDate: '2022-06-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-07-31T00:00:00.000Z',
    CourseQuota: 20,
    CoursePrice: 300,
    MethodCode: '01',
    TeacherCode: 'U0033',
    VenueCode: '06',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'MON,FRI (14:00-16:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'D20220708',
    CourseMinLimit: 5,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 9,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'Teacher S',
    VenueName: 'Room 6',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'EngG1',
    CourseType: 'English ',
    Subscription: false,
    CourseTitle: 'Eng Grammar',
    CourseDesc: 'hhhh',
    CourseRemark: 'hhhh',
    InvoiceItemDesc: 'hhhh',
    Year: '',
    Form: '',
    Subject: '',
    CourseStart: '2022-06-21T00:00:00.000Z',
    CourseEnd: '2022-07-14T00:00:00.000Z',
    CourseActiveDate: '2022-06-17T00:00:00.000Z',
    CourseDeactiveDate: '2022-06-18T00:00:00.000Z',
    CourseQuota: 5,
    CoursePrice: 500,
    MethodCode: '01',
    TeacherCode: 'U0050',
    VenueCode: '02',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'TUE,THU (12:00-13:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'Eng',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 8,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'Li Sir',
    VenueName: 'Room 2',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'EngG12',
    CourseType: 'English ',
    Subscription: false,
    CourseTitle: 'Eng Grammar',
    CourseDesc: 'hhhh',
    CourseRemark: 'hhhh',
    InvoiceItemDesc: 'hhhh',
    Year: '2022',
    Form: '',
    Subject: '',
    CourseStart: '2022-06-29T00:00:00.000Z',
    CourseEnd: '2023-08-30T00:00:00.000Z',
    CourseActiveDate: '2022-06-22T00:00:00.000Z',
    CourseDeactiveDate: '2023-01-25T00:00:00.000Z',
    CourseQuota: 16,
    CoursePrice: 200,
    MethodCode: '01',
    TeacherCode: 'U0022',
    VenueCode: '01',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'WED (11:30-12:30)',
    NumOfStudent: 1,
    Status: '-',
    CourseMasterCode: 'Eng',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 62,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'MIss Kitty',
    VenueName: 'Room 1',
    PriceString: null,
    CourseActive: 1,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'EngG1234',
    CourseType: 'English ',
    Subscription: false,
    CourseTitle: 'Eng Grammar',
    CourseDesc: 'hhhh',
    CourseRemark: 'hhhh',
    InvoiceItemDesc: 'hhhh',
    Year: '2022',
    Form: '',
    Subject: '',
    CourseStart: '2022-07-04T00:00:00.000Z',
    CourseEnd: '2022-07-25T00:00:00.000Z',
    CourseActiveDate: '2022-07-15T00:00:00.000Z',
    CourseDeactiveDate: '2022-07-25T00:00:00.000Z',
    CourseQuota: 16,
    CoursePrice: 200,
    MethodCode: '01',
    TeacherCode: 'U0022',
    VenueCode: '02',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'MON,THU (16:00-17:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'Eng',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 7,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'MIss Kitty',
    VenueName: 'Room 2',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'EngG1A',
    CourseType: 'Grammer1',
    Subscription: false,
    CourseTitle: 'P1 Grammar',
    CourseDesc: 'ffff',
    CourseRemark: 'fffff',
    InvoiceItemDesc: 'ffff',
    Year: '',
    Form: '',
    Subject: '',
    CourseStart: '2022-07-05T00:00:00.000Z',
    CourseEnd: '2022-09-01T00:00:00.000Z',
    CourseActiveDate: '2022-06-30T00:00:00.000Z',
    CourseDeactiveDate: '2022-07-30T00:00:00.000Z',
    CourseQuota: 100,
    CoursePrice: 150,
    MethodCode: '01',
    TeacherCode: 'U0052',
    VenueCode: '01',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'TUE,THU (11:30-12:30)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'Eng',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 18,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'Miss Ma',
    VenueName: 'Room 1',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'Piano1.0',
    CourseType: 'Piano class',
    Subscription: false,
    CourseTitle: 'beginner piano',
    CourseDesc: 'interesting piano class',
    CourseRemark: '',
    InvoiceItemDesc: 'interesting piano class',
    Year: '',
    Form: '',
    Subject: '',
    CourseStart: '2022-08-03T00:00:00.000Z',
    CourseEnd: '2022-09-21T00:00:00.000Z',
    CourseActiveDate: '2022-07-29T00:00:00.000Z',
    CourseDeactiveDate: '2022-08-02T00:00:00.000Z',
    CourseQuota: 10,
    CoursePrice: 200,
    MethodCode: '01',
    TeacherCode: 'U0029',
    VenueCode: '05',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'WED (12:00-13:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'Piano',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 8,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'Crystal',
    VenueName: 'Room 5',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'T202206001A_001',
    CourseType: '小學功課補習班',
    Subscription: false,
    CourseTitle: '小學功課補習班 A',
    CourseDesc: '小學功課補習班 A',
    CourseRemark: '',
    InvoiceItemDesc: '小學功課補習班 A',
    Year: '2022',
    Form: '',
    Subject: '學補',
    CourseStart: '2022-06-01T00:00:00.000Z',
    CourseEnd: '2022-06-30T00:00:00.000Z',
    CourseActiveDate: '2022-05-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-06-30T00:00:00.000Z',
    CourseQuota: 10,
    CoursePrice: 360,
    MethodCode: '01',
    TeacherCode: 'U0020',
    VenueCode: '04',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'MON-FRI (09:00-13:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'T202206001A',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 21,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'Teacher Leung',
    VenueName: 'Room 4',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'T202206001B_001',
    CourseType: '小學功課補習班',
    Subscription: false,
    CourseTitle: '小學功課補習班 B',
    CourseDesc: '小學功課補習班 B',
    CourseRemark: '',
    InvoiceItemDesc: '小學功課補習班 B',
    Year: '2022',
    Form: '',
    Subject: '學補',
    CourseStart: '2022-06-01T00:00:00.000Z',
    CourseEnd: '2022-06-30T00:00:00.000Z',
    CourseActiveDate: '2022-05-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-06-29T00:00:00.000Z',
    CourseQuota: 10,
    CoursePrice: 360,
    MethodCode: '01',
    TeacherCode: 'U0020',
    VenueCode: '04',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'MON-FRI (14:00-18:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'T202206001B',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 21,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'Teacher Leung',
    VenueName: 'Room 4',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'T202206001C_001',
    CourseType: '小學功課補習班',
    Subscription: false,
    CourseTitle: '小學功課補習班 C',
    CourseDesc: '小學功課補習班 C',
    CourseRemark: '',
    InvoiceItemDesc: '小學功課補習班 C',
    Year: '2022',
    Form: '',
    Subject: '學補',
    CourseStart: '2022-06-01T00:00:00.000Z',
    CourseEnd: '2022-06-30T00:00:00.000Z',
    CourseActiveDate: '2022-05-01T00:00:00.000Z',
    CourseDeactiveDate: '2022-06-30T00:00:00.000Z',
    CourseQuota: 10,
    CoursePrice: 360,
    MethodCode: '01',
    TeacherCode: 'U0031',
    VenueCode: 'C',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'MON-FRI (09:00-13:00)\rMON-FRI (14:00-18:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'T202206001C',
    CourseMinLimit: 1,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 42,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: 'Crystal',
    VenueName: '輔導室C',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
  {
    CourseCode: 'test',
    CourseType: '數學',
    Subscription: false,
    CourseTitle: '數學3年級',
    CourseDesc: 'egfefvgervelkjvhe;vkhe;vehovheoovoirhoi',
    CourseRemark: 'kjfeoiw',
    InvoiceItemDesc: 'egfefvgervelkjvhe;vkhe;vehovheoovoirhoi',
    Year: '',
    Form: '',
    Subject: '',
    CourseStart: '2022-10-26T00:00:00.000Z',
    CourseEnd: '2022-10-28T00:00:00.000Z',
    CourseActiveDate: '2022-10-19T00:00:00.000Z',
    CourseDeactiveDate: '2022-10-20T00:00:00.000Z',
    CourseQuota: 10,
    CoursePrice: 100,
    MethodCode: '01',
    TeacherCode: 'U0014',
    VenueCode: '02',
    BookingMethod: 0,
    Active: true,
    BranchCode: 'CCBC-CEC',
    CourseTime: 'MON-FRI (14:00-15:00)',
    NumOfStudent: 0,
    Status: '-',
    CourseMasterCode: 'hihi',
    CourseMinLimit: 0,
    TeacherCost: 0,
    MaterialCost: 0,
    NumOfClass: 3,
    CourseInternalRemark: '',
    TeacherCost2: 0,
    Name: '阡陌中心',
    VenueName: 'Room 2',
    PriceString: null,
    CourseActive: 0,
    CourseEnrollActive: 0,
  },
];

const headCells = [
  {
    id: 'CourseCode',
    numeric: true,
    label: 'Course Code',
    align: 'left',
  },
  {
    id: 'Subject',
    numeric: false,
    label: 'Subject',
    align: 'left',
  },
  {
    id: 'CourseTitle',
    numeric: true,
    label: 'Title',
    align: 'left',
  },
  {
    id: 'Name',
    numeric: true,
    label: 'Teacher',
    align: 'left',
  },
  {
    id: 'CourseQuota',
    numeric: false,
    label: 'Status',
    align: 'center',
  },
  {
    id: 'BranchCode',
    numeric: true,
    label: 'Branch Code',
    align: 'center',
  },
  {
    id: 'CourseStart',
    numeric: true,
    label: 'Course Start Date',
    align: 'center',
  },
  {
    id: 'CourseDeactiveDate',
    numeric: true,
    label: 'Enrollment End Date',
    align: 'center',
  },
];

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
  const intl = useIntl();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell> */}
        {numSelected > 0 && (
          <TableCell padding="none" colSpan={8}>
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
  selected: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }) => (
  <Toolbar
    sx={{
      p: 0,
      pl: 1,
      pr: 1,
      ...(numSelected > 0 && {
        color: (theme) => theme.palette.secondary.main,
      }),
    }}
  >
    {numSelected > 0 ? (
      <Typography color="inherit" variant="h4">
        {numSelected} Selected
      </Typography>
    ) : (
      <Typography variant="h6" id="tableTitle">
        Nutrition
      </Typography>
    )}
    <Box sx={{ flexGrow: 1 }} />
    {numSelected > 0 && (
      <Tooltip title="Delete">
        <IconButton size="large">
          <Icon icon={DeleteIcon} />
        </IconButton>
      </Tooltip>
    )}
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// ==============================|| Schedules (List) ||============================== //

const SchedulesList = () => {
  const theme = useTheme();
  // const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [rowCode, setRowCode] = React.useState('');
  const intl = useIntl();
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

  //modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = rows.filter((row) => {
        let matches = true;

        const properties = [
          'CourseCode',
          'Subject',
          'CourseTitle',
          'Name',
          'CourseQuota',
          'BranchCode',
          'CourseStart',
          'CourseDeactiveDate',
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      if (selected.length > 0) {
        setSelected([]);
      } else {
        const newSelectedId = rows.map((n) => n.name);
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
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <AdminLayout>
      <MainCard title={intl.formatMessage({ id: 'schedules (list)' })} content={false}>
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
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
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
                  /** Make sure no display bugs if row isn't an OrderData object */
                  if (typeof row === 'number') return null;

                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      onClick={() => {
                        setRowCode(row.CourseCode);
                        handleOpen();
                      }}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        // onClick={(event) => handleClick(event, row.name)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                        >
                          {row.CourseCode}{' '}
                        </Typography>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        // onClick={(event) => handleClick(event, row.name)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                        >
                          {' '}
                          {row.Subject}{' '}
                        </Typography>
                      </TableCell>
                      <TableCell>{row.CourseTitle}</TableCell>
                      <TableCell>{row.Name}</TableCell>
                      <TableCell align="center">
                        {(row.NumOfStudent / row.CourseQuota) * 100 < 9 && (
                          <Chip
                            label={`${row.NumOfStudent} / ${row.CourseQuota}`}
                            size="small"
                            chipcolor="success"
                          />
                        )}
                        {(row.NumOfStudent / row.CourseQuota) * 100 >= 9 && (
                          <Chip
                            label={`${row.NumOfStudent} / ${row.CourseQuota}`}
                            size="small"
                            chipcolor="warning"
                          />
                        )}
                      </TableCell>
                      <TableCell align="center">{row.BranchCode}</TableCell>
                      <TableCell align="center">
                        {new Date(row.CourseStart).toLocaleDateString('en-CA', { timeZone: 'GMT' })}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(row.CourseDeactiveDate).toLocaleDateString('en-CA', {
                          timeZone: 'GMT',
                        })}
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

        {/* table pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={intl.formatMessage({ id: 'Show' })}
        />
        <SimpleModal open={open} handleClose={handleClose} rowCode={rowCode} />
      </MainCard>
    </AdminLayout>
  );
};

export default SchedulesList;
