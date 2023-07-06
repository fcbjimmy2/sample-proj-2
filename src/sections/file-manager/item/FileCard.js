import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Card, Stack, Button, Divider, MenuItem, Checkbox, IconButton } from '@mui/material';
// hooks
import useDoubleClick from '../../../hooks/useDoubleClick';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
// utils
import { fDateTime } from '../../../utils/formatTime';
import { fData } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/menu-popover';
import { useSnackbar } from '../../../components/snackbar';
import TextMaxLine from '../../../components/text-max-line';
import FileThumbnail from '../../../components/file-thumbnail';
import ConfirmDialog from '../../../components/confirm-dialog';
//
import FileShareDialog from '../portal/FileShareDialog';
import FileDetailsDrawer from '../portal/FileDetailsDrawer';
// third-party
import { useIntl } from 'react-intl';

import Cookies from 'universal-cookie';

// auth
import { useAuthContext } from '../../../auth/useAuthContext';


// ----------------------------------------------------------------------

FileCard.propTypes = {
  sx: PropTypes.object,
  file: PropTypes.object,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
  userData: PropTypes.array,
  tagList: PropTypes.array,
};

export default function FileCard({ file, selected, onSelect, onDelete, userData, tagList, sx, ...other }) {
  
  const { user } = useAuthContext();
  
  const intl = useIntl();

  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  // const [inviteEmail, setInviteEmail] = useState('');
  const [shareto, setShareto] = useState('');

  const [showCheckbox, setShowCheckbox] = useState(false);

  const [openShare, setOpenShare] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const [favorited, setFavorited] = useState(file.isFavorited);

  const [openPopover, setOpenPopover] = useState(null);

  // added to handle update share box 
  const [sharedList, setSharedList] = useState(file.shared);

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
    copy(file.url);
  };

  
  const handleClick = useDoubleClick({
    click: () => {
      handleOpenDetails();
    },
    doubleClick: () => handleDoubleClick(),
  });
  
  const handleDoubleClick = () => {
    // const ids = folder.id.split('_');
    handleOpenDocument();
  };
  
  const handleOpenDocument = async () => {
    
    const cookies = new Cookies();

    // only work on prod / deployed server, not work in localhost
    cookies.set('asc_auth_key', user.onlyoffice_token,
      { path: '/', domain: '.apex.hk' });

    window.open(file.sharedLink, "_blank", "noreferrer");
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
        {(showCheckbox || selected) && onSelect ? (
          <Checkbox
            checked={selected}
            onClick={onSelect}
            icon={<Iconify icon="eva:radio-button-off-fill" />}
            checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
          />
        ) : (
          <FileThumbnail file={file.type} sx={{ width: 40, height: 40 }} />
        )}

        <TextMaxLine
          variant="subtitle2"
          persistent
          // onClick={handleOpenDetails}
          onClick={handleClick}
          sx={{ mt: 2, mb: 0.5 }}
        >
          {file.name}
        </TextMaxLine>

        <Stack
          spacing={0.75}
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled', mt: 0.5 }}
        >
          <Box> {fData(file.size)} </Box>

          <Box sx={{ width: 2, height: 2, borderRadius: '50%', bgcolor: 'currentColor' }} />

          <Box> {fDateTime(file.dateModified)} </Box>
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ top: 8, right: 8, position: 'absolute' }}>
          <Checkbox
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorited}
            onChange={handleFavorite}
            sx={{ p: 0.75 }}
          />

          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Card>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        {/* <MenuItem
          onClick={() => {
            handleClosePopover();
            handleCopy();
          }}
        >
          <Iconify icon="eva:link-2-fill" />
          Copy Link
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            handleClosePopover();
            handleOpenShare();
          }}
        >
          <Iconify icon="eva:share-fill" />
          {intl.formatMessage({id: 'File Manager-Share'})}
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
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
        item={file}
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
        id={file.id}
        userData={userData}
        open={openShare}
        // shared={file.shared}
        onChangeInvite={handleChangeInvite}
        // onCopyLink={handleCopy}
        onClose={() => {
          handleCloseShare();
          setShareto('');
        }}
        sharedList={sharedList}
        setSharedList={setSharedList}
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