import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Card, Stack, Button, Divider, MenuItem, Checkbox, IconButton } from '@mui/material';
// hooks
import useDoubleClick from '../../../hooks/useDoubleClick';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
// utils
import { fData } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/menu-popover';
import TextMaxLine from '../../../components/text-max-line';
import { useSnackbar } from '../../../components/snackbar';
import ConfirmDialog from '../../../components/confirm-dialog';
//
import FileShareDialog from '../portal/FileShareDialog';
import FileDetailsDrawer from '../portal/FileDetailsDrawer';
import FileNewFolderDialog from '../portal/FileNewFolderDialog';
// third-party
import { useIntl } from 'react-intl';
// ----------------------------------------------------------------------

FileFolderCard.propTypes = {
  sx: PropTypes.object,
  folder: PropTypes.object,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
  onChangeFolder: PropTypes.func,
  folderId: PropTypes.string,
  userData: PropTypes.array,
  tagList: PropTypes.array,
};

export default function FileFolderCard({ folder, selected, onSelect, onDelete, sx, onChangeFolder, folderId, userData, tagList, ...other }) {
  const intl = useIntl();

  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  // const [inviteEmail, setInviteEmail] = useState('');
  const [shareto, setShareto] = useState('');

  const [showCheckbox, setShowCheckbox] = useState(false);

  const [openShare, setOpenShare] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const [folderName, setFolderName] = useState(folder.name);

  const [openEditFolder, setOpenEditFolder] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const [favorited, setFavorited] = useState(folder.isFavorited);

  const [visibility, setVisibility] = useState(folder.name !== '...')

  // added to handle update share box 
  const [sharedList, setSharedList] = useState(folder.shared);
  
  const handleClick = useDoubleClick({
    click: () => {
      if(visibility)
        handleOpenDetails();
    },
    doubleClick: () => handleDoubleClick(),
  });
  
  const handleDoubleClick = () => {
    // const ids = folder.id.split('_');
    const isFolder = folder.id.includes("folder");
    if(isFolder)
    {
      onChangeFolder(); //window.location.pathname + 
    }
    else
    {
      // console.log(id);
    }
  };

  const handleFavorite = () => {
    setFavorited(!favorited);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleShowCheckbox = () => {
    if(visibility)
      setShowCheckbox(true);
  };

  const handleHideCheckbox = () => {
    setShowCheckbox(false);
  };

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleOpenEditFolder = () => {
    setOpenEditFolder(true);
  };

  const handleCloseEditFolder = () => {
    setOpenEditFolder(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangeInvite = (event) => {
    setShareto(event.target.value);
  };

  const handleCopy = () => {
    enqueueSnackbar('Copied!');
    copy(folder.url);
  };

  return (
    <>
      <Card
        onMouseEnter={handleShowCheckbox}
        onMouseLeave={handleHideCheckbox}
        sx={{
          p: 2.5,
          width: 1,
          maxWidth: 222,
          boxShadow: 0,
          bgcolor: 'background.default',
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          ...((showCheckbox || selected) && {
            borderColor: 'transparent',
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          }),
          ...sx,
        }}
        {...other}
      >
        <Stack direction="row" alignItems="center" sx={{ top: 8, right: 8, position: 'absolute' }}>
          {/* <Checkbox
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorited}
            onChange={handleFavorite}
            sx={{ p: 0.75 }}
          /> */}


          { visibility ? (
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
          )
          : <></>}
        </Stack>

        {(showCheckbox || selected) && onSelect ? (
          <Checkbox
            checked={selected}
            onClick={onSelect}
            icon={<Iconify icon="eva:radio-button-off-fill" />}
            checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
          />
        ) : (
          <Box
            component="img"
            src="/assets/icons/files/ic_folder.svg"
            sx={{ width: 40, height: 40 }}
          />
        )}
{/* handleOpenDetails */}
        <TextMaxLine variant="h6" onClick={handleClick} sx={{ mt: 1, mb: 0.5 }}> 
          {folder.name}
        </TextMaxLine>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{ typography: 'caption', color: 'text.disabled' }}
        >
          {/* {fData(folder.size)} */}
          <Box> {folder.totalFolders} {intl.formatMessage({id: 'File Manager-Folders'})} </Box>

          <Box sx={{ width: 2, height: 2, borderRadius: '50%', bgcolor: 'currentColor' }} />

          <Box> {folder.totalFiles} {intl.formatMessage({id: 'File Manager-Files'})} </Box>
        </Stack>
      </Card>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >

        <MenuItem
          onClick={() => {
            handleClosePopover();
            handleOpenShare();
          }}
        >
          <Iconify icon="eva:share-fill" />
          {intl.formatMessage({id: 'File Manager-Share'})}
        </MenuItem>

        {/* <MenuItem
          onClick={() => {
            handleClosePopover();
            handleOpenEditFolder();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem disabled={folder.totalFolders > 0 || folder.totalFiles > 0}
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          {intl.formatMessage({id: 'File Manager-Delete'})}
        </MenuItem>
      </MenuPopover>

      <FileDetailsDrawer
        item={folder}
        userData={userData}
        tagList={tagList}
        favorited={favorited}
        onFavorite={handleFavorite}
        onCopyLink={handleCopy}
        open={openDetails}
        onClose={handleCloseDetails}
        onDelete={() => {
          handleCloseDetails();
          onDelete();
        }}
        sharedList={sharedList}
        setSharedList={setSharedList}
      />

      <FileShareDialog
        id={folder.id}
        userData={userData}
        open={openShare}
        // shared={folder.shared}
        sharedList={sharedList}
        setSharedList={setSharedList}
        onChangeInvite={handleChangeInvite}
        // onCopyLink={handleCopy}
        onClose={() => {
          handleCloseShare();
          setShareto('');
        }}
      />

      <FileNewFolderDialog
        open={openEditFolder}
        onClose={handleCloseEditFolder}
        title="Edit Folder"
        onUpdate={() => {
          handleCloseEditFolder();
          setFolderName(folderName);
          // console.log('UPDATE FOLDER', folderName);
        }}
        folderName={folderName}
        onChangeFolderName={(event) => setFolderName(event.target.value)}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={intl.formatMessage({id: 'File Manager-Delete'})}
        content={intl.formatMessage({id: 'File Manager-Delete-Message'})}
        action={
          <Button variant="contained" color="error" onClick={onDelete}>
            {intl.formatMessage({id: 'File Manager-Delete'})}
          </Button>
        }
      />
    </>
  );
}