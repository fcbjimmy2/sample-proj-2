import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
// @mui
import { Collapse, Box, Divider, Button } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
//
import FilePanel from '../FilePanel';
import FileCard from '../item/FileCard';
import FileFolderCard from '../item/FileFolderCard';
import FileShareDialog from '../portal/FileShareDialog';
import FileActionSelected from '../portal/FileActionSelected';
import FileNewFolderDialog from '../portal/FileNewFolderDialog';

// third-party
import { useIntl } from 'react-intl';
// ----------------------------------------------------------------------

FileGridView.propTypes = {
  data: PropTypes.array,
  table: PropTypes.object,
  onDeleteItem: PropTypes.func,
  dataFiltered: PropTypes.array,
  onOpenConfirm: PropTypes.func,
  onChangeFolder: PropTypes.func,
  folderId: PropTypes.string,
  userData: PropTypes.array,
  tagList: PropTypes.array,
};

export default function FileGridView({ table, data, dataFiltered, onDeleteItem, onOpenConfirm, onChangeFolder, folderId, userData, tagList }) {
  const intl = useIntl();

  const { selected, onSelectRow: onSelectItem, onSelectAllRows: onSelectAllItems } = table;

  const containerRef = useRef(null);

  const [folderName, setFolderName] = useState('');

  const [shareto, setShareto] = useState('');

  const [openShare, setOpenShare] = useState(false);

  const [collapseFiles, setCollapseFiles] = useState(false);

  const [openNewFolder, setOpenNewFolder] = useState(false);

  const [openUploadFile, setOpenUploadFile] = useState(false);

  const [collapseFolders, setCollapseFolders] = useState(false);

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleOpenNewFolder = () => {
    setFolderName('');
    setOpenNewFolder(true);
  };

  const handleCloseNewFolder = () => {
    setOpenNewFolder(false);
  };

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

  const handleChangeInvite = (event) => {
    setShareto(event.target.value);
  };

  return (
    <>
      <Box ref={containerRef}>
        <FilePanel
          title={intl.formatMessage({id: 'File Manager-FoldersHeader'})}
          subTitle={`${data.filter((item) => item.type === 'folder').length} ${intl.formatMessage({id: 'File Manager-Folders'})}`}
          // onOpen={handleOpenNewFolder}
          collapse={collapseFolders}
          onCollapse={() => setCollapseFolders(!collapseFolders)}
        />

        <Collapse in={!collapseFolders} unmountOnExit>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
          >
            {dataFiltered
              .filter((i) => i.type === 'folder')
              .map((folder) => (
                <FileFolderCard
                  key={folder.id}
                  userData={userData}
                  tagList={tagList}
                  folder={folder}
                  selected={selected.includes(folder.id)}
                  onSelect={() => onSelectItem(folder.id)}
                  onDelete={() => onDeleteItem(folder.id)}
                  onChangeFolder={() => onChangeFolder(folder.id.split('_')[0])}
                  folderId={folderId}
                  sx={{ maxWidth: 'auto' }}
                />
              ))}
          </Box>
        </Collapse>

        <Divider sx={{ my: 5, borderStyle: 'dashed' }} />

        <FilePanel
          title={intl.formatMessage({id: 'File Manager-FilesHeader'})}
          subTitle={`${data.filter((item) => item.type !== 'folder').length} ${intl.formatMessage({id: 'File Manager-Files'})}`}
          // onOpen={handleOpenUploadFile}
          collapse={collapseFiles}
          onCollapse={() => setCollapseFiles(!collapseFiles)}
        />

        <Collapse in={!collapseFiles} unmountOnExit>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={3}
          >
            {dataFiltered
              .filter((i) => i.type !== 'folder')
              .map((file) => (
                <FileCard
                  key={file.id}
                  userData={userData}
                  tagList={tagList}
                  file={file}
                  selected={selected.includes(file.id)}
                  onSelect={() => onSelectItem(file.id)}
                  onDelete={() => onDeleteItem(file.id)}
                  sx={{ maxWidth: 'auto' }}
                />
              ))}
          </Box>
        </Collapse>

        {!!selected?.length && (
          <FileActionSelected
            numSelected={selected.length}
            rowCount={data.length}
            selected={selected}
            onSelectAllItems={(checked) =>
              onSelectAllItems(
                checked,
                data.map((row) => row.id)
              )
            }
            action={
              <>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  startIcon={<Iconify icon="eva:trash-2-outline" />}
                  onClick={onOpenConfirm}
                  sx={{ mr: 1 }}
                >
                  {intl.formatMessage({id: 'File Manager-Delete'})}
                </Button>

                <Button
                  color="inherit"
                  size="small"
                  variant="contained"
                  startIcon={<Iconify icon="eva:share-fill" />}
                  onClick={handleOpenShare}
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'grey.800' : 'common.white',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    '&:hover': {
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'grey.800' : 'common.white',
                      bgcolor: (theme) =>
                        theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    },
                  }}
                >
                  {intl.formatMessage({id: 'File Manager-Share'})}
                </Button>
              </>
            }
          />
        )}
      </Box>

      <FileShareDialog
        userData={userData}
        open={openShare}
        onChangeInvite={handleChangeInvite}
        isMultipleItems = {true}
        selectedItems={selected}
        onClose={() => {
          handleCloseShare();
          setShareto('');
        }}
      />

      <FileNewFolderDialog open={openUploadFile} folderId={folderId} onClose={handleCloseUploadFile} />

      <FileNewFolderDialog
        open={openNewFolder}
        onClose={handleCloseNewFolder}
        title="New Folder"
        onCreate={() => {
          handleCloseNewFolder();
          setFolderName('');
          // console.log('CREATE NEW FOLDER', folderName);
        }}
        folderName={folderName}
        folderId={folderId}
        onChangeFolderName={(event) => setFolderName(event.target.value)}
      />
    </>
  );
}
