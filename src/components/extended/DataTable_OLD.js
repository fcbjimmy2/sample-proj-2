import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import {
    Box,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableSortLabel,
    TableRow,
    Stack
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports
import MainCard from '../cards/MainCard';

// third-party
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { dispatch } from '../../store';
import { getRows } from '../../store/slices/datatable';

// ==============================|| TABLE - HEADER ||============================== //

function EnhancedTableHead({ headers, order, orderBy, rowCount, onRequestSort }) {
    const intl = useIntl();
    
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const headCells = Object.entries(headers).map((entry) => {
        let [index, header] = entry;
        return {
            id: index,
            numeric: true,
            disablePadding: false,
            label: header,
        };
    });

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={index}
                        align={headCell.numeric ? 'right' : 'left'}
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
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default function DataTable({headers = [], url = '', args = {}, title = '', renderRow = null, before = null, data = null, hideHeader = false, hidePagination = false, isList = false, reload = false, pagination="default"}) {
    const intl = useIntl();
    const [rows, setRows] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(hidePagination?-1:5);
    const [params, setParams] = React.useState({
        rowsPerPage: 5,
        ...args
    });

    const datatableState = useSelector((state) => state.datatable);

    if (renderRow == null) {
        renderRow = (row, index) => {
            
            return (
                <TableRow
                    hover
                    tabIndex={-1}
                    key={index}
                >
                    {Object.values(row).map((value, index) => (
                        <TableCell key={index} align="right">{value}</TableCell>
                    ))}
                </TableRow>
            );
        };
    }

    React.useEffect(() => {
        if (data) {
            setTotal(data.length);
            setRows(data);
        } else {
            setTotal(datatableState.total);
            setRows(datatableState.rows);
        }
    }, [datatableState]);

    React.useEffect(() => {
        setRows([]);
        dispatch(getRows(url, params));
    }, [params, reload]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        const _order = isAsc ? 'desc' : 'asc';
        setOrder(_order);
        setOrderBy(property);
        setParams({...params, order: _order, orderBy: property});
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setParams({...params, page: newPage});
    };

    const handleChangeRowsPerPage = (event) => {
        const rowsPerPage = parseInt(event?.target.value, 10);
        setRowsPerPage(rowsPerPage);
        setPage(0);
        setParams({...params, rowsPerPage, page: 0});
    };

    if (isList) {
        return (
            <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'background.neutral' }}>
                {before}

                <Stack spacing={1}>
                    {rows.map((row, index) => renderRow(row, index))}
                </Stack>

                {!hidePagination && pagination == "default" && (
                <Pagination
                    count={Math.ceil(total / rowsPerPage)}
                    page={page + 1}
                    onChange={(e, value) => handleChangePage(e, value - 1)}
                    color="primary"
                    size="large"
                    sx={{
                        pt: 2,
                        pb: 2,
                        '& .MuiPagination-ul': {
                            justifyContent: 'center',
                        },
                    }}
                />
                )}

                {!hidePagination && pagination == "table" && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    labelRowsPerPage={intl.formatMessage({ id: 'Show' })}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ borderTop: 'none' }}
                />
                )}
            </Box>
        );
    } else {
        return (
            <MainCard
                content={false}
                title={title}
                boxShadow
            >
                <Paper sx={{ width: '100%', mb: 2 }}>
                    {before}
                    {/* table */}
                    <TableContainer>
                        <Table aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                            {!hideHeader && (
                            <EnhancedTableHead
                                headers={headers}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            )}
                            <TableBody>
                                {rows.map((row, index) => renderRow(row, index))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {!hidePagination && pagination == "default" && (
                    <Pagination
                        count={Math.ceil(total / rowsPerPage)}
                        page={page + 1}
                        onChange={(e, value) => handleChangePage(e, value - 1)}
                        color="primary"
                        size="large"
                        sx={{
                            pt: 2,
                            pb: 2,
                            '& .MuiPagination-ul': {
                                justifyContent: 'center',
                            },
                        }}
                    />
                    )}

                    {!hidePagination && pagination == "table" && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        labelRowsPerPage={intl.formatMessage({ id: 'Show' })}
                        component="div"
                        count={total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    )}
                </Paper>
            </MainCard>
        );
    }
}
