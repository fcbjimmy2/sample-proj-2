import PropTypes from 'prop-types';
import * as React from 'react';
import Image from 'next/image';
// material-ui
import { useTheme } from '@mui/material/styles';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import {
  Box,
  Card,
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
  Radio,
  Typography,
  CardActions,
  Divider,
  Button,
  Pagination,
  Avatar,
} from '@mui/material';

// import { tableRowClasses } from '@mui/material/TableRow';
// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   [`&.${tableRowClasses.root}`]: {
//     height: "200px"
//   },}
// @ts-ignore
import { visuallyHidden } from '@mui/utils';

// project imports
// import Layout from 'layout';
// import Page from 'components/ui-component/Page';

// import { useDispatch, useSelector } from 'store';
// import { getCustomers } from 'store/slices/customer';

// assets
import { Icon } from '@iconify/react';
import DeleteIcon from '@iconify/icons-carbon/trash-can';
import SearchIcon from '@iconify/icons-carbon/search';

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

const sampleData = [
  {
    UserCode: 'U0012',
    Login: 'T1',
    Password: 'v\u0001:\u0001P\u0002:\u0001<\u0002B\u0001\u000f\u0004j\u0001',
    Email: 'default@gmail.com',
    Phone: '56789123',
    Name: 'AlanL',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2021-11-01T14:34:51.533Z',
    CreateBy: 'U0001',
    ModifyDate: '2023-03-22T06:15:06.817Z',
    ModifyBy: 'U0001',
    MainBranch: 'CCBC-CC,CCBC-CEC',
    BranchCode: 'CCBC-CC,CCBC-CEC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'FT',
    Monthly: 20000,
    com_min1: 0,
    com_max1: 5,
    com_base1: 20,
    com_rate1: 0,
    com_min2: 6,
    com_max2: 10,
    com_base2: 50,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 30,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 5,
    MPF_Employee: 5,
    Employed_Date: '2021-11-01T00:00:00.000Z',
    Label: 27,
    Color: null,
    OneSignalID: 'bde7dc55-8e37-484c-acbd-47e6f98b6707',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: true,
    Default_Home: 'messenger',
    Default_ThemeClass: 'minimal-theme',
    LastLogin: '2023-02-08T12:03:50.967Z',
    Features: 'UserAdmin=1,ProductManager=1,ClaimApprover=1',
    Approver_id_leave: 'U0015',
    Approver_name_leave: 'testing',
    Approver_id_claim: 'U0001',
    Approver_name_claim: 'My name is admin',
  },
  {
    UserCode: 'U0013',
    Login: 'U0013',
    Password: '2\u0002[\u00025\u0003D\u0005',
    Email: 'zU0013@apex.hk',
    Phone: 'U0013Tel',
    Name: 'U0013Name',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2021-11-01T17:27:16.220Z',
    CreateBy: 'U0001',
    ModifyDate: '2022-06-15T09:48:59.687Z',
    ModifyBy: 'U0001',
    MainBranch: 'CCBC-CC,CCBC-CEC',
    BranchCode: 'CCBC-CC,CCBC-CEC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'FT',
    Monthly: 15000,
    com_min1: 1,
    com_max1: 3,
    com_base1: 50,
    com_rate1: 0,
    com_min2: 122,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 5,
    MPF_Employee: 5,
    Employed_Date: '2021-10-01T00:00:00.000Z',
    Label: 28,
    Color: null,
    OneSignalID: 'f267e7df-7001-4cbf-8ef3-5ee0b24e1d79',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: true,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: '2023-01-09T17:25:21.743Z',
    Features: 'UserAdmin=1,ClaimApprover=1',
    Approver_id_leave: null,
    Approver_name_leave: null,
    Approver_id_claim: null,
    Approver_name_claim: null,
  },
  {
    UserCode: 'U0014',
    Login: 'Testing Teacher',
    Password:
      'u\u00019\u0001r\u00019\u0001p\u0001:\u0001q\u00019\u0001P\u0001;\u0001E\u00019\u0001:\u00029\u0001I\u00019\u0001\u0010\u00039\u0001(\u00029\u0001H\u0001;\u0001,\u00029\u00013\u0002=\u00010\u00029\u0001\u0013\u00039\u00014\u00029\u00018\u00029\u00019\u00029\u0001t\u00039\u0001Q\u00019\u0001w\u00039\u0001\u0010\u00039\u0001=\u00059\u0001Y\u00019\u0001T\u0001:\u0001a\u00019\u0001Z\u0001:\u0001q\u00019\u0001P\u0002:\u0001)\u00029\u0001C\u0001C\u0001\u0005\u0004B\u0001',
    Email: 'default@gmail.com',
    Phone: '54123698',
    Name: '阡陌中心',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2021-11-17T11:47:57.867Z',
    CreateBy: 'U0001',
    ModifyDate: '2023-03-22T08:36:21.407Z',
    ModifyBy: 'U0001',
    MainBranch: 'CCBC-CC',
    BranchCode: 'CCBC-CC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'FT',
    Monthly: 10,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 5,
    MPF_Employee: 5,
    Employed_Date: '2021-11-01T00:00:00.000Z',
    Label: 29,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: true,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: '2022-06-23T14:36:26.690Z',
    Features: 'ProductManager=1',
    Approver_id_leave: 'U0016',
    Approver_name_leave: 'Candice Lam',
    Approver_id_claim: 'U0016',
    Approver_name_claim: 'Candice Lam',
  },
  {
    UserCode: 'U0020',
    Login: 'Ms Leung',
    Password: 'u\u0001:\u0001J\u0002:\u0001\u001f\u0002B\u0001E\u0002j\u0001',
    Email: 'default@gmail.com',
    Phone: '9876543',
    Name: 'Teacher Leung',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2021-11-23T17:42:09.190Z',
    CreateBy: 'U0001',
    ModifyDate: '2023-03-21T09:26:45.187Z',
    ModifyBy: 'U0001',
    MainBranch: 'CCBC-CEC',
    BranchCode: 'CCBC-CEC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'FT',
    Monthly: 0,
    com_min1: 1,
    com_max1: 4,
    com_base1: 0,
    com_rate1: 70,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 5,
    MPF_Employee: 5,
    Employed_Date: '2021-11-23T00:00:00.000Z',
    Label: 35,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: true,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: '',
    Approver_id_leave: '',
    Approver_name_leave: '',
    Approver_id_claim: '',
    Approver_name_claim: '',
  },
  {
    UserCode: 'U0027',
    Login: 'Racso',
    Password: '[\u0002+\u0003\u0005\u0004w\u0005\u0017\n',
    Email: 'siusiughost@yahoo.com.hk',
    Phone: '92809953',
    Name: '陳麗貞',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2021-12-22T15:23:48.617Z',
    CreateBy: 'U0001',
    ModifyDate: '2022-01-27T13:14:08.777Z',
    ModifyBy: 'U0001',
    MainBranch: null,
    BranchCode: 'CCBC-CC,CCBC-CEC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'PT',
    Monthly: 0,
    com_min1: 1,
    com_max1: 10,
    com_base1: 0,
    com_rate1: 70,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 0,
    MPF_Employee: 0,
    Employed_Date: '2021-12-01T00:00:00.000Z',
    Label: 44,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: true,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: null,
    Approver_id_leave: null,
    Approver_name_leave: null,
    Approver_id_claim: null,
    Approver_name_claim: null,
  },
  {
    UserCode: 'U0028',
    Login: 'raymondstarfund',
    Password:
      'u\u00019\u0001r\u00019\u0001p\u0001:\u0001q\u00019\u0001P\u0001;\u0001E\u00019\u0001:\u00029\u0001I\u00019\u0001\u0010\u00039\u0001(\u00029\u0001H\u0001;\u0001,\u00029\u00013\u0002=\u00010\u00029\u0001\u0013\u00039\u00014\u00029\u00018\u00029\u00019\u00029\u0001t\u00039\u0001Q\u00019\u0001w\u00039\u0001\u0010\u00039\u0001=\u00059\u0001Y\u00019\u0001T\u0001:\u0001a\u00019\u0001Z\u0001:\u0001q\u00019\u0001P\u0002:\u0001)\u00029\u0001C\u0001C\u0001\u0005\u0004B\u0001',
    Email: 'default@gmail.com',
    Phone: '12313213',
    Name: 'raymond',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2021-12-23T12:49:08.963Z',
    CreateBy: 'U0001',
    ModifyDate: '2023-03-21T09:23:03.313Z',
    ModifyBy: 'U0001',
    MainBranch: 'CCBC-CEC',
    BranchCode: 'CCBC-CEC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'FT',
    Monthly: 0,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 0,
    MPF_Employee: 0,
    Employed_Date: '2021-12-15T00:00:00.000Z',
    Label: 45,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: true,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: '2023-01-10T11:32:14.030Z',
    Features: '',
    Approver_id_leave: '',
    Approver_name_leave: '',
    Approver_id_claim: '',
    Approver_name_claim: '',
  },
  {
    UserCode: 'U0029',
    Login: 'tt1',
    Password: '2\u0002[\u00025\u0003D\u0005',
    Email: 'tt1@mail.com',
    Phone: '65428739',
    Name: 'Crystal',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2021-12-23T12:57:37.843Z',
    CreateBy: 'U0001',
    ModifyDate: null,
    ModifyBy: null,
    MainBranch: null,
    BranchCode: null,
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'FT',
    Monthly: 0,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 0,
    MPF_Employee: 0,
    Employed_Date: '2020-12-01T00:00:00.000Z',
    Label: 46,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: true,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: '2022-06-29T17:24:16.033Z',
    Features: null,
    Approver_id_leave: null,
    Approver_name_leave: null,
    Approver_id_claim: null,
    Approver_name_claim: null,
  },
  {
    UserCode: 'U0030',
    Login: 'alau',
    Password: '2\u0002[\u00025\u0003D\u0005',
    Email: 'alau@apex.hk',
    Phone: '28937713',
    Name: 'Alan Lau',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2021-12-29T15:41:56.600Z',
    CreateBy: 'U0001',
    ModifyDate: null,
    ModifyBy: null,
    MainBranch: null,
    BranchCode: null,
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'FT',
    Monthly: 0,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 0,
    MPF_Employee: 0,
    Employed_Date: '2021-12-30T00:00:00.000Z',
    Label: 47,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: true,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: '2022-06-14T12:50:30.163Z',
    Features: null,
    Approver_id_leave: null,
    Approver_name_leave: null,
    Approver_id_claim: null,
    Approver_name_claim: null,
  },
  {
    UserCode: 'U0031',
    Login: 'crystal',
    Password: '1\u0002Y\u0002*\u0003\u001c\u0005',
    Email: 'cc@mail.com',
    Phone: '51397786',
    Name: 'Crystal',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-01-03T10:33:08.750Z',
    CreateBy: 'U0001',
    ModifyDate: null,
    ModifyBy: null,
    MainBranch: null,
    BranchCode: null,
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'FT',
    Monthly: 0,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 5,
    MPF_Employee: 5,
    Employed_Date: '2020-09-21T00:00:00.000Z',
    Label: 48,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: true,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: null,
    Approver_id_leave: null,
    Approver_name_leave: null,
    Approver_id_claim: null,
    Approver_name_claim: null,
  },
  {
    UserCode: 'U0032',
    Login: 'CrystalL',
    Password: 'v\u0001:\u0001P\u0002:\u0001<\u0002B\u0001\u000f\u0004j\u0001',
    Email: 'default@gmail.com',
    Phone: '51316654',
    Name: 'CrystalL',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-01-03T10:35:23.250Z',
    CreateBy: 'U0001',
    ModifyDate: '2023-03-23T02:15:19.007Z',
    ModifyBy: 'U0001',
    MainBranch: 'CCBC-CEC,CCBC-CC',
    BranchCode: 'CCBC-CEC,CCBC-CC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'FT',
    Monthly: 1000,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 5,
    MPF_Employee: 5,
    Employed_Date: '2022-01-01T00:00:00.000Z',
    Label: 49,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: true,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: '',
    Approver_id_leave: 'U0034',
    Approver_name_leave: 'Antony',
    Approver_id_claim: 'U0015',
    Approver_name_claim: 'testing',
  },
  {
    UserCode: 'U0033',
    Login: 'Teacher S',
    Password: '2\u0002[\u00025\u0003D\u0005',
    Email: 'TS@gmail.com',
    Phone: '91000002',
    Name: 'Teacher S',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-01-21T12:53:37.740Z',
    CreateBy: 'U0001',
    ModifyDate: '2022-07-07T07:13:44.813Z',
    ModifyBy: 'U0001',
    MainBranch: 'CCBC-CC',
    BranchCode: 'CCBC-CC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'FT',
    Monthly: 8000,
    com_min1: 1,
    com_max1: 5,
    com_base1: 100,
    com_rate1: 0,
    com_min2: 6,
    com_max2: 10,
    com_base2: 250,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 5,
    MPF_Employee: 5,
    Employed_Date: '2022-01-21T00:00:00.000Z',
    Label: 50,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: false,
    Default_Home: 'dashboard',
    Default_ThemeClass: 'color-sidebar sidebarcolor7 color-header headercolor8',
    LastLogin: '2023-03-07T18:36:46.330Z',
    Features: '',
    Approver_id_leave: '',
    Approver_name_leave: '',
    Approver_id_claim: '',
    Approver_name_claim: '',
  },
  {
    UserCode: 'U0036',
    Login: 'dc teacher',
    Password: 'c\u00021\u0002Y\u00025\u0003X\u0005',
    Email: 'Teacher_S@apex.hk',
    Phone: '2386111',
    Name: 'DoClever Teacher',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-01-27T09:52:15.143Z',
    CreateBy: 'U0035',
    ModifyDate: '2022-02-09T15:27:19.850Z',
    ModifyBy: 'U0001',
    MainBranch: null,
    BranchCode: 'CCBC-CC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'FT',
    Monthly: 10000,
    com_min1: 1,
    com_max1: 5,
    com_base1: 1000,
    com_rate1: 0,
    com_min2: 6,
    com_max2: 10,
    com_base2: 1500,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 5,
    MPF_Employee: 5,
    Employed_Date: '2022-01-27T00:00:00.000Z',
    Label: 53,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: false,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: null,
    Approver_id_leave: null,
    Approver_name_leave: null,
    Approver_id_claim: null,
    Approver_name_claim: null,
  },
  {
    UserCode: 'U0038',
    Login: 'zlee_teacher',
    Password:
      '\u001f\u0002\u001c\u0002\u001e\u0002)\u0002.\u0002]\u0002^\u0002y\u0002-\u0003\u0011\u00041\u00055\n',
    Email: 'zlee_teacher@abc.com',
    Phone: '789456123',
    Name: 'Zoe Lee',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-02-14T09:28:42.350Z',
    CreateBy: 'U0001',
    ModifyDate: '2022-02-14T09:28:55.997Z',
    ModifyBy: 'U0001',
    MainBranch: null,
    BranchCode: 'CCBC-CC,CCBC-CEC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'FT',
    Monthly: 10000,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 5,
    MPF_Employee: 5,
    Employed_Date: '2021-12-01T00:00:00.000Z',
    Label: 55,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: false,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: null,
    Approver_id_leave: null,
    Approver_name_leave: null,
    Approver_id_claim: null,
    Approver_name_claim: null,
  },
  {
    UserCode: 'U0039',
    Login: 'Vivian',
    Password:
      "\u0005\u00029\u0001b\u00019\u0001|\u0001:\u0001r\u00019\u0001\u0003\u0002:\u0001'\u00029\u0001Y\u0001C\u0001N\u0005B\u0001",
    Email: 'vli@yahoo.com.hk',
    Phone: '96684567',
    Name: 'Vivian Li',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-02-18T11:23:37.297Z',
    CreateBy: 'U0034',
    ModifyDate: '2023-01-10T03:15:47.610Z',
    ModifyBy: 'U0001',
    MainBranch: 'CCBC-CC',
    BranchCode: 'CCBC-CC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'FT',
    Monthly: 18000,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 5,
    MPF_Employee: 5,
    Employed_Date: '2021-10-05T00:00:00.000Z',
    Label: 56,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: false,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: '2023-01-10T11:00:05.573Z',
    Features: '',
    Approver_id_leave: '',
    Approver_name_leave: '',
    Approver_id_claim: '',
    Approver_name_claim: '',
  },
  {
    UserCode: 'U0040',
    Login: 'Teacher J2',
    Password: '1\u0002Y\u0002*\u0003\u001c\u0005',
    Email: 'j2@ccbc.org.hk',
    Phone: '24682468',
    Name: 'Teacher Julian2',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-02-18T12:36:01.087Z',
    CreateBy: 'U0001',
    ModifyDate: null,
    ModifyBy: null,
    MainBranch: null,
    BranchCode: 'CCBC-CEC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'PT',
    Monthly: 0,
    com_min1: 4,
    com_max1: 5,
    com_base1: 0,
    com_rate1: 90,
    com_min2: 6,
    com_max2: 6,
    com_base2: 0,
    com_rate2: 80,
    com_min3: 7,
    com_max3: 7,
    com_base3: 0,
    com_rate3: 75,
    com_min4: 8,
    com_max4: 12,
    com_base4: 0,
    com_rate4: 70,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 5,
    MPF_Employee: 5,
    Employed_Date: '2022-02-18T00:00:00.000Z',
    Label: 57,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: false,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: null,
    Approver_id_leave: null,
    Approver_name_leave: null,
    Approver_id_claim: null,
    Approver_name_claim: null,
  },
  {
    UserCode: 'U0041',
    Login: 'Teacher J3',
    Password: '1\u0002Y\u0002*\u0003\u001c\u0005',
    Email: 'j3@ccbc.org.hk',
    Phone: '13571357',
    Name: 'Teacher Julian3',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-02-18T12:39:56.350Z',
    CreateBy: 'U0001',
    ModifyDate: '2022-06-15T09:49:54.693Z',
    ModifyBy: 'U0001',
    MainBranch: 'CCBC-CC,CCBC-CEC',
    BranchCode: 'CCBC-CC,CCBC-CEC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: 'PT',
    Monthly: 0,
    com_min1: 4,
    com_max1: 12,
    com_base1: 0,
    com_rate1: 70,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 5,
    MPF_Employee: 5,
    Employed_Date: '2022-02-18T00:00:00.000Z',
    Label: 58,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: false,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: 'UserAdmin=1,ProductManager=1,LeaveApprover=1,Claim',
    Approver_id_leave: null,
    Approver_name_leave: null,
    Approver_id_claim: null,
    Approver_name_claim: null,
  },
  {
    UserCode: 'U0046',
    Login: '43454',
    Password:
      ':\u0001:\u0001B\u0001:\u0001W\u0001:\u0001x\u0001:\u0001^\u0002:\u0001Q\u0002B\u0001\\\u0003j\u0001',
    Email: 'default@gmail.com',
    Phone: '435435',
    Name: '345435',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-06-15T07:09:54.400Z',
    CreateBy: 'U0001',
    ModifyDate: '2023-03-21T09:27:01.237Z',
    ModifyBy: 'U0001',
    MainBranch: 'CCBC-CEC',
    BranchCode: 'CCBC-CEC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: '',
    Monthly: 0,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 0,
    MPF_Employee: 0,
    Employed_Date: '1900-01-01T00:00:00.000Z',
    Label: 63,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: false,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: 'ProductManager=1',
    Approver_id_leave: '',
    Approver_name_leave: '',
    Approver_id_claim: '',
    Approver_name_claim: '',
  },
  {
    UserCode: 'U0048',
    Login: '123',
    Password: '2\u0002[\u00025\u00030\u0005',
    Email: 'mlau4067@icloud.com',
    Phone: '123',
    Name: '12321',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-06-15T08:05:13.613Z',
    CreateBy: 'U0001',
    ModifyDate: null,
    ModifyBy: null,
    MainBranch: 'CCBC-CEC',
    BranchCode: 'CCBC-CEC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: '',
    Monthly: 0,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 0,
    MPF_Employee: 0,
    Employed_Date: '1900-01-01T00:00:00.000Z',
    Label: 65,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: false,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: '',
    Approver_id_leave: null,
    Approver_name_leave: null,
    Approver_id_claim: null,
    Approver_name_claim: null,
  },
  {
    UserCode: 'U0049',
    Login: 'LiYuHin',
    Password: '\u0017\u00023\u0002c\u0002>\u0003N\u0005',
    Email: 'xxx@yahoo.com',
    Phone: '91223977',
    Name: 'Li Sir',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-06-16T07:43:54.847Z',
    CreateBy: 'U0001',
    ModifyDate: null,
    ModifyBy: null,
    MainBranch: 'CCBC-CC',
    BranchCode: 'CCBC-CC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: '',
    Monthly: 0,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 0,
    MPF_Employee: 0,
    Employed_Date: '1900-01-01T00:00:00.000Z',
    Label: 66,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: false,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: 'UserAdmin=1,ProductManager=1,LeaveApprover=1,Claim',
    Approver_id_leave: null,
    Approver_name_leave: null,
    Approver_id_claim: null,
    Approver_name_claim: null,
  },
  {
    UserCode: 'U0050',
    Login: 'Li',
    Password: '2\u0002[\u00025\u0003D\u0005',
    Email: 'xxxx@yahoo.com',
    Phone: '91223455',
    Name: 'Li Sir',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-06-17T03:49:39.030Z',
    CreateBy: 'U0001',
    ModifyDate: null,
    ModifyBy: null,
    MainBranch: 'CCBC-CC',
    BranchCode: 'CCBC-CC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: '',
    Monthly: 0,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 0,
    MPF_Employee: 0,
    Employed_Date: '2022-06-17T00:00:00.000Z',
    Label: 67,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: false,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: 'ProductManager=1,LeaveApprover=1,ClaimApprover=1',
    Approver_id_leave: null,
    Approver_name_leave: null,
    Approver_id_claim: null,
    Approver_name_claim: null,
  },
  {
    UserCode: 'U0052',
    Login: 'MissMa',
    Password: '2\u0002[\u00025\u0003D\u0005',
    Email: 'xxx@yahoo.com',
    Phone: '98890000',
    Name: 'Miss Ma',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-06-30T03:16:58.753Z',
    CreateBy: 'U0001',
    ModifyDate: null,
    ModifyBy: null,
    MainBranch: 'CCBC-CC',
    BranchCode: 'CCBC-CC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: '',
    Monthly: 0,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 0,
    MPF_Employee: 0,
    Employed_Date: '1900-01-01T00:00:00.000Z',
    Label: 69,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: false,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: 'UserAdmin=1,ProductManager=1,LeaveApprover=1,Claim',
    Approver_id_leave: '',
    Approver_name_leave: '',
    Approver_id_claim: '',
    Approver_name_claim: '',
  },
  {
    UserCode: 'U0058',
    Login: 'docleverdemo',
    Password: '2\u0002E\u0002\\\u0002\u0002\u00032\u0002[\u00025\u0003D\u0005',
    Email: 'demo@doclever.hk',
    Phone: '98765432',
    Name: 'doclever demo',
    Salutation: null,
    Role: 'Teacher',
    Active: true,
    CreateDate: '2022-10-21T03:48:17.473Z',
    CreateBy: 'U0001',
    ModifyDate: null,
    ModifyBy: null,
    MainBranch: 'CCBC-CEC',
    BranchCode: 'CCBC-CEC',
    UserGroup: null,
    Pin: null,
    PinTime: null,
    Type: '',
    Monthly: 30000,
    com_min1: 0,
    com_max1: 0,
    com_base1: 0,
    com_rate1: 0,
    com_min2: 0,
    com_max2: 0,
    com_base2: 0,
    com_rate2: 0,
    com_min3: 0,
    com_max3: 0,
    com_base3: 0,
    com_rate3: 0,
    com_min4: 0,
    com_max4: 0,
    com_base4: 0,
    com_rate4: 0,
    com_min5: 0,
    com_max5: 0,
    com_base5: 0,
    com_rate5: 0,
    com_bonus1: 0,
    com_bonus2: 0,
    com_bonus3: 0,
    com_bonus4: 0,
    com_bonus5: 0,
    MPF_Employer: 0,
    MPF_Employee: 0,
    Employed_Date: '2022-10-18T00:00:00.000Z',
    Label: 1071,
    Color: null,
    OneSignalID: '',
    FirebaseToken: null,
    MobileLoginToken: null,
    AppSound: false,
    Default_Home: null,
    Default_ThemeClass: null,
    LastLogin: null,
    Features: 'UserAdmin=1,ProductManager=1,LeaveApprover=1,Claim',
    Approver_id_leave: 'U0001',
    Approver_name_leave: 'Admin',
    Approver_id_claim: 'U0001',
    Approver_name_claim: 'Admin',
  },
];

