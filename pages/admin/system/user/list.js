import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../src/routes/paths';
// _mock_
import { _userList } from '../../../../src/_mock/arrays';
// layouts
import AdminLayout from '../../../../src/layouts/admin';
// components
import Iconify from '../../../../src/components/Iconify';
import Scrollbar from '../../../../src/components/Scrollbar';
import ConfirmDialog from '../../../../src/components/confirm-dialog';
import CustomBreadcrumbs from '../../../../src/components/custom-breadcrumbs';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../../src/components/table';
// sections
import { UserTableToolbar, UserTableRow } from '../../../../src/sections/user/list';
// utils
import axios from '../../../../src/utils/axios';
// third-party
import { useIntl } from 'react-intl';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { 'value': 'all', 'lang_en': 'all', 'lang_zh_hant': '全部', 'lang_zh_hans': '全部' },
  { 'value': 'enabled', 'lang_en': 'enabled', 'lang_zh_hant': '啟用', 'lang_zh_hans': '启用' },
  { 'value': 'disabled', 'lang_en': 'disabled', 'lang_zh_hant': '停用', 'lang_zh_hans': '停用' },
];

// const ROLE_OPTIONS = [
//   'all',
//   'admin',
// ];

const optionAll = {
    "idx": -1,
    "value": "all",
    "text": "all",
    "lang_en": "all",
    "lang_zh_hant": "全部",
    "lang_zh_hans": "全部",
    "icon": null
}


// const TABLE_HEAD = [
//   { id: 'name', label: 'Name', align: 'left' },
//   { id: 'company', label: 'Company', align: 'left' },
//   { id: 'role', label: 'Role', align: 'left' },
//   { id: 'isVerified', label: 'Verified', align: 'center' },
//   { id: 'status', label: 'Status', align: 'left' },
//   { id: '' },
// ];



// ----------------------------------------------------------------------

UserListPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// ----------------------------------------------------------------------

export default function UserListPage() {
  const intl = useIntl();

  const TABLE_HEAD = [
    { id: 'full_name', label: intl.formatMessage({id: 'User Manager-FullName'}), align: 'left' },
    { id: 'email', label: intl.formatMessage({id: 'User Manager-Email'}), align: 'left' },
    { id: 'phone', label: intl.formatMessage({id: 'User Manager-Phone'}), align: 'left' },
    { id: 'enabled', label: intl.formatMessage({id: 'User Manager-Enabled'}), align: 'center' },
    { id: 'created_date', label: intl.formatMessage({id: 'User Manager-Create Date'}), align: 'left' },
    { id: '' },
  ];

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { push } = useRouter();

  const [tableData, setTableData] = useState([]);

  const [roleOptions, setRoleOptions] = useState([]);

  const [actionPerformed, setActionPerformed] = useState(false);

  useEffect(() => {
    axios.get('/api/user/all')
    .then((response) => { setTableData(response.data); })
    .catch((error) => { console.log(error); });
  }, [actionPerformed])
  
  useEffect(() => {
    axios.get('/api/user/role/staff')
    .then((response) => { setRoleOptions([optionAll, ...response.data]); })
    .catch((error) => { console.log(error); setRoleOptions([optionAll]) });
  }, [])

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');


  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleItemUpdated = () => {
    setActionPerformed(!actionPerformed);
  }

  const handleDeleteRow = async (id) => {

    await axios.delete('/api/user/staff/' + id)
    .catch((error) => { console.log(error); });

    setSelected([]);
    handleItemUpdated();
    handleCloseConfirm();

    // const deleteRow = tableData.filter((row) => row.id !== id);
    // setSelected([]);
    // setTableData(deleteRow);

    // if (page > 0) {
    //   if (dataInPage.length < 2) {
    //     setPage(page - 1);
    //   }
    // }
  };

  const handleDeleteRows = (selectedRows) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditRow = (id) => {
    // push(PATH_DASHBOARD.user.edit(paramCase(id)));
    push(PATH_DASHBOARD.user.edit(id));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  return (
    <>
      <Head>
      </Head>

      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading={intl.formatMessage({id: 'user-management'})}
          links={[
            { name: intl.formatMessage({id: 'home'}), href: PATH_DASHBOARD.root },
            { name: intl.formatMessage({id: 'User Manager-User'}), href: PATH_DASHBOARD.user.list },
            { name: intl.formatMessage({id: 'User Manager-List'}) },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.user.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {intl.formatMessage({id: 'User Manager-New user'})}
            </Button>
          }
        />

        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab.value} label={intl.locale === 'en' ? tab.lang_en : intl.locale === 'zh-Hant' ? tab.lang_zh_hant : tab.lang_zh_hans}  value={tab.value} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            // optionsRole={ROLE_OPTIONS}
            optionsRole={roleOptions}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.user_id)
                )
              }
              action={
                <Tooltip title={intl.formatMessage({id: 'User Manager-Delete'})}>
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  // onSelectAllRows={(checked) =>
                  //   onSelectAllRows(
                  //     checked,
                  //     tableData.map((row) => row.user_id)
                  //   )
                  // }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row.user_id}
                        row={row}
                        selected={selected.includes(row.user_id)}
                        onSelectRow={() => onSelectRow(row.user_id)}
                        onDeleteRow={() => handleDeleteRow(row.user_id)}
                        onEditRow={() => handleEditRow(row.user_id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={intl.formatMessage({id: 'User Manager-Delete'})}
        content={
          <>
            {intl.formatMessage({id: 'User Manager-Delete Message Start'})} <strong> {selected.length} </strong> {intl.formatMessage({id: 'User Manager-Delete Message End'})}
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            {intl.formatMessage({id: 'User Manager-Delete'})}
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    // inputData = inputData.filter((user) => user.status === filterStatus);
    inputData = inputData.filter((user) => user.enabled === (filterStatus === 'enabled'));
  }

  if (filterRole !== 'all') {
    inputData = inputData.filter((user) => user.role === filterRole);
  }

  return inputData;
}
