import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Paper,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Container,
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
    ProductCode: '003',
    ProductName: '租琴房/租鼓房',
    ProductDescription: '租琴房/租鼓房',
    ProductCat: 'Charge',
    Column4: 'Charge',
    ProductPrice: 250,
    Stockable: true,
    Voucher: true,
    Qty: null,
    Active: true,
  },
  {
    ProductCode: '00333',
    ProductName: '租琴房/租鼓房',
    ProductDescription: '租琴房/租鼓房',
    ProductCat: 'Charge',
    Column4: 'Charge',
    ProductPrice: 250,
    Stockable: false,
    Voucher: true,
    Qty: 0,
    Active: true,
  },
  {
    ProductCode: '004',
    ProductName: '在學證明/證書費',
    ProductDescription: '在學證明/證書費',
    ProductCat: 'Charge',
    Column4: 'Charge',
    ProductPrice: 50,
    Stockable: false,
    Voucher: true,
    Qty: null,
    Active: true,
  },
  {
    ProductCode: '00444',
    ProductName: '在學證明',
    ProductDescription: '在學證明/證書費',
    ProductCat: 'Charge',
    Column4: 'Charge',
    ProductPrice: 5010,
    Stockable: true,
    Voucher: true,
    Qty: 9018,
    Active: true,
  },
  {
    ProductCode: '005',
    ProductName: '畫筆',
    ProductDescription: '畫筆',
    ProductCat: 'Charge',
    Column4: 'Charge',
    ProductPrice: 20,
    Stockable: true,
    Voucher: true,
    Qty: 0,
    Active: true,
  },
  {
    ProductCode: 'A04',
    ProductDescription: '新生連續4堂 $50 現金',
    ProductName: '新生連續4堂 $50 現金',
    ProductPrice: 50,
    Qty: 1,
  },
];

const headCells = [
  {
    id: 'ClassDesc',
    numeric: true,
    label: 'code',
    align: 'left',
  },
  {
    id: 'WeekDay',
    numeric: false,
    label: 'product',
    align: 'left',
  },
  {
    id: 'StartTime',
    numeric: true,
    label: 'price',
    align: 'left',
  },
  {
    id: 'StartTime',
    numeric: true,
    label: 'qty',
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

const AddItemContent = ({ handleClose, setRows }) => {
  const theme = useTheme();
  // const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [lines, setLines] = React.useState([]);
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

  React.useEffect(() => {
    setLines([...mockData]);
  }, []);

  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = lines.filter((row) => {
        let matches = true;

        const properties = ['ProductCode', 'ProductName', 'ProductPrice', 'Qty'];
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
      setLines(newRows);
    } else {
      setLines(mockData);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lines.length) : 0;

  return (
    <Paper>
      {/* table */}
      <ThemeProvider theme={themeTypo}>
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={lines.length}
              theme={theme}
            />
            <TableBody>
              {lines
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  /** Make sure no display bugs if row isn't an OrderData object */
                  if (typeof row === 'number') return null;

                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      sx={{ cursor: 'pointer' }}
                      hover
                      onClick={() => {
                        if (row.Qty > 0 && Object.keys(row).every((item) => item !== null)) {
                          setRows((prevState) => [...prevState, { ...row, Qty: 1 }]);
                        }
                        handleClose();
                      }}
                    >
                      <TableCell component="th" id={labelId} scope="row" size="small">
                        <Typography>{row.ProductCode} </Typography>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        sx={{ cursor: 'pointer' }}
                        size="small"
                      >
                        <Typography> {row.ProductName} </Typography>
                      </TableCell>
                      <TableCell size="small">
                        <Typography>{row.ProductPrice}</Typography>
                      </TableCell>
                      <TableCell size="small">
                        <Typography>{row.Qty}</Typography>
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
        count={lines.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={intl.formatMessage({ id: 'Show' })}
      />
    </Paper>
  );
};

AddItemContent.propTypes = {
  handleClose: PropTypes.func,
  setRows: PropTypes.func,
};

export default AddItemContent;
