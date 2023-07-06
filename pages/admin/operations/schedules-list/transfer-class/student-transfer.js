import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Divider,
  Icon,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports

// assets
import { Icon as Iconify } from '@iconify/react';
import Arrows from '@iconify/icons-carbon/arrows-horizontal';

// third-party
import { useIntl } from 'react-intl';

// table data

// table filter
// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// table header
const headCells = [
  {
    id: 'code',
    numeric: true,
    disablePadding: false,
    label: 'Student Code',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Student Name',
  },
  {
    id: 'transfer',
    numeric: true,
    disablePadding: false,
    label: 'Transfer',
  },
];

// ==============================|| TABLE - HEADER ||============================== //

function EnhancedTableHead() {
  const intl = useIntl();
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {intl.formatMessage({ id: `${headCell.label}` })}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {};

// ==============================|| TABLE - TOOLBAR ||============================== //

// ==============================|| TABLE - ENHANCED ||============================== //

StudentTransfer.propTypes = {
  transferClassStudents: PropTypes.array,
};

function StudentTransfer({ transferClassStudents }) {
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const intl = useIntl();
  //   const handleClick = (event, name) => {
  //     const selectedIndex = selected.indexOf(name);
  //     let newSelected = [];

  //     if (selectedIndex === -1) {
  //       newSelected = newSelected.concat(selected, name);
  //     } else if (selectedIndex === 0) {
  //       newSelected = newSelected.concat(selected.slice(1));
  //     } else if (selectedIndex === selected.length - 1) {
  //       newSelected = newSelected.concat(selected.slice(0, -1));
  //     } else if (selectedIndex > 0) {
  //       newSelected = newSelected.concat(
  //         selected.slice(0, selectedIndex),
  //         selected.slice(selectedIndex + 1)
  //       );
  //     }
  //     const selectedRowData = rows.filter((row) => newSelected.includes(row.name.toString()));
  //     setSelectedValue(selectedRowData);
  //     setSelected(newSelected);
  //   };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //   const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transferClassStudents.length) : 0;

  return (
    <Box sx={{ m: 2 }}>
      {/* table */}
      <Divider />
      <TableContainer>
        <Table
          sx={{ maxWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead />
          <TableBody>
            {transferClassStudents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                if (typeof row === 'number') return null;
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.StudentCode}>
                    <TableCell align="center" component="th" id={labelId} scope="row">
                      {row.StudentCode}
                    </TableCell>
                    <TableCell align="center">{`${row.FirstName} ${row.LastName}`}</TableCell>
                    <TableCell align="center">
                      <Icon
                        size="small"
                        sx={{ cursor: 'pointer', '&:hover': { color: '#0d6efd' } }}
                      >
                        <Iconify icon={Arrows} />
                      </Icon>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
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
        count={transferClassStudents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={intl.formatMessage({ id: 'Show' })}
      />
    </Box>
  );
}

export default StudentTransfer;
