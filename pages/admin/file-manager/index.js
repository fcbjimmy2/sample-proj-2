import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from "next/router";

import { useRequest, useResponsive } from '../../../src/hooks';
// next
import Head from 'next/head';
// @mui
import { Stack, Button, Container } from '@mui/material';
// utils
import { fTimestamp } from '../../../src/utils/formatTime';
// components
import Iconify from '../../../src/components/Iconify';
import ConfirmDialog from '../../../src/components/confirm-dialog';
import { fileFormat } from '../../../src/components/file-thumbnail';
import CustomBreadcrumbs from '../../../src/components/custom-breadcrumbs';
import { useTable, getComparator } from '../../../src/components/table';
import DateRangePicker, { useDateRangePicker } from '../../../src/components/date-range-picker';
// sections
import {
  FileListView,
  FileGridView,
  FileFilterType,
  FileFilterTag,
  FileFilterName,
  FileFilterButton,
  FileChangeViewButton,
  FileNewFolderDialog,
} from '/src/sections/file-manager';

// layouts
import AdminLayout from '../../../src/layouts/admin';
import { FilterVintage } from '@mui/icons-material';

// third-party
import { useIntl } from 'react-intl';

// utils
import axios from '../../../src/utils/axios';

// ----------------------------------------------------------------------

const FILE_TYPE_OPTIONS = [
  'folder',
  'txt',
  'zip',
  'audio',
  'image',
  'video',
  'word',
  'excel',
  'powerpoint',
  'pdf',
  'photoshop',
  'illustrator',
];

// ----------------------------------------------------------------------

// FileManagerPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const FileManagerPage = () => {

  const intl = useIntl();

  const table = useTable({ defaultRowsPerPage: 10 });

  const {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    onReset: onResetPicker,
    isSelected: isSelectedValuePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(null, null);

  const [view, setView] = useState('grid'); //list

  const [filterName, setFilterName] = useState('');

  const [tableData, setTableData] = useState([]);
  
  const [userData, setUserData] = useState([]);
  
  const [folderId, setFolderId] = useState('');

  const [actionPerformed, setActionPerformed] = useState(0);

  const [tagList, setTagList] = useState([]);

  useEffect(() => {

    Promise.all([
      axios.get('/api/folders' + (folderId ? `/${folderId}` : '')),
      axios.get('/api/files' + (folderId ? `/${folderId}` : ''))
    ])
    .then(([folders, files]) => { setTableData([...folders.data, ...files.data]) })
    .catch((error) => {console.log(error)});

    // Promise.all([
    //  fetch('/api/folders' + (folderId ? `/${folderId}` : '')),
    //  fetch('/api/files' + (folderId ? `/${folderId}` : ''))
    // ])
    // .then(([resFolders, resFiles]) => Promise.all([resFolders.json(), resFiles.json()]))
    // .then(([folders, files]) => {  setTableData([...folders, ...files]) }) //setTableData([...folders, ...files]);
    // .catch((error) => { console.log(error); })
  }, [folderId, actionPerformed, view])
  
  useEffect(() => {

    axios.get('/api/user/all')
    .then((response) => { setUserData(response.data); })
    .catch((error) => { console.log(error); });

    //  fetch('/api/user/all')
    // .then(result => result.json())
    // .then(userData => setUserData(userData))
    // .catch((error) => { console.log(error); })
  }, [])
  
  useEffect(() => {
    axios.get('/api/files/tag')
    .then((response) => { setTagList(response.data); })
    .catch((error) => { console.log(error); });

    //  fetch('/api/files/tag')
    // .then(result => result.json())
    // .then(tags => setTagList(tags))
    // .catch((error) => { console.log(error); })
  }, [])
  
  const [filterType, setFilterType] = useState([]);
  
  const [filterTag, setFilterTag] = useState([]);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [folderName, setFolderName] = useState('');

  const [openUploadFile, setOpenUploadFile] = useState(false);

  const [openNewFolder, setOpenNewFolder] = useState(false);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
    filterType,
    filterTag,
    filterStartDate: startDate,
    filterEndDate: endDate,
    isError: !!isError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterType) ||
    (!dataFiltered.length && !!filterTag) ||
    (!dataFiltered.length && !!endDate && !!startDate);

  const isFiltered = !!filterName || !!filterType.length || !!filterTag.length || (!!startDate && !!endDate);

  const handleChangeFolder = (id) => {
    // console.log(id);
    setFolderId(id);
  }

  const handleChangeView = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleFilterName = (event) => {
    table.setPage(0);
    setFilterName(event.target.value);
  };

  const handleChangeStartDate = (newValue) => {
    table.setPage(0);
    onChangeStartDate(newValue);
  };

  const handleChangeEndDate = (newValue) => {
    table.setPage(0);
    onChangeEndDate(newValue);
  };

  const handleFilterType = (type) => {
    const checked = filterType.includes(type)
      ? filterType.filter((value) => value !== type)
      : [...filterType, type];

    table.setPage(0);
    setFilterType(checked);
  };


  const handleFilterTag = (tag) => {
    const checked = filterTag.includes(tag)
      ? filterTag.filter((value) => value !== tag)
      : [...filterTag, tag];

    table.setPage(0);
    setFilterTag(checked);
  };

  const handleDeleteItem = async (id) => {

    const isFolder = id.includes("folder");
    // var requestOptions = {
    //   method: 'DELETE',
    // };

    // const response = await fetch("/api/" + (isFolder ? "folders" : "files") + "/" + id, requestOptions)
    //   .then(response => response.json())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

    await axios.delete("/api/" + (isFolder ? "folders" : "files") + "/" + id)
    .catch((error) => { console.log(error); });

    handleItemUpdated();

    setOpenConfirm(false);
  };

  const handleDeleteItems = (selected) => {
    var deletedItems = [];
    selected.forEach(async (item) => {
      // console.log(item);
      deletedItems.push(await handleDeleteItem(item));
    })
    const { page, rowsPerPage, setPage, setSelected } = table;
    setSelected([]);
    handleItemUpdated();
    setOpenConfirm(false);

  };

  const handleClearAll = () => {
    if (onResetPicker) {
      onResetPicker();
    }
    setFilterName('');
    setFilterType([]);
    setFilterTag([]);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };

  const handleCloseUploadFile = () => {
    // handleChangeFolder(folderId);
    handleItemUpdated();
    setOpenUploadFile(false);
  };
  
  const handleOpenNewFolder = () => {
    setFolderName('');
    setOpenNewFolder(true);
  };

  const handleCloseNewFolder = () => {
    // handleChangeFolder(folderId);
    handleItemUpdated();
    setOpenNewFolder(false);
  };

  const handleItemUpdated = () => {
    setActionPerformed(Math.random);
  }

  return (
    <>
      <Head>
        {/* <title> {intl.formatMessage({id: 'File Manager'})} </title> */}
      </Head>

      <Container maxWidth='lg'>
        <CustomBreadcrumbs
          heading={intl.formatMessage({id: 'File Manager'})}
          links={[
            {
              name: intl.formatMessage({id: 'home'}),
              href: '/admin',
            },
            { 
              name: intl.formatMessage({id: 'File Manager'}),
            },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:cloud-upload-fill" />}
              onClick={handleOpenUploadFile}
            >
              {intl.formatMessage({id: 'upload'})}
            </Button>
          }
          action2={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:cloud-upload-fill" />}
              onClick={handleOpenNewFolder}
            >
              {intl.formatMessage({id: 'File Manager-Create Folder'})}
            </Button>
          }
        />

        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-end', md: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Stack
            spacing={1}
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ md: 'center' }}
            sx={{ width: 1 }}
          >
            <FileFilterName filterName={filterName} onFilterName={handleFilterName} />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <>
                <FileFilterButton
                  isSelected={!!isSelectedValuePicker}
                  startIcon={<Iconify icon="eva:calendar-fill" />}
                  onClick={onOpenPicker}
                >
                  {isSelectedValuePicker ? shortLabel : intl.formatMessage({id: 'File Manager-Select Date'})}
                </FileFilterButton>

                <DateRangePicker
                  variant="calendar"
                  title={intl.formatMessage({id: 'File Manager-Select Date Range'})}
                  startDate={startDate}
                  endDate={endDate}
                  onChangeStartDate={handleChangeStartDate}
                  onChangeEndDate={handleChangeEndDate}
                  open={openPicker}
                  onClose={onClosePicker}
                  isSelected={isSelectedValuePicker}
                  isError={isError}
                />
              </>

              <FileFilterType
                filterType={filterType}
                onFilterType={handleFilterType}
                optionsType={FILE_TYPE_OPTIONS}
                onReset={() => setFilterType([])}
              />
              
              <FileFilterTag
                filterType={filterTag}
                onFilterType={handleFilterTag}
                optionsType={tagList}
                onReset={() => setFilterTag([])}
              />

              {isFiltered && (
                <Button
                  variant="soft"
                  color="error"
                  onClick={handleClearAll}
                  startIcon={<Iconify icon="eva:trash-2-outline" />}
                >
                  {intl.formatMessage({id: 'File Manager-Clear'})}
                </Button>
              )}
            </Stack>
          </Stack>

          <FileChangeViewButton value={view} onChange={handleChangeView} />
        </Stack>

        {view === 'list' ? (
          <FileListView
            table={table}
            tableData={tableData}
            userData={userData}
            dataFiltered={dataFiltered}
            onDeleteRow={handleDeleteItem}
            isNotFound={isNotFound}
            onOpenConfirm={handleOpenConfirm}
            onChangeFolder={handleChangeFolder}
            folderId={folderId}
            tagList={tagList}
          />
        ) : (
          <FileGridView
            table={table}
            data={tableData}
            userData={userData}
            dataFiltered={dataFiltered}
            onDeleteItem={handleDeleteItem}
            onOpenConfirm={handleOpenConfirm}
            onChangeFolder={handleChangeFolder}
            folderId={folderId}
            tagList={tagList}
          />
        )}
      </Container>


      <FileNewFolderDialog 
        open={openUploadFile} 
        buttonText={intl.formatMessage({id: 'upload'})}
        title={intl.formatMessage({id: 'File Manager-Upload Files'})} 
        onClose={handleCloseUploadFile} 
        folderId={folderId} 
      />

      <FileNewFolderDialog
        open={openNewFolder}
        buttonText={intl.formatMessage({id: 'upload'})}
        onClose={handleCloseNewFolder}
        title={intl.formatMessage({id: 'File Manager-New Folder'})}
        onCreate={() => {
          handleCloseNewFolder();
          setFolderName('');
        }}
        folderName={folderName}
        folderId={folderId}
        onChangeFolderName={(event) => setFolderName(event.target.value)}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            {intl.formatMessage({id: 'File Manager-Delete Message Start'})} <strong> {table.selected.length} </strong> {intl.formatMessage({id: 'File Manager-Delete Message End'})} 
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteItems(table.selected);
              handleCloseConfirm();
            }}
          >
            {intl.formatMessage({id: 'delete'})} 
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterType,
  filterTag,
  filterStartDate,
  filterEndDate,
  isError,
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (file) => file.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterType.length) {
    inputData = inputData.filter((file) => filterType.includes(fileFormat(file.type)));
  }

  if (filterTag.length) {
    inputData = inputData.filter((file) => (filterTag??[]).some((ft) => file.tags.includes(ft)));
  }

  if (filterStartDate && filterEndDate && !isError) {
    inputData = inputData.filter(
      (file) =>
        fTimestamp(file.dateCreated) >= fTimestamp(filterStartDate) &&
        fTimestamp(file.dateCreated) <= fTimestamp(filterEndDate)
    );
  }

  return inputData;
}

export default FileManagerPage;

FileManagerPage.getLayout = function getLayout(page) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    );
};