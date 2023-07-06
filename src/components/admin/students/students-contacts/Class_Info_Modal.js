import PropTypes from 'prop-types';
import React from 'react';
import MainCard from '../../../cards/MainCard';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  CardContent,
  TableCell,
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableSortLabel,
  TextField,
  Toolbar,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// icons
import { Icon } from '@iconify/react';
import SearchIcon from '@iconify/icons-carbon/search';

// third-party
import { useIntl } from 'react-intl';

// db data
const dataMock = [
  {
    id: '12345A',
    title: '中文寫作',
    start: '6/21/2022',
    end: '7/13/2022',
    time: 'TUE-WED (10:30-11:30)',
    class_status: 29,
    attend: 5,
    absents: 3,
    absent_date: ['6/21', '6/22', '7/21'],
  },
  {
    id: '12345X',
    title: '中文寫作',
    start: '7/21/2022',
    end: '8/31/2022',
    time: 'MON-WED (10:00-11:00)',
    class_status: 2,
    attend: 0,
    absents: 0,
    absent_date: [],
  },
  {
    id: '12345B',
    title: '中文寫作',
    start: '6/21/2022',
    end: '7/13/2022',
    time: 'TUE-WED (10:30-11:30)',
    class_status: 29,
    attend: 5,
    absents: 9,
    absent_date: ['01/06', '08/06', '15/06', '06/06', '10/06', '13/06', '17/06', '06/06', '10/06'],
  },
  {
    id: '202208168',
    title: '成人西洋畫班(Acrylic) - A班',
    start: '8/19/2022',
    end: '9/13/2022',
    time: 'TUE-FRI (09:30-22:30)',
    class_status: 5,
    attend: 0,
    absents: 3,
    absent_date: ['6/21', '6/22', '7/21'],
  },
  {
    id: '2112168',
    title: '成人西洋畫班(Acrylic) - B班',
    start: '6/21/2022',
    end: '7/13/2022',
    time: 'TUE-WED (10:30-11:30)',
    class_status: 29,
    attend: 5,
    absents: 3,
    absent_date: ['6/21', '6/22', '7/21'],
  },
  {
    id: '2206266001',
    title: '2206266001 - 奧數(中班)Zoom+',
    start: '6/21/2022',
    end: '7/13/2022',
    time: 'TUE-WED (10:30-11:30)',
    class_status: 29,
    attend: 5,
    absents: 3,
    absent_date: ['6/21', '6/22', '7/21'],
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
function EnhancedTableHead({ order, orderBy, numSelected, onRequestSort, theme, selected }) {
  const headCells = [
    {
      id: 'id',
      numeric: false,
      label: useIntl().formatMessage({ id: 'Course' }),
      align: 'center',
    },
    {
      id: 'title',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Title' }),
      align: 'center',
    },
    {
      id: 'start',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Start' }),
      align: 'center',
    },
    {
      id: 'end',
      numeric: true,
      label: useIntl().formatMessage({ id: 'End' }),
      align: 'center',
    },
    {
      id: 'time',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Course time' }),
      align: 'center',
    },
    {
      id: 'class_status',
      numeric: false,
      label: useIntl().formatMessage({ id: 'Class Status' }),
      align: 'center',
    },
    {
      id: 'attend_status',
      numeric: false,
      label: useIntl().formatMessage({ id: 'Attend Status' }),
      align: 'center',
    },
    {
      id: 'absents',
      numeric: false,
      label: useIntl().formatMessage({ id: 'Absents' }),
      align: 'center',
    },
    {
      id: 'absent_date',
      numeric: false,
      label: useIntl().formatMessage({ id: 'Absent Date' }),
      align: 'center',
    },
  ];

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

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

// start of modal position functions
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
// end of modal position functions

export default function Class_Info_Modal(props) {
  const [modalStyle] = React.useState(getModalStyle);
  const theme = useTheme();
  const intl = useIntl();
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    setRows([...dataMock]);
  }, []);

  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = dataMock.filter((row) => {
        let matches = true;

        const properties = [
          'id',
          'title',
          'start',
          'end',
          'time',
          'class_status',
          'attend_status',
          'absents',
          'absent_date',
        ];
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  return (
    <MainCard
      modalStyle={modalStyle}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '90%',
        width: '80%',
        overflowY: 'auto',
      }}
      content={false}
    >
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

                const labelId = `enhanced-table-checkbox-${row.id}`;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align="center" component="th" id={labelId} scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center" component="th" id={labelId} scope="row">
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                        }}
                      >
                        {' '}
                        {row.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{row.start}</TableCell>

                    <TableCell align="center">{row.end}</TableCell>

                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                      {row.class_status}/{row.class_status}
                    </TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                      {row.attend}/{row.class_status}
                    </TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                      {row.absents}
                    </TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                      {row.absent_date.map((date, index) => (
                        <Typography key={index}>{date}</Typography>
                      ))}
                    </TableCell>
                  </TableRow>
                );
              })}
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
      {/*-------------------------- Buttons ----------------------------------*/}
      <Grid container justifyContent="start" alignItems="center" sx={{ p: 3 }}>
        <Button variant="contained" sx={{ mr: 1 }} onClick={props.billingOpen}>
          {intl.formatMessage({ id: 'Billing Info' })}
        </Button>
        <Button variant="contained" sx={{ mr: 1 }} onClick={props.profileOpen}>
          {intl.formatMessage({ id: 'Profile' })}
        </Button>
      </Grid>
    </MainCard>
  );
}
