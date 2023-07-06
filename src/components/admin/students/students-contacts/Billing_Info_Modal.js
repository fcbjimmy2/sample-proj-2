import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import MainCard from '../../../cards/MainCard';
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
    invoice_id: '000080',
    date: '6/16/2022',
    discount: 0,
    amount: 4000,
    remarks: '',
    status: 'Completed',
  },
  {
    invoice_id: '000081',
    date: '6/16/2022',
    discount: 0,
    amount: 2000,
    remarks: '',
    status: 'Completed',
  },
  {
    invoice_id: '000082',
    date: '6/16/2022',
    discount: 0,
    amount: 2000,
    remarks: '',
    status: 'Completed',
  },
  {
    invoice_id: '000083',
    date: '6/16/2022',
    discount: 0,
    amount: 945,
    remarks: 'Superbon',
    status: 'Completed',
  },
  {
    invoice_id: '000084',
    date: '6/16/2022',
    discount: 0,
    amount: 2000,
    remarks: '',
    status: 'Completed',
  },
  {
    invoice_id: '000085',
    date: '6/16/2022',
    discount: 0,
    amount: 2000,
    remarks: '',
    status: 'Completed',
  },
  {
    invoice_id: '000086',
    date: '6/16/2022',
    discount: 0,
    amount: 2000,
    remarks: '',
    status: 'Completed',
  },
  {
    invoice_id: '000087',
    date: '6/16/2022',
    discount: 0,
    amount: 2000,
    remarks: '',
    status: 'Completed',
  },
  {
    invoice_id: '000088',
    date: '6/16/2022',
    discount: 0,
    amount: 2000,
    remarks: '',
    status: 'Completed',
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

// ==============================|| Table Header Options ||============================== //

// ==============================|| TABLE HEADER ||============================== //
function EnhancedTableHead({ order, orderBy, numSelected, onRequestSort, theme, selected }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    {
      id: 'invoice_id',
      numeric: false,
      label: useIntl().formatMessage({ id: 'Invoice No.' }),
      align: 'center',
    },
    {
      id: 'date',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Date' }),
      align: 'center',
    },
    {
      id: 'discount',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Discount' }),
      align: 'center',
    },
    {
      id: 'amount',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Amount' }),
      align: 'center',
    },
    {
      id: 'remarks',
      numeric: true,
      label: useIntl().formatMessage({ id: 'Remarks' }),
      align: 'center',
    },
    {
      id: 'status',
      numeric: false,
      label: useIntl().formatMessage({ id: 'Status' }),
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

export default function Billing_Info_Modal(props) {
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

        const properties = ['invoice_id', 'date', 'discount', 'amount', 'remarks', 'status'];
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

                const labelId = `enhanced-table-checkbox-${row.invoice_id}`;
                const date = row.date.split('/');
                const formattedDate = new Date(Date.UTC(date[2], date[0] - 1, date[1]))
                  .toISOString()
                  .split('T')[0];

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.invoice_id}>
                    <TableCell align="center" component="th" id={labelId} scope="row">
                      {row.invoice_id}
                    </TableCell>
                    <TableCell align="center" component="th" id={labelId} scope="row">
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                        }}
                      >
                        {' '}
                        {formattedDate}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{row.discount}</TableCell>

                    <TableCell align="center">{row.amount}</TableCell>

                    <TableCell align="center">{row.remarks}</TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                      {row.status}
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
        component="div"
        count={rows.length}
        labelRowsPerPage={intl.formatMessage({ id: 'Show' })}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/*-------------------------- Buttons ----------------------------------*/}
      <Grid container justifyContent="start" alignItems="center" sx={{ p: 3 }}>
        <Button variant="contained" sx={{ mr: 1 }} onClick={props.classInfoOpen}>
          {intl.formatMessage({ id: 'Class Info' })}
        </Button>
        <Button variant="contained" sx={{ mr: 1 }} onClick={props.profileOpen}>
          {intl.formatMessage({ id: 'Profile' })}
        </Button>
      </Grid>
    </MainCard>
  );
}
