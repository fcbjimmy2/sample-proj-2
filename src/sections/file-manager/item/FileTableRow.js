import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import {
  Stack,
  Avatar,
  Button,
  Divider,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  AvatarGroup,
} from '@mui/material';
// hooks
import useDoubleClick from '../../../hooks/useDoubleClick';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
// utils
import { fDate } from '../../../utils/formatTime';
import { fData } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/menu-popover';
import { useSnackbar } from '../../../components/snackbar';
import ConfirmDialog from '../../../components/confirm-dialog';
import FileThumbnail from '../../../components/file-thumbnail';
//
import FileShareDialog from '../portal/FileShareDialog';
import FileDetailsDrawer from '../portal/FileDetailsDrawer';

// third-party
import { useIntl } from 'react-intl';
// ----------------------------------------------------------------------

FileTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onChangeFolder: PropTypes.func,
  folderId: PropTypes.string,
  userData: PropTypes.array,
  tagList: PropTypes.array,
};

export default function FileTableRow({ row, selected, onSelectRow, onDeleteRow, onChangeFolder, folderId, userData, tagList }) {
  const intl = useIntl();

  const { id, name, size, type, dateModified, shared, sharedLink, isFavorited, totalFolders, totalFiles } = row;

  // added to handle update share box 
  const [sharedList, setSharedList] = useState(shared);

  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  // const [inviteEmail, setInviteEmail] = useState('');
  const [shareto, setShareto] = useState('');

  const [openShare, setOpenShare] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [favorited, setFavorited] = useState(isFavorited);

  const [openPopover, setOpenPopover] = useState(null);

  const [visibility, setVisibility] = useState(name !== '...')

  const handleFavorite = () => {
    setFavorited(!favorited);
  };

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
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

  const handleClick = useDoubleClick({
    click: () => {
      if(visibility)
        handleOpenDetails();
    },
    doubleClick: () => handleDoubleClick(),
  });

  const handleDoubleClick = () => {
    const isFolder = id.includes("folder");
    if(isFolder)
    {
      onChangeFolder(); //window.location.pathname + 
    }
    else
    {
      handleOpenDocument();
      // console.log(id);
    }
  };

  const handleCopy = () => {
    enqueueSnackbar('Copied!');
    copy(row.url);
  };
  
  const handleOpenDocument = () => {
    window.open(sharedLink, "_blank", "noreferrer");
  };

  return (
    <>
      <TableRow
        sx={{
          borderRadius: 1,
          '& .MuiTableCell-root': {
            bgcolor: 'background.default',
          },
          ...(openDetails && {
            '& .MuiTableCell-root': {
              color: 'text.primary',
              typography: 'subtitle2',
              bgcolor: 'background.default',
            },
          }),
        }}
      >
        <TableCell
          padding="checkbox"
          sx={{
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
        >
          <Checkbox
            checked={selected}
            // onDoubleClick={() => console.log('ON DOUBLE CLICK')}
            onClick={onSelectRow}
          />
        </TableCell>

        <TableCell onClick={handleClick}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FileThumbnail file={type} />

            <Typography noWrap variant="inherit" sx={{ maxWidth: 360, cursor: 'pointer' }}>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell
          align="left"
          onClick={handleClick}
          sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
        >
          {fData(size)}
        </TableCell>

        <TableCell
          align="center"
          onClick={handleClick}
          sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
        >
          {type}
        </TableCell>

        <TableCell
          align="left"
          onClick={handleClick}
          sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
        >
          {fDate(dateModified)}
        </TableCell>

        <TableCell align="right" onClick={handleClick}>
          <AvatarGroup
            max={4}
            sx={{
              '& .MuiAvatarGroup-avatar': {
                width: 24,
                height: 24,
                '&:first-of-type': {
                  fontSize: 12,
                },
              },
            }}
          >
            {sharedList &&
              sharedList.map((person) => (
                <Avatar key={person.user_id} alt={person.user_name} src={person.avatar} />
              ))}
          </AvatarGroup>
        </TableCell>

        <TableCell
          align="right"
          sx={{
            whiteSpace: 'nowrap',
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          
          { visibility ? (
          <Checkbox
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorited}
            onChange={handleFavorite}
            sx={{ p: 0.75 }}
          />
          )
          : <></>}

          { visibility ? (
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
          )
          : <></>}
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        {/* <MenuItem
          onClick={() => {
            handleClosePopover();
            handleOpenDocument();
          }}
        >
          <Iconify icon="eva:book-open-outline" />
          Open
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

        <MenuItem disabled={totalFolders > 0 || totalFiles > 0}
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
        item={row}
        userData={userData}
        tagList={tagList}
        favorited={favorited}
        onFavorite={handleFavorite}
        onCopyLink={handleCopy}
        open={openDetails}
        onClose={handleCloseDetails}
        onDelete={onDeleteRow}
        sharedList={sharedList}
        setSharedList={setSharedList}
      />

      <FileShareDialog
        id={id}
        userData={userData}
        open={openShare}
        sharedList={sharedList}
        setSharedList={setSharedList}
        onClose={() => {
          handleCloseShare();
          setShareto('');
        }}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={intl.formatMessage({id: 'File Manager-Delete'})}
        content={intl.formatMessage({id: 'File Manager-Delete-Message'})}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {intl.formatMessage({id: 'File Manager-Delete'})}
          </Button>
        }
      />
    </>
  );
}