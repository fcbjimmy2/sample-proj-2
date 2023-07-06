import PropTypes from 'prop-types';
import * as React from 'react';

// layouts
import AdminLayout from '../../../../src/layouts/admin';
import { Page } from '../../../../src/components/admin';

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
import Chip from '../../../../src/components/extended/Chip';
import MainCard from '../../../../src/components/extended/MainCard';

// third-party
import { useIntl } from 'react-intl';

// assets
import { Icon } from '@iconify/react';
import DeleteIcon from '@iconify/icons-carbon/trash-can';
import SearchIcon from '@iconify/icons-carbon/search';

//modal
import CourseDetails from './CourseDetails';

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
    NumOfStudent: 9,
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

// ==============================|| Course Enrollment ||============================== //

export default function CourseEnrollment() {
  const theme = useTheme();
  const intl = useIntl();
  //   const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
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

  //modal
  const [open, setOpen] = React.useState(false);
  const [rowDetails, setRowDetails] = React.useState({});

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

        // const properties = ['id', 'subject', 'title', 'teacher', 'status', 'BranchCode', 'coursedate', 'enrollmentenddate'];
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
      setRows(dataMock);
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
      <MainCard title={intl.formatMessage({ id: 'course info' })} content={false}>
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
                        setRowDetails(row);
                        handleOpen();
                      }}
                      sx={{ cursor: 'pointer' }}
                    >
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
                        // onClick={(event) => handleClick(event, row.name)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <Typography>{row.CourseCode} </Typography>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        // onClick={(event) => handleClick(event, row.name)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <Typography> {row.Subject} </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.CourseTitle}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.Name}</Typography>
                      </TableCell>
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
                      <TableCell align="center">
                        <Typography>{row.BranchCode}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>
                          {new Date(row.CourseStart).toLocaleDateString('en-CA', {
                            timeZone: 'GMT',
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>
                          {new Date(row.CourseDeactiveDate).toLocaleDateString('en-CA', {
                            timeZone: 'GMT',
                          })}
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
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* table pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage={intl.formatMessage({ id: 'Show' })}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <CourseDetails
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          rowDetails={rowDetails}
        />
      </MainCard>
    </AdminLayout>
  );
}