// table header options
const headCells = [
  {
    id: 'Name',
    numeric: false,
    label: 'Teacher',
    align: 'left',
  },
  {
    id: 'select',
    numeric: true,
    label: ' ',
    align: 'left',
  },
];

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

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  selected,
}) {
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
            {intl.formatMessage({ id: `${headCell.label}` })}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  selected: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// ==============================|| CUSTOMER LIST ||============================== //

const Teachers = ({ handleClose }) => {
  const theme = useTheme();
  // const dispatch = useDispatch();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState('');
  const intl = useIntl();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // const { customers } = useSelector((state) => state.customer);

  // React.useEffect(() => {
  //   dispatch(getCustomers());
  // }, [dispatch]);

  React.useEffect(() => {
    setRows(sampleData);
  }, []);

  const handleSearch = (event) => {
    const newString = event.target.value;
    setSearch(event.target.value);

    if (newString) {
      const newRows = rows.filter((row) => {
        let matches = true;

        const properties = ['Name'];
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
      setRows(sampleData);
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
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    if (event.target.value) setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <CardContent sx={{ height: '100%' }}>
      <Box sx={{ mb: '15px' }}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={12}>
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
      </Box>

      {/* table */}
      <TableContainer>
        <Table sx={{ minWidth: 450 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.align}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {intl.formatMessage({ id: `${headCell.label}` })}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                /** Make sure no display bugs if row isn't an OrderData object */
                if (typeof row === 'number') return null;
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                const avatarSrc = row.avatar ? `/avatars/${row.avatar}` : '/avatars/user.png';
                return (
                  <TableRow
                    hover
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      sx={{
                        cursor: 'pointer',
                        width: '80%',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      size="small"
                    >
                      <Avatar
                        src={avatarSrc}
                        alt={`Avatar of ${row.name}`}
                        sx={{ width: 42, height: 42, mr: 2 }}
                      />{' '}
                      <Typography variant="subtitle1"> {row.Name} </Typography>
                    </TableCell>
                    <TableCell size="small">
                      <Radio
                        checked={selectedValue === `${row.Name}`}
                        onChange={handleChange}
                        value={row.Name}
                        name="radio-buttons"
                        inputProps={{ 'aria-label': `${row.Name}` }}
                      />
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
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={intl.formatMessage({ id: 'Show' })}
      />
      {/* <Pagination count={Math.ceil(rows.length / 10)} page={page} onChange={handleChangePage} /> */}

      <CardActions>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button variant="contained">{intl.formatMessage({ id: 'Apply' })}</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleClose}>
              {intl.formatMessage({ id: 'cancel' })}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </CardContent>
  );
};

export default Teachers;
