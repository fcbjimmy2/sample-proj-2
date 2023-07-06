import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Checkbox,
  CardActions,
  Box,
  Divider,
  Button,
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
  Stack,
} from '@mui/material';

// third-party
import { useIntl } from 'react-intl';

// project imports
import VoucherCard from '../../../../../src/components/extended/operations/voucher/VoucherCard';

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
const headCells = [
  {
    id: 'WeekDay',
    numeric: false,
    label: 'weekday',
    align: 'left',
  },
  {
    id: 'ClassDate',
    numeric: false,
    label: 'date',
    align: 'left',
  },
  {
    id: 'StartTime',
    numeric: false,
    label: 'class start time',
    align: 'left',
  },
  {
    id: 'EndTime',
    numeric: false,
    label: 'class end time',
    align: 'left',
  },
  {
    id: 'Avaliable',
    numeric: false,
    label: 'availability',
    align: 'left',
  },
];

const data = [
  {
    ClassCode: '230512345#20230503#WED@1600-1700',
    Active: true,
    CourseCode: '230512345',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0022',
    VenueCode: '02',
    WeekDay: 'WED',
    StartTime: '2023-05-03T16:00:00.000Z',
    EndTime: '2023-05-03T17:00:00.000Z',
    ClassDate: '2023-05-03T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
    BranchCode: 'CCBC-CEC',
    ClassQuota: 10,
    NoofStudent: 2,
    Avaliable: 8,
    Attended: 0,
    CourseMasterCode: '12345',
    CheckIn: null,
    CheckOut: null,
    CourseActive: true,
  },
  {
    ClassCode: '230512345#20230510#WED@1600-1700',
    Active: true,
    CourseCode: '230512345',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0022',
    VenueCode: '02',
    WeekDay: 'WED',
    StartTime: '2023-05-10T16:00:00.000Z',
    EndTime: '2023-05-10T17:00:00.000Z',
    ClassDate: '2023-05-10T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
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
    ClassCode: '230512345#20230517#WED@1600-1700',
    Active: true,
    CourseCode: '230512345',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0022',
    VenueCode: '02',
    WeekDay: 'WED',
    StartTime: '2023-05-17T16:00:00.000Z',
    EndTime: '2023-05-17T17:00:00.000Z',
    ClassDate: '2023-05-17T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
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
    ClassCode: '230512345#20230524#WED@1600-1700',
    Active: true,
    CourseCode: '230512345',
    ClassDesc: '中文寫作',
    TeacherCode: 'U0022',
    VenueCode: '02',
    WeekDay: 'WED',
    StartTime: '2023-05-24T16:00:00.000Z',
    EndTime: '2023-05-24T17:00:00.000Z',
    ClassDate: '2023-05-24T00:00:00.000Z',
    ClassRemark: '',
    Name: 'MIss Kitty',
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

const voucherData = [
  {
    VoucherCode: 'A90',
    VoucherName: '優惠90%',
    VoucherType: 'Discount',
    VoucherEnd: '2999-12-31T00:00:00.000Z',
  },
  {
    VoucherCode: 'SP1',
    VoucherName: '特別優惠',
    VoucherType: 'Special Price',
    VoucherEnd: '2999-12-31T00:00:00.000Z',
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
  const intl = useIntl();

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
                {intl.formatMessage({ id: headCell.label })}
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

const CourseTable = ({ studentInfo, handleOpenMessage, selected, setSelected, showVouchers }) => {
  const theme = useTheme();
  const intl = useIntl();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  // const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [unique, setUnique] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [isChecked, setIsChecked] = React.useState(() => voucherData.map((i) => false));
  const [checkedVoucher, setCheckedVoucher] = React.useState([]);

  const isCheckboxChecked = (index, checked) => {
    setIsChecked((isChecked) => {
      return isChecked.map((c, i) => {
        if (i === index) return checked.checked;
        return c;
      });
    });
    setCheckedVoucher((isChecked) => {
      // if checked is false, remove the value from the array
      if (isChecked.includes(checked.value) && !checked.checked) {
        return isChecked.filter((item) => item !== checked.value);
      }
      // if checked is true, add the value to the array
      return [...isChecked, checked.value];
    });
    return;
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setRows(data);
    setUnique(data);
    console.log(showVouchers);
    console.log(selected);
    console.log(studentInfo);
  }, [showVouchers, selected, studentInfo]);

  const handleSearch = (event) => {
    const newString = event.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = rows.filter((row) => {
        let matches = true;

        const properties = ['WeekDay', 'ClassDate', 'StartTime', 'EndTime', 'Avaliable'];
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
        console.log('entered here selected.length > 0', selected);
        setSelected([]);
      } else {
        console.log('entered here selected.length < 0', selected);
        const newSelectedId = rows.map((n) => n.ClassCode);
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
    <>
      <Card sx={{ m: 1 }}>
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
                placeholder={intl.formatMessage({ id: 'search' })}
                value={search}
                size="small"
              />
            </Grid>
          </Grid>
        </CardContent>

        {/* table */}
        <TableContainer>
          <Table aria-labelledby="tableTitle">
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
                  const isItemSelected = isSelected(row.ClassCode);
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
                        onClick={(event) => {
                          handleClick(event, row.ClassCode);
                        }}
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
                          {row.WeekDay}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900',
                            textDecoration: 'none',
                          }}
                        >
                          {new Date(row.ClassDate).toLocaleDateString('en-CA', { timeZone: 'GMT' })}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900',
                            textDecoration: 'none',
                          }}
                        >
                          {new Date(row.StartTime).toLocaleTimeString('en-CA', {
                            timeZone: 'GMT',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900',
                            textDecoration: 'none',
                          }}
                        >
                          {new Date(row.EndTime).toLocaleTimeString('en-CA', {
                            timeZone: 'GMT',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900',
                            textDecoration: 'none',
                          }}
                        >
                          {row.Avaliable}
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
      {/* vouchers */}
      <Box sx={{ m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={7}>
            {voucherData.map((voucher, index) => (
              <VoucherCard
                key={index}
                voucher={voucher}
                index={index}
                isCheckboxChecked={isCheckboxChecked}
                isChecked={isChecked}
                showVouchers={showVouchers}
              />
            ))}
          </Grid>
          <Grid item xs={12} sm={8} md={4} lg={5}>
            <CardActions sx={{ m: 1 }}>
              <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={handleOpenMessage}>
                    {intl.formatMessage({ id: 'create invoice' })}
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

CourseTable.propTypes = {
  studentInfo: PropTypes.string,
  handleOpenMessage: PropTypes.func,
  selected: PropTypes.array,
  setSelected: PropTypes.func,
  showVouchers: PropTypes.bool,
};

export default CourseTable;
