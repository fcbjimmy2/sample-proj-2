import PropTypes from 'prop-types';
// @mui
import { Table, Tooltip, TableBody, IconButton, TableContainer, Box } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import {
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../components/table';
//
import FileTableRow from '../item/FileTableRow';

// third-party
import { useIntl } from 'react-intl';
// ----------------------------------------------------------------------


  // { id: 'shared', label: 'Shared', align: 'right', width: 100 },


FileListView.propTypes = {
  table: PropTypes.object,
  isNotFound: PropTypes.bool,
  tableData: PropTypes.array,
  onDeleteRow: PropTypes.func,
  dataFiltered: PropTypes.array,
  onOpenConfirm: PropTypes.func,
  onChangeFolder: PropTypes.func,
  folderId: PropTypes.string,
  onItemUpdated: PropTypes.func,
  userData: PropTypes.array,
  tagList: PropTypes.array,
};

export default function FileListView({
  table,
  tableData,
  isNotFound,
  onDeleteRow,
  dataFiltered,
  onOpenConfirm,
  onChangeFolder,
  folderId,
  userData,
  tagList,
}) {
  
  const intl = useIntl();

  
  const colName = intl.formatMessage({id: 'File Manager-Cols-Name'});
  const colSize = intl.formatMessage({id: 'File Manager-Cols-Size'});
  const colType = intl.formatMessage({id: 'File Manager-Cols-Type'});
  const colModi = intl.formatMessage({id: 'File Manager-Cols-Modified'});

  const TABLE_HEAD = [
    { id: 'name', label: colName, align: 'left' },
    { id: 'size', label: colSize, align: 'left', width: 120 },
    { id: 'type', label: colType, align: 'center', width: 120 },
    { id: 'dateModified', colModi, align: 'left', width: 160 },
    { id: '' },
  ];

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = table;

  const denseHeight = dense ? 52 : 72;

  return (
    <>
      <Box sx={{ px: 1, position: 'relative', borderRadius: 1.5, bgcolor: 'background.neutral' }}>
        <TableSelectedAction
          dense={dense}
          numSelected={selected.length}
          rowCount={tableData.length}
          onSelectAllRows={(checked) =>
            onSelectAllRows(
              checked,
              tableData.map((row) => row.id)
            )
          }
          action={
            <>
              <Tooltip title="Share">
                <IconButton color="primary">
                  <Iconify icon="eva:share-fill" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton color="primary" onClick={onOpenConfirm}>
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Tooltip>
            </>
          }
          sx={{
            pl: 1,
            pr: 2,
            top: 8,
            left: 8,
            right: 8,
            width: 'auto',
            borderRadius: 1,
          }}
        />

        <TableContainer>
          <Table
            size={dense ? 'small' : 'medium'}
            sx={{
              minWidth: 960,
              borderCollapse: 'separate',
              borderSpacing: '0 8px',
              '& .MuiTableCell-head': {
                boxShadow: 'none !important',
              },
            }}
          >
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              sx={{
                '& .MuiTableCell-head': {
                  bgcolor: 'transparent',
                },
              }}
            />

            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <FileTableRow
                    key={row.id}
                    userData={userData}
                    tagList={tagList}
                    row={row}
                    selected={selected.includes(row.id)}
                    onSelectRow={() => onSelectRow(row.id)}
                    onDeleteRow={() => onDeleteRow(row.id)}
                    onChangeFolder={() => onChangeFolder(row.id.split('_')[0])}
                    folderId={folderId}
                  />
                ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
              />

              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <TablePaginationCustom
        count={dataFiltered.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        //
        dense={dense}
        onChangeDense={onChangeDense}
        sx={{
          '& .MuiTablePagination-root': { borderTop: 'none' },
          '& .MuiFormControlLabel-root': { px: 0 },
        }}
      />
    </>
  );
}
