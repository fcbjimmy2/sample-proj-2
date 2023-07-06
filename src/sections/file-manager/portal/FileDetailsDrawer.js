import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Box,
  Chip,
  List,
  Stack,
  Drawer,
  Button,
  Divider,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
} from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
import { fDateTime } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import FileThumbnail, { fileFormat } from '../../../components/file-thumbnail';
//
import FileShareDialog from './FileShareDialog';
import FileInvitedItem from '../FileInvitedItem';
// third-party
import { useIntl } from 'react-intl';

// utils
import axios from '../../../../src/utils/axios';

// ----------------------------------------------------------------------

FileDetailsDrawer.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  favorited: PropTypes.bool,
  onCopyLink: PropTypes.func,
  onFavorite: PropTypes.func,
  userData: PropTypes.array,
  tagList: PropTypes.array,
  sharedList: PropTypes.array,
  setSharedList: PropTypes.func,
};

export default function FileDetailsDrawer({
  item,
  open,
  favorited,
  //
  onFavorite,
  onCopyLink,
  onClose,
  onDelete,
  userData,
  tagList,
  sharedList,
  setSharedList,
  ...other
}) {
  const intl = useIntl();

  const { id, name, size, url, type, shared, dateModified } = item;

  // added to handle update share box 
  // const [sharedList, setSharedList] = useState(shared);

  const hasShared = sharedList && !!sharedList.length;

  const [openShare, setOpenShare] = useState(false);

  const [toggleTags, setToggleTags] = useState(true);

  // const [inviteEmail, setInviteEmail] = useState('');
  const [shareto, setShareto] = useState('');

  const [tags, setTags] = useState(item.tags.slice(0, 3));

  const [toggleProperties, setToggleProperties] = useState(true);


  const handleToggleTags = () => {
    setToggleTags(!toggleTags);
  };

  const handleToggleProperties = () => {
    setToggleProperties(!toggleProperties);
  };

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleChangeInvite = (event) => {
    setShareto(event.target.value);
  };

  const handleUpdateTag = async (tags) => {
    
    const isFolder = id.includes("folder");
    var raw = JSON.stringify({
      "id": id.split('_')[0],
      "tags": tags
    });

    await axios.post("/api/" + (isFolder ? "folders" : "files") + "/tag", raw, { headers: {'Content-Type': 'application/json'} })
    .then((response) => { setTags(response.data); })
    .catch((error) => { console.log(error); });

    // var requestOptions = {
    //   method: 'POST',
    //   body: raw,
    // };

    // const response = await fetch("/api/" + (isFolder ? "folders" : "files") + "/tag", requestOptions)
    //   .then(response => response.json())
    //   .then(result => setTags(result))
    //   .catch(error => console.log('error', error));
  }

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          sx: { width: 320 },
        }}
        {...other}
      >
        <Scrollbar sx={{ height: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
            <Typography variant="h6"> {intl.formatMessage({id: 'File Manager-Info'})} </Typography>

            <Checkbox
              color="warning"
              icon={<Iconify icon="eva:star-outline" />}
              checkedIcon={<Iconify icon="eva:star-fill" />}
              checked={favorited}
              onChange={onFavorite}
              sx={{ p: 0.75 }}
            />
          </Stack>

          <Stack
            spacing={2.5}
            justifyContent="center"
            sx={{ p: 2.5, bgcolor: 'background.neutral' }}
          >
            <FileThumbnail
              imageView
              file={type === 'folder' ? type : url}
              sx={{ width: 64, height: 64 }}
              imgSx={{ borderRadius: 1 }}
            />

            <Typography variant="h6" sx={{ wordBreak: 'break-all' }}>
              {name}
            </Typography>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack spacing={1}>
              <Panel label={intl.formatMessage({id: 'File Manager-Tags'})} toggle={toggleTags} onToggle={handleToggleTags} />

              {toggleTags && (
                <Autocomplete
                  multiple
                  freeSolo
                  limitTags={2}
                  // options={item.tags.map((option) => option)}
                  options={tagList.map((option) => option)}
                  value={tags}
                  onChange={(event, newValue) => {
                    handleUpdateTag(newValue);
                    // setTags([...tags, ...newValue.filter((option) => tags.indexOf(option) === -1)]);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        size="small"
                        variant="soft"
                        label={option}
                        key={option}
                      />
                    ))
                  }
                  renderInput={(params) => <TextField {...params} placeholder="#Add a tags" />}
                />
              )}
            </Stack>

            <Stack spacing={1.5}>
              <Panel
                label={intl.formatMessage({id: 'File Manager-Properties'})}
                toggle={toggleProperties}
                onToggle={handleToggleProperties}
              />

              {toggleProperties && (
                <Stack spacing={1.5}>
                  <Row label={intl.formatMessage({id: 'File Manager-Cols-Size'})} value={fData(size)} />

                  <Row label={intl.formatMessage({id: 'File Manager-Cols-Modified'})} value={fDateTime(dateModified)} />

                  <Row label={intl.formatMessage({id: 'File Manager-Cols-Type'})} value={fileFormat(type)} />
                </Stack>
              )}
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
            <Typography variant="subtitle2"> {intl.formatMessage({id: 'File Manager-File Share With'})} </Typography>

            <IconButton
              size="small"
              color="success"
              onClick={handleOpenShare}
              sx={{
                p: 0,
                width: 24,
                height: 24,
                color: 'common.white',
                bgcolor: 'success.main',
                '&:hover': {
                  bgcolor: 'success.main',
                },
              }}
            >
              <Iconify icon="eva:plus-fill" />
            </IconButton>
          </Stack>

          {hasShared && (
            <List disablePadding sx={{ pl: 2.5, pr: 1 }}>
              {sharedList.map((person) => (
                <FileInvitedItem key={person.user_id} person={person} setSharedList={setSharedList} />
              ))}
            </List>
          )}
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <Button disabled={item.totalFolders > 0 || item.totalFiles > 0}
            fullWidth
            variant="soft"
            color="error"
            size="large"
            startIcon={<Iconify icon="eva:trash-2-outline" />}
            onClick={onDelete}
          >
            {intl.formatMessage({id: 'File Manager-Delete'})}
          </Button>
        </Box>
      </Drawer>
      
      <FileShareDialog
        id={id}
        userData={userData}
        open={openShare}
        sharedList={sharedList}
        setSharedList={setSharedList}
        onChangeInvite={handleChangeInvite}
        onClose={() => {
          handleCloseShare();
          setShareto('');
        }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

Panel.propTypes = {
  toggle: PropTypes.bool,
  label: PropTypes.string,
  onToggle: PropTypes.func,
};

function Panel({ label, toggle, onToggle, ...other }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" {...other}>
      <Typography variant="subtitle2"> {label} </Typography>

      <IconButton size="small" onClick={onToggle}>
        <Iconify icon={toggle ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
      </IconButton>
    </Stack>
  );
}

// ----------------------------------------------------------------------

Row.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

function Row({ label, value = '' }) {
  return (
    <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
      <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
        {label}
      </Box>

      {value}
    </Stack>
  );
}
