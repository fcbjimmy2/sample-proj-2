import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { createTheme, useTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  Button,
  CardActions,
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
  Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports
import Chip from '../../../../../src/components/extended/Chip';

// third-party
import { useIntl } from 'react-intl';

// assets
import { Icon } from '@iconify/react';
import SearchIcon from '@iconify/icons-carbon/search';

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

const dataMock = [
  {
    Idx: 1198,
    PaymentCode: '',
    InvoiceNo: '000176',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112757',
    StudentName: 'Yue Frankie ',
    Form: 'F4        ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 600,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '6CB980E4-298F-4781-A052-2154FC401280',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T12:27:03.530Z',
    VoidReason: 'DEBUG',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1173,
    PaymentCode: '',
    InvoiceNo: '000173',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112749',
    StudentName: '陳小明 Chan Siu Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: null,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '787E820F-68D4-4FB3-AE82-970E0E818414',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T12:26:59.977Z',
    VoidReason: 'DEBUG',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1194,
    PaymentCode: '',
    InvoiceNo: '000171',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112751',
    StudentName: '劉志明 Lau Chi Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 450,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: 'B4DDC4CC-4459-471C-B5E1-6BEF0AF62BEC',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T12:26:57.067Z',
    VoidReason: 'DEBUG',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1193,
    PaymentCode: '',
    InvoiceNo: '000170',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112751',
    StudentName: '劉志明 Lau Chi Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 2000,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '2B5AED72-BFBC-4565-8CC4-B4571C5A851D',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T12:26:53.983Z',
    VoidReason: 'DEBUG',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1191,
    PaymentCode: '',
    InvoiceNo: '000168',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112749',
    StudentName: '陳小明 Chan Siu Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 600,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '79B21F62-E212-42CE-9864-A448656ED348',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T12:26:51.137Z',
    VoidReason: 'DEBUG',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1188,
    PaymentCode: '',
    InvoiceNo: '000167',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112761',
    StudentName: ' Superbon',
    Form: '          ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 1900,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: 'E1A36C59-393A-4155-B7B8-4C91CEA0741C',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T12:26:46.120Z',
    VoidReason: 'DEBUG',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1187,
    PaymentCode: '',
    InvoiceNo: '000166',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112761',
    StudentName: ' Superbon',
    Form: '          ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 750,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: 'F7189C2F-F1CE-4281-983F-7D04CF756DD9',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T12:26:43.560Z',
    VoidReason: 'DEBUG',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1186,
    PaymentCode: '',
    InvoiceNo: '000165',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112761',
    StudentName: ' Superbon',
    Form: '          ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 600,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '0CA9C6A3-7E5E-4573-B4B5-D4BAFFB92807',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T12:26:40.677Z',
    VoidReason: 'DEBUG',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1184,
    PaymentCode: '',
    InvoiceNo: '000164',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112761',
    StudentName: ' Superbon',
    Form: '          ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 500,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '2444E9AA-C52E-4F6B-96CB-9E58F3265B69',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T12:26:38.287Z',
    VoidReason: 'DEBUG',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1180,
    PaymentCode: '',
    InvoiceNo: '000160',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112761',
    StudentName: ' Superbon',
    Form: '          ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 800,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '7B661D52-B27A-47AC-82FA-8A90549142BE',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T12:26:32.277Z',
    VoidReason: 'DEBUG',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1175,
    PaymentCode: '',
    InvoiceNo: '000155',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112752',
    StudentName: 'hi Yue Ho Yin',
    Form: 'F3        ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 405,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '5726369A-7433-44D9-8FA8-BE886F336F11',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:33:07.240Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1174,
    PaymentCode: '',
    InvoiceNo: '000154',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112751',
    StudentName: '劉志明 Lau Chi Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 270,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '07A916C4-6075-4934-BD8B-B60B5F579FB2',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:33:02.817Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1169,
    PaymentCode: '',
    InvoiceNo: '000151',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112750',
    StudentName: '楊瑩瑩 Yeung Ying Ying',
    Form: '1         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 200,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: 'ABCEFC88-0AC5-4F92-A39C-E68C95C4731F',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: ' 2022-06-30T11:33:00.690Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1168,
    PaymentCode: '',
    InvoiceNo: '000150',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112749',
    StudentName: '陳小明 Chan Siu Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 800,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: 'CB2ED117-EB03-4204-BF4F-B125FCFF9BA5',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:58.207Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1166,
    PaymentCode: '',
    InvoiceNo: '000149',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112749',
    StudentName: '陳小明 Chan Siu Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 400,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '20750DCF-0A55-406D-9629-5BD98B227285',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:55.677Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1165,
    PaymentCode: '',
    InvoiceNo: '000148',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112749',
    StudentName: '陳小明 Chan Siu Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 800,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: 'F3F5B350-A3E5-4C7A-848D-3A9C9D20DE78',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:53.407Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1163,
    PaymentCode: '',
    InvoiceNo: '000147',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112749',
    StudentName: '陳小明 Chan Siu Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 800,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: 'E1732BDE-4CC4-46C0-9449-F6A944C7FDC2',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:51.100Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1161,
    PaymentCode: '',
    InvoiceNo: '000146',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112749',
    StudentName: '陳小明 Chan Siu Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 400,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: 'F0591208-FE81-40FC-B5A5-00EAD033ECE4',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:47.780Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1154,
    PaymentCode: '',
    InvoiceNo: '000143',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112749',
    StudentName: '陳小明 Chan Siu Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 600,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: 'D14BB3B1-4A31-40C9-8226-8F13E1FD8C11',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:45.280Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1141,
    PaymentCode: '',
    InvoiceNo: '000140',
    InvoiceDate: '2022-06-30T00:00:00.000Z',
    StudentCode: '112749',
    StudentName: '陳小明 Chan Siu Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 800,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '616A00F9-D630-48DC-9980-8362CE2F24FF',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-30T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:42.500Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1126,
    PaymentCode: '',
    InvoiceNo: '000139',
    InvoiceDate: '2022-06-29T00:00:00.000Z',
    StudentCode: '112749',
    StudentName: '陳小明 Chan Siu Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 2950,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '6953876F-B572-4F4C-879D-AA4ABA6D1AEE',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-29T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:40.297Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1123,
    PaymentCode: '',
    InvoiceNo: '000138',
    InvoiceDate: '2022-06-29T00:00:00.000Z',
    StudentCode: '112752',
    StudentName: 'hi Yue Ho Yin',
    Form: 'F3        ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 3000,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: 'F0A8FB86-31F7-44F2-A931-00A508AC5F95',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-29T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:37.780Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1118,
    PaymentCode: '',
    InvoiceNo: '000137',
    InvoiceDate: '2022-06-29T00:00:00.000Z',
    StudentCode: '112751',
    StudentName: '劉志明 Lau Chi Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 3000,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: 'B4377C3B-C0D8-4867-9EB2-6116B1B09B99',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-29T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:35.183Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1105,
    PaymentCode: '',
    InvoiceNo: '000136',
    InvoiceDate: '2022-06-29T00:00:00.000Z',
    StudentCode: '112750',
    StudentName: '楊瑩瑩 Yeung Ying Ying',
    Form: '1         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 3000,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '92CCB350-A044-488D-A644-0920EA6DF328',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-29T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:32.903Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1101,
    PaymentCode: '',
    InvoiceNo: '000135',
    InvoiceDate: '2022-06-29T00:00:00.000Z',
    StudentCode: '112750',
    StudentName: '楊瑩瑩 Yeung Ying Ying',
    Form: '1         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 2950,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: 'A5A04304-BB46-4C66-91AA-26FBBBB1C35C',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-29T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:30.323Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1099,
    PaymentCode: '',
    InvoiceNo: '000134',
    InvoiceDate: '2022-06-29T00:00:00.000Z',
    StudentCode: '112749',
    StudentName: '陳小明 Chan Siu Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 2950,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '7F4ABA02-3B40-41EE-94C4-886C32FB586B',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-29T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:27.590Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 91,
    PaymentCode: '',
    InvoiceNo: '000126',
    InvoiceDate: '2022-06-23T00:00:00.000Z',
    StudentCode: '112757',
    StudentName: 'Yue Frankie ',
    Form: 'F4        ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 2700,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '127E5E26-72D6-4F71-B123-09B97120928C',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-23T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-30T11:32:24.263Z',
    VoidReason: 'Cancel Course',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 60,
    PaymentCode: '',
    InvoiceNo: '000105',
    InvoiceDate: '2022-06-22T00:00:00.000Z',
    StudentCode: '112757',
    StudentName: 'Yue Frankie ',
    Form: 'F4        ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 12400,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '7BAB4503-6B07-42D1-BC44-FE1E498B41B4',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-22T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-22T15:46:02.630Z',
    VoidReason: 'yes',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 59,
    PaymentCode: '',
    InvoiceNo: '000104',
    InvoiceDate: '2022-06-22T00:00:00.000Z',
    StudentCode: '112757',
    StudentName: 'Yue Frankie ',
    Form: 'F4        ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 10820,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '58B1AB8B-52FB-417F-BA6F-5C29B8207686',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-22T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-22T15:45:49.237Z',
    VoidReason: 'yes',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 41,
    PaymentCode: '',
    InvoiceNo: '000088',
    InvoiceDate: '2022-06-16T00:00:00.000Z',
    StudentCode: '112750',
    StudentName: '楊瑩瑩 Yeung Ying Ying',
    Form: '1         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 15120,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: false,
    CartID: 'C4095870-73BD-49E1-B9FA-BB75EC5AAFBA',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-16T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-22T10:10:23.827Z',
    VoidReason: 'EE',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 38,
    PaymentCode: '20220600028',
    InvoiceNo: '000085',
    InvoiceDate: '2022-06-16T00:00:00.000Z',
    StudentCode: '112753',
    StudentName: '陳嘉茵 Chan Ka Yan',
    Form: '1         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 4050,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: false,
    CartID: '7617C98D-9F31-4726-BD26-1061E221277D',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-16T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2022-06-22T10:11:23.830Z',
    VoidReason: 'eerer',
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 1,
    PaymentCode: '20220600002',
    InvoiceNo: '000074',
    InvoiceDate: '2022-06-15T00:00:00.000Z',
    StudentCode: '112749',
    StudentName: '陳小明 Chan Siu Ming',
    Form: '4         ',
    RegistrationNo: '603007',
    RegistrationName: 'CCBC TSW',
    RegistrationNameChi: '阡陌中心(長沙灣)',
    Address: '九龍長沙灣道681號貿易廣場1樓102室',
    Tel: '24339920',
    TotalGrossAmount: 0,
    TotalDiscount: 0,
    TotalAmount: 2000,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: true,
    CartID: '47C5D2D4-75EC-4B7C-8DC1-2E7B78CFDE3D',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Void',
    ReceivedBy: null,
    ReceivedDate: '2022-06-15T00:00:00.000Z',
    VoidBy: 'U0001',
    VoidDate: '2023-02-06T11:09:03.690Z',
    VoidReason: '錯收',
    PaymentMethod: null,
    ReceivedByName: null,
  },
];

const headCells = [
  {
    id: 'InvoiceNo',
    numeric: true,
    label: 'invoice no',
    align: 'left',
  },
  {
    id: 'InvoiceDate',
    numeric: false,
    label: 'invoice date',
    align: 'left',
  },
  {
    id: 'BranchCode',
    numeric: true,
    label: 'branch code',
    align: 'left',
  },
  {
    id: 'StudentCode',
    numeric: true,
    label: 'student',
    align: 'left',
  },
  {
    id: 'TotalAmount',
    numeric: false,
    label: 'total',
    align: 'center',
  },
  {
    id: 'Status',
    numeric: true,
    label: 'status',
    align: 'center',
  },
  {
    id: 'ReceivedDate',
    numeric: true,
    label: 'received date',
    align: 'center',
  },
  {
    id: 'Remarks',
    numeric: true,
    label: 'remarks',
    align: 'center',
  },
  {
    id: '',
    numeric: true,
    label: 'reprint',
    align: 'center',
  },
];

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ order, orderBy, numSelected, rowCount, onRequestSort, theme }) {
  const intl = useIntl();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: '600' }}
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

