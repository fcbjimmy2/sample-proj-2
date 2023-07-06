import PropTypes from 'prop-types';
import React from 'react';
import axios from '../../../src/utils/axios';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  CardContent,
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
import { visuallyHidden } from '@mui/utils';

// icons
import { Icon } from '@iconify/react';
import SearchIcon from '@iconify/icons-carbon/search';

// project imports
import MainCard from '../../../src/components/cards/MainCard';

// modal imports
import Profile_Modal from '../../../src/components/admin/students/students-contacts/Profile_Modal';

// third-party
import { useIntl } from 'react-intl';

// layouts
import AdminLayout from '../../../src/layouts/admin';
import { Page } from '../../../src/components/admin';

// ==============================|| Table Sort ||============================== //
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

// ==============================|| TABLE HEADER ||============================== //
function EnhancedTableHead({ order, orderBy, numSelected, onRequestSort, theme, selected }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  // ==============================|| Table Header Options ||============================== //
  const headCells = [
    {
      id: 'user_guid',
      numeric: false,
      label: useIntl().formatMessage({ id: 'Students' }),
      align: 'center',
    },
    {
      id: 'full_name',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Name' }),
      align: 'center',
    },
    {
      id: 'student_phone',
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
      id: 'level',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Level' }),
      align: 'center',
    },
    {
      id: 'created_date',
      numeric: false,
      label: useIntl().formatMessage({ id: 'Registration Date' }),
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
export default function Students_Contacts() {
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

  //modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  // get data from db
  const [studentData, setStudentData] = React.useState([]);

  React.useEffect(() => {
    axios.get('/api/student/all').then((response) => {
      setStudentData(response.data);
      setRows([...response.data]);
    });
  }, []);

  const handleRowClick = (rowData) => {
    setModalData(rowData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = studentData.filter((row) => {
        let matches = true;

        const properties = ['full_name', 'student_phone', 'email', 'level', 'created_date', 'sid'];
        let containsQuery = false;

        properties.forEach((property) => {
          if (row[property] === undefined) {
            return;
          }
          if (
            row[property]?.toString().toLowerCase().includes(newString.toString().toLowerCase())
          ) {
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
      setRows(studentData);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <AdminLayout>
      {console.log(studentData)}
      <MainCard title={intl.formatMessage({ id: 'Students' })} content={false}>
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

                  const isItemSelected = isSelected(row.fullName);
                  const labelId = `enhanced-table-checkbox-${row.sid}`;
                  const formattedDate = new Date(row.created_date).toISOString().split('T')[0];

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.user_guid}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleRowClick(row)}
                    >
                      <TableCell align="center" component="th" id={labelId} scope="row">
                        {row.sid}
                      </TableCell>
                      <TableCell align="center" component="th" id={labelId} scope="row">
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                          }}
                        >
                          {' '}
                          {row.full_name}{' '}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{row.student_phone}</TableCell>

                      <TableCell align="center">
                        <a href={`mailto: ${row.email}`}>{row.email}</a>
                      </TableCell>

                      <TableCell align="center">{row.level}</TableCell>
                      <TableCell align="center" sx={{ pr: 3 }}>
                        {formattedDate}
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
        <Profile_Modal
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          modalData={modalData}
        />
      </MainCard>
    </AdminLayout>
  );
}
