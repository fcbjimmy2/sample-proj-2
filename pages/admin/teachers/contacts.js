import PropTypes from 'prop-types';
import * as React from 'react';
import Image from 'next/image';

// layouts
import AdminLayout from '../../../src/layouts/admin';
import { Page } from '../../../src/components/admin';

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
import Calendar_Without_Header from '../../../src/components/extended/calendar_without_header';
import MainCard from '../../../src/components/cards/MainCard';

// icons
import { Icon } from '@iconify/react';
import PrintIcon from '@iconify/icons-carbon/printer';
import SearchIcon from '@iconify/icons-carbon/search';
import FileCopyIcon from '@iconify/icons-carbon/copy-file';
import CalendarMonthIcon from '@iconify/icons-carbon/calendar';
import FilterListIcon from '@iconify/icons-carbon/filter';

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

// table header options

const dataMock = [
  {
    id: 1,
    avatar: 'user-1.jpg',
    name: 'Crystal',
    verify: 1,
    location: 'Saucerize',
    phone: 65428739,
    followers: 3645,
    status: 'Active',
    email: 'tt1@mail.com',
    branch: 'CCBC-CC',
  },
  {
    id: 2,
    avatar: 'user-2.jpg',
    name: 'Alan',
    verify: 1,
    location: 'South Bradfordstad',
    phone: 28937713,
    followers: 2345,
    status: 'Pending',
    email: 'alau@apex.hk',
    branch: 'CCBC-CC',
  },
  {
    id: 3,
    name: 'Lola',
    verify: 1,
    email: 'aufderhar56@yahoo.com',
    location: 'North Tannermouth',
    phone: 164,
    followers: 9345,
    status: 'Rejected',
  },
  {
    id: 4,
    name: 'Milton',
    verify: 1,
    email: 'dikinson49@hotmail.com',
    location: 'North Anika',
    phone: 684,
    followers: 3654,
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Lysanne',
    verify: 0,
    email: 'zack.turner49@company.com',
    location: 'Betteland',
    phone: 842,
    followers: 5863,
    status: 'Active',
  },
  {
    id: 6,
    name: 'Bonita',
    verify: 1,
    email: 'keebler57@company.com',
    location: 'Alexburgh',
    phone: 543,
    followers: 8965,
    status: 'Rejected',
  },
  {
    id: 7,
    name: 'Retta',
    verify: 1,
    email: 'mathew92@yahoo.com',
    location: 'East Bryceland',
    phone: 871,
    followers: 9321,
    status: 'Active',
  },
  {
    id: 8,
    name: 'Zoie',
    verify: 1,
    email: 'hulda1@hotmail.com',
    location: 'Beattytown',
    phone: 354,
    followers: 1686,
    status: 'Pending',
  },
  {
    id: 9,
    name: 'Easton',
    verify: 1,
    email: 'hilpert66@hotmail.com',
    location: 'North Pedromouth',
    phone: 546,
    followers: 9562,
    status: 'Active',
  },
  {
    id: 10,
    name: 'Brianne',
    verify: 1,
    email: 'noe45@hotmail.com',
    location: 'New Alexanderborough',
    phone: 1482,
    followers: 10865,
    status: 'Active',
  },
];

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ order, orderBy, numSelected, onRequestSort, theme, selected }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    {
      id: 'avatar',
      numeric: false,
      label: useIntl().formatMessage({ id: 'Teacher' }),
      align: 'center',
    },
    {
      id: 'name',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Name' }),
      align: 'center',
    },
    {
      id: 'phone',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Phone' }),
      align: 'center',
    },
    {
      id: 'email',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Email' }),
      align: 'center',
    },
    {
      id: 'branch',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Branch' }),
      align: 'center',
    },
    {
      id: 'status',
      numeric: false,
      label: useIntl().formatMessage({ id: 'Schedule' }),
      align: 'center',
    },
  ];

  return (
    <TableHead>
      <TableRow>
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
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {headCell.label}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
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
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// ==============================||  ||============================== //

export default function Teacher_Contacts() {
  const theme = useTheme();
  const intl = useIntl();
  // const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [calendarToggleOpen, setCalendarToggleOpen] = React.useState(null);
  React.useEffect(() => {
    setRows([...dataMock]);
  }, []);

  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = dataMock.filter((row) => {
        let matches = true;

        const properties = ['name', 'phone', 'email', 'branch'];
        let containsQuery = false;

        properties.forEach((property) => {
          if (row[property] === undefined) {
            return;
          }
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

  const handleCalendarToggle = (rowId) => () => {
    setCalendarToggleOpen((prevId) => (prevId === rowId ? null : rowId));
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
      <MainCard title={intl.formatMessage({ id: 'Teachers' })} content={false}>
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
                placeholder={intl.formatMessage({ id: 'Search' })}
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
              onRequestSort={handleRequestSort}
              theme={theme}
              selected={selected}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  /** Make sure no display bugs if row isn't an OrderData object */
                  if (typeof row === 'number') return null;

                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${row.id}`;
                  const avatarSrc = row.avatar ? `/avatars/${row.avatar}` : '/avatars/user.png';

                  return (
                    <>
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell
                          align="center"
                          alignCenter
                          component="th"
                          id={labelId}
                          scope="row"
                        >
                          <Image
                            src={avatarSrc}
                            alt={`Avatar of ${row.name}`}
                            width={70}
                            height={70}
                            style={{
                              borderRadius: '50%',
                              border: '1px solid #dee2e6',
                              display: 'block',
                              margin: 'auto',
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" component="th" id={labelId} scope="row">
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                            }}
                          >
                            {' '}
                            {row.name}{' '}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">{row.phone}</TableCell>

                        <TableCell align="center">
                          <a href={`mailto: ${row.email}`}>{row.email}</a>
                        </TableCell>

                        <TableCell align="center">{row.branch}</TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                          <Tooltip placement="top">
                            <IconButton
                              color="primary"
                              onClick={handleCalendarToggle(row.id)}
                              sx={{
                                color: theme.palette.info.dark,
                                borderColor: theme.palette.primary.dark,
                                '&:hover ': {
                                  background: theme.palette.info.dark,
                                  color: theme.palette.primary.contrastText,
                                },
                              }}
                              size="large"
                            >
                              <Icon icon={CalendarMonthIcon} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                      {/* calendar toggle */}
                      {calendarToggleOpen === row.id && (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <Calendar_Without_Header />
                          </TableCell>
                        </TableRow>
                      )}
                    </>
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
      </MainCard>
    </AdminLayout>
  );
}
