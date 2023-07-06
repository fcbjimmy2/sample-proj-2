import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

// material-ui
import { 
    Box,
    Button,
    Card,
    Divider,
    MenuItem,
    Stack,
    Tab,
    Tabs,
    TableContainer,
    Typography,
    Table,
    TableBody,
    Skeleton
} from '@mui/material';

// components
import Iconify from '../../../src/components/Iconify';
import MenuPopover from '../../../src/components/menu-popover';
import Scrollbar from '../../../src/components/Scrollbar';

// layouts
import AdminLayout from '../../../src/layouts/admin';

// project imports
import { MasterTableFormDialog, MasterTableToolbar, MasterTableRow } from '../../../src/sections/admin/system/master-tables';

// hooks
import { useRequest } from '../../../src/hooks';

// utils
import axios from '../../../src/utils/axios';

// third-party
import { useIntl } from 'react-intl';

// components
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSkeleton,
  TablePaginationCustom,
  TableError
} from '../../../src/components/table';


// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, name, search }) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (search) {
        inputData = inputData.filter(
        (master) => (master.value.toLowerCase().indexOf(search.toLowerCase()) !== -1)
            ||  (master.lang_en.toLowerCase().indexOf(search.toLowerCase()) !== -1) 
            || (master.lang_zh_hant.toLowerCase().indexOf(search.toLowerCase()) !== -1)
            || (master.lang_zh_hans.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        );
    }

    if (name) {
        inputData = inputData.filter((master) => master.name === name);
    }

    return inputData;
}
  
// ----------------------------------------------------------------------

export default function MasterTables() {    
    const intl = useIntl();
    
    const [types, setTypes] = useState([]);

    const [selectedType, setSelectedType] = useState(null);

    const handleTabChange = (event, tab) => {
        setSelectedType(tab);
    };

    const initialize = useCallback(async () => {
      try {
        const response = await axios.get('/api/admin/master-tables/types');
        setTypes(response.data);
        if (selectedType) {
            const foundType = response.data.find(element => element.value === selectedType);
            if (!foundType) {
                setSelectedType((response.data.length > 0) ? response.data[0].value : null);
            }
        } else {
            setSelectedType((response.data.length > 0) ? response.data[0].value : null);
        }
      } catch (error) {
        console.error(error);
      }
    }, []);  
  
    useEffect(() => {
      initialize();
    }, [intl.locale]);

    const TABLE_HEAD = [
        { id: 'value', label: intl.formatMessage({id: 'id'}), align: 'left' },
        { id: 'lang_en', label: intl.formatMessage({id: 'english'}), align: 'left' },
        { id: 'lang_zh_hant', label: intl.formatMessage({id: 'traditional-chinese'}), align: 'left' },
        { id: 'lang_zh_hans', label: intl.formatMessage({id: 'simplified-chinese'}), align: 'left' },
        { id: '' },
    ];

    const {
      page,
      order,
      orderBy,
      rowsPerPage,
      setPage,
      //
      onSort,
      onChangePage,
      onChangeRowsPerPage,
    } = useTable();
    
    const { data: tableData = [], error, isLoading, mutate } = useRequest('/api/admin/master-tables');

    const [filterSearch, setFilterSearch] = useState('');

    const dataFiltered = applyFilter({
      inputData: tableData,
      comparator: getComparator(order, orderBy),
      name: selectedType,
      search: filterSearch
    });

    const denseHeight = 72;

    const isError = !!error;

    const isFiltered = filterSearch !== ''
    
    const isNotFound = (!dataFiltered.length && !!filterSearch) || (!isLoading && !dataFiltered.length);

    const handleFilterSearch = (event) => {
        setPage(0);
        setFilterSearch(event.target.value);
    };

    const handleResetFilter = () => {
        setFilterSearch('');
    };

    const handleReload = () => {
        mutate();
    };

    const [openForm, setOpenForm] = useState(false);

    const handleOpenForm = () => {
      setOpenForm(true);
    };
  
    const handleCloseForm = () => {
      setOpenForm(false);
    };
  
    const handleCreateUpdate = (masterData) => {
      setOpenForm(false);
      setSelectedType(masterData.name);
      mutate();
    };

    return (
        <AdminLayout>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                        {intl.formatMessage({id: 'master-tables'})}
                    </Typography>  
                </Box>

                <Box sx={{ flexShrink: 0 }}>                            
                    <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            onClick={handleOpenForm}
                        >
                        {intl.formatMessage({id: 'New Master'})}
                    </Button>
                </Box>
            </Stack>            

            <MasterTableFormDialog 
                types={types} 
                defaultType={selectedType}
                open={openForm} 
                onCancel={handleCloseForm} 
                onCreateUpdateEvent={handleCreateUpdate} />
            
            <Card>
                {((types.length > 0) && !!selectedType) ? (
                    <Tabs
                        value={selectedType}
                        onChange={handleTabChange}
                        sx={{
                            px: 2,
                            bgcolor: 'background.neutral',
                        }}
                    >   
                        {types.map((tab, index) => (
                            <Tab key={index} label={tab.text} value={tab.value} />
                        ))}
                    </Tabs>
                ) : (
                    <Skeleton variant="rectangular" width="100%" height={48} />
                )}

                <Divider />

                <MasterTableToolbar isFiltered={isFiltered} filterSearch={filterSearch} onFilterSearch={handleFilterSearch} onResetFilter={handleResetFilter} />

                <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                    <Table size="medium">
                        <TableHeadCustom
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            onSort={onSort}
                        />

                        <TableBody>
                            {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) =>
                                row ? (
                                  <MasterTableRow
                                      key={index}
                                      row={row}
                                      onDeleteRow={() => handleReload()}
                                      onEditRow={() => handleReload()}
                                  />
                                ) : (
                                  !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                                )
                              )}
    
                            <TableEmptyRows
                                height={denseHeight}
                                emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
                            />
    
                            <TableNoData isNotFound={isNotFound && !isError} />
    
                            <TableError isError={isError} handleReload={handleReload} />
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePaginationCustom
                    count={dataFiltered.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={onChangePage}
                    onRowsPerPageChange={onChangeRowsPerPage}
                />
            </Card>
        </AdminLayout>
    );
};