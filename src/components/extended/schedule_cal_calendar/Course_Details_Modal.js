import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Checkbox,
  Tooltip,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports
import ChangeTeacherModal from '../../../../pages/admin/operations/schedules-list/change-teacher/ChangeTeacherModal';

// icons
import { Icon } from '@iconify/react';
import SearchIcon from '@iconify/icons-carbon/search';

// third-party
import { useIntl } from 'react-intl';

const data = [
  {
    sid: 112749,
    name: 'John Doe',
  },
  {
    sid: 112750,
    name: 'Jane Smith',
  },
  {
    sid: 112751,
    name: 'Bob Johnson',
  },
  {
    sid: 112752,
    name: 'Samantha Lee',
  },
  {
    sid: 112753,
    name: 'Mike Brown',
  },
  {
    sid: 112754,
    name: 'Lisa Rodriguez',
  },
];

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

  // ==============================|| Table Header Options ||============================== //
  const headCells = [
    {
      id: 'sid',
      numeric: false,
      label: useIntl().formatMessage({ id: 'Student Code' }),
      align: 'center',
    },
    {
      id: 'name',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Student Name' }),
      align: 'center',
    },
  ];

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
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
// ==============================||  ||============================== //

export default function Course_Details_Modal(props) {
  const theme = useTheme();
  const intl = useIntl();
  // const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const currentEvent = props.values.selectEvent;

  React.useEffect(() => {
    setRows([...data]);
  }, []);

  const handleChangeTeacher = () => {
    setModalOpen(true);
  };
  const handleCloseTeacherModal = () => {
    setModalOpen(false);
  };

  const handleSearch = (event) => {
    const newString = event.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = data.filter((row) => {
        let matches = true;

        const properties = ['sid', 'name'];
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
      setRows(data);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = rows.map((n) => n.name);
      setSelected(newSelectedId);
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

  // Format the date
  function dateFormatter(input) {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  // Format the time
  function timeFormatter(input) {
    const date = new Date(input);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    return `${hours % 12 || 12}:${minutes}${amOrPm}`;
  }

  return (
    <>
      {/* Course Information */}
      <Grid item>
        <Table size="small" sx={{ border: 'none' }}>
          <TableBody>
            <TableRow sx={{ border: 'none' }}>
              <TableCell align="right" sx={{ border: 'none' }}>
                {intl.formatMessage({ id: 'Class Code' })}:
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                {currentEvent === undefined ? '' : currentEvent.id}
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: 'none' }}>
              <TableCell align="right" sx={{ border: 'none' }}>
                {intl.formatMessage({ id: 'Course' })}:
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                {currentEvent === undefined ? '' : currentEvent.course}
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: 'none' }}>
              <TableCell align="right" sx={{ border: 'none' }}>
                {intl.formatMessage({ id: 'Teacher' })}:
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Tooltip title={useIntl().formatMessage({ id: 'Change Teacher' })}>
                  <span
                    style={{ color: '#0dcaf0', cursor: 'pointer' }}
                    onClick={handleChangeTeacher}
                  >
                    {currentEvent === undefined ? '' : currentEvent.teacher}
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: 'none' }}>
              <TableCell align="right" sx={{ border: 'none' }}>
                {intl.formatMessage({ id: 'Date' })}:
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                {currentEvent === undefined ? '' : dateFormatter(currentEvent.start)}
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: 'none' }}>
              <TableCell align="right" sx={{ border: 'none' }}>
                {intl.formatMessage({ id: 'Start Time' })}:
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                {currentEvent === undefined ? '' : timeFormatter(currentEvent.start)}
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: 'none' }}>
              <TableCell align="right" sx={{ border: 'none' }}>
                {intl.formatMessage({ id: 'End Time' })}:
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                {currentEvent === undefined ? '' : timeFormatter(currentEvent.end)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>

      {/* Search Bar */}
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Grid item lg={12} sx={{ ml: 2 }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon={SearchIcon} fontSize="small" />
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

      {/* table */}
      <TableContainer>
        <Table sx={{ maxWidth: 450 }} aria-labelledby="tableTitle">
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
              .map((row) => {
                /** Make sure no display bugs if row isn't an OrderData object */
                if (typeof row === 'number') return null;

                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${row.sid}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.sid}
                    selected={isItemSelected}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={{ pl: 3 }}
                      onClick={(event) => handleClick(event, row.name)}
                    >
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      onClick={(event) => handleClick(event, row.name)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Typography
                        variant="subtitle1"
                        textAlign="center"
                        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                      >
                        {' '}
                        {row.sid}{' '}
                      </Typography>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      onClick={(event) => handleClick(event, row.name)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Typography
                        variant="subtitle1"
                        textAlign="center"
                        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                      >
                        {' '}
                        {row.name}{' '}
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
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={intl.formatMessage({ id: 'Show' })}
      />
      {/* Change Teacher Modal */}
      {modalOpen && (
        <ChangeTeacherModal
          open={handleChangeTeacher}
          handleCloseTeacherModal={handleCloseTeacherModal}
        />
      )}
    </>
  );
}

Course_Details_Modal.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  handleDelete: PropTypes.func,
  handleCreate: PropTypes.func,
  handleUpdate: PropTypes.func,
  onCancel: PropTypes.func,
  values: PropTypes.object,
};