// ==============================|| Course Enrollment ||============================== //

export default function VoidTab() {
  const theme = useTheme();
  const intl = useIntl();
  //   const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);

  // const { orders } = useSelector((state) => state.customer);
  // React.useEffect(() => {
  //     dispatch(getOrders());
  // }, [dispatch]);
  // React.useEffect(() => {
  //     setRows([orders]);
  // }, [orders]);
  React.useEffect(() => {
    setRows([...dataMock]);
  }, []);

  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = rows.filter((row) => {
        let matches = true;

        const properties = [
          'invoice no',
          'invoice date',
          'branch code',
          'student',
          'total',
          'status',
          'received by',
          'received date',
          'payment method',
          'reprint',
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
      setRows(dataMock);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
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

                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
                      <Typography sx={{ fontSize: 18 }}>{row.InvoiceNo} </Typography>
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
                      <Typography sx={{ fontSize: 17 }}>
                        {new Date(row.InvoiceDate).toLocaleDateString('en-CA', {
                          timeZone: 'GMT',
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: 18 }}>{row.BranchCode}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: 18 }}>{row.StudentCode}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontSize: 18 }}>{row.TotalAmount}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontSize: 18 }}>{row.Status}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontSize: 17 }}>
                        {new Date(row.ReceivedDate).toLocaleDateString('en-CA', {
                          timeZone: 'GMT',
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontSize: 18 }}>{row.Remarks}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <CardActions>
                        <Grid container alignItems="center" justifyContent="center" spacing={1}>
                          <Grid item>
                            <Button variant="contained" sx={{ marginRight: 2, fontSize: 17 }}>
                              {intl.formatMessage({ id: 'invoice' })}
                            </Button>
                          </Grid>
                        </Grid>
                      </CardActions>
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
        labelRowsPerPage={intl.formatMessage({ id: 'Show' })}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
