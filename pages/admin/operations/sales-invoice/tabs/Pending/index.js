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
import Chip from '../../../../../../src/components/extended/Chip';

// third-party
import { useIntl } from 'react-intl';

// assets
import { Icon } from '@iconify/react';
import SearchIcon from '@iconify/icons-carbon/search';

//imports
import VoidModal from '../VoidModal';
import CreateInvoice from './CreateInvoice';
import CreateInvoiceModal from '../../../../../../src/components/extended/operations/create-invoice/CreateInvoiceModal';

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
    Idx: 12291,
    PaymentCode: '',
    InvoiceNo: '000229',
    InvoiceDate: '2023-03-31T00:00:00.000Z',
    StudentCode: '112757',
    StudentName: 'Yue Frankie',
    Form: 'F4',
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
    Void: false,
    CartID: 'DE1A266A-8156-4D0D-A907-039D5DCBA02F',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Pending',
    ReceivedBy: null,
    ReceivedDate: '2023-03-31T00:00:00.000Z',
    VoidBy: null,
    VoidDate: null,
    VoidReason: null,
    PaymentMethod: null,
    ReceivedByName: null,
  },
  {
    Idx: 11285,
    PaymentCode: '',
    InvoiceNo: '000226',
    InvoiceDate: '2023-03-24T00:00:00.000Z',
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
    TotalAmount: 1950,
    BranchCode: 'CCBC-CEC',
    Logo: null,
    Void: false,
    CartID: '57A83EA2-DA33-4BA3-8F5B-314C0FF11437',
    UserCode: 'U0001',
    Remarks: '',
    Status: 'Pending',
    ReceivedBy: null,
    ReceivedDate: '2023-03-24T00:00:00.000Z',
    VoidBy: null,
    VoidDate: null,
    VoidReason: null,
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
    id: 'ReceivedByName',
    numeric: true,
    label: 'received by',
    align: 'center',
  },
  {
    id: 'ReceivedDate',
    numeric: true,
    label: 'received date',
    align: 'center',
  },
  {
    id: 'PaymentMethod',
    numeric: true,
    label: 'payment method',
    align: 'center',
  },
  {
    id: '',
    numeric: true,
    label: ' ',
    align: 'center',
  },
  {
    id: '',
    numeric: true,
    label: 'reprint',
    align: 'center',
  },
  {
    id: '',
    numeric: true,
    label: ' ',
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

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

// ==============================|| Course Enrollment ||============================== //

export default function PendingTab() {
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

  //Void modal
  const [open, setOpen] = React.useState(false);
  const [rowDetails, setRowDetails] = React.useState({});

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //Create Invoice Modal
  const [openInvoice, setOpenInvoice] = React.useState(false);

  const handleOpenInvoice = () => {
    setOpenInvoice(true);
  };
  const handleCloseInvoice = () => {
    setOpenInvoice(false);
  };

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
                      <Typography sx={{ fontSize: 18 }}>{row.ReceivedByName}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontSize: 17 }}>
                        {new Date(row.ReceivedDate).toLocaleDateString('en-CA', {
                          timeZone: 'GMT',
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontSize: 18 }}>{row.PaymentMethod}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <CardActions>
                        <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
                          <Grid item>
                            <Button variant="contained" sx={{ marginRight: 2, fontSize: 17 }}>
                              {intl.formatMessage({ id: 'paid' })}
                            </Button>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </TableCell>
                    <TableCell align="center">
                      <CardActions>
                        <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
                          <Grid item>
                            <Button variant="contained" sx={{ marginRight: 2, fontSize: 17 }}>
                              {intl.formatMessage({ id: 'invoice' })}
                            </Button>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </TableCell>
                    <TableCell align="center">
                      <CardActions>
                        <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
                          <Grid item>
                            <Button
                              variant="contained"
                              color="error"
                              sx={{ marginRight: 2, fontSize: 17 }}
                              onClick={() => {
                                setRowDetails(row.InvoiceNo);
                                handleOpen();
                              }}
                            >
                              {intl.formatMessage({ id: 'void' })}
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
      <CardActions>
        <Grid container alignItems="center" justifyContent="flex-start" spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: 2, fontSize: 20 }}
              onClick={handleOpenInvoice}
            >
              {intl.formatMessage({ id: 'create invoice' })}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      <VoidModal open={open} rowDetails={rowDetails} handleClose={handleClose} />
      <CreateInvoiceModal
        openInvoice={openInvoice}
        handleCloseInvoice={handleCloseInvoice}
        condition={'sales-invoice'}
      />
    </>
  );
}
