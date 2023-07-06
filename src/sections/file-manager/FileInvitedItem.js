import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Avatar,
  Button,
  Divider,
  Tooltip,
  ListItem,
  MenuItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/menu-popover';

// utils
import axios from '../../../src/utils/axios';

// ----------------------------------------------------------------------

FileInvitedItem.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    permission: PropTypes.string,
  }),
  setSharedList: PropTypes.func,
};

export default function FileInvitedItem({ person, setSharedList }) {
  const [permission, setPermission] = useState(person.permission);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangePermission = (newPermission) => {
    setPermission(newPermission);
    handleChangeAccess(newPermission);
  };

  const handleDelete = () => {
    handleChangeAccess('delete');
  };
  
  const handleChangeAccess = async (permission) => {
    
    var raw = JSON.stringify({
      "combined_id": person.type === "file" ? person.file_id : person.folder_id,
      "user_id": person.user_id,
      "access": permission,
    });

    await axios.post("/api/" + (person.type === "file" ? "files" : "folders") + "/share", raw, { headers: {'Content-Type': 'application/json'} })
    .then((response) => { response.data && setSharedList(response.data); })
    .catch((error) => { console.log(error); });
      

    // var requestOptions = {
    //   method: 'POST',
    //   body: raw,
    // };
    
    // const response = await fetch("/api/" + (person.type === "file" ? "files" : "folders") + "/share", requestOptions)
    //   .then(response => response.json())
    //   .then(result => newShared = result)
    //   .catch(error => console.log('error', error));

      // if(newShared)
      //   setSharedList(newShared);
  };

  return (
    <>
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar alt={person.name} src={person.avatar} />
        </ListItemAvatar>

        <ListItemText
          primary={person.name}
          secondary={
            <Tooltip title={person.email}>
              <span>{person.email}</span>
            </Tooltip>
          }
          primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
          secondaryTypographyProps={{ noWrap: true }}
          sx={{ flexGrow: 1, pr: 1 }}
        />

        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon={openPopover ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
          onClick={handleOpenPopover}
          sx={{
            flexShrink: 0,
            textTransform: 'unset',
            fontWeight: 'fontWeightMedium',
            '& .MuiButton-endIcon': {
              ml: 0,
            },
            ...(openPopover && {
              bgcolor: 'action.selected',
            }),
          }}
        >
          Can {permission}
        </Button>
      </ListItem>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 160 }}>
        <>
          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleChangePermission('view');
            }}
            sx={{
              ...(permission === 'view' && {
                bgcolor: 'action.selected',
              }),
            }}
          >
            <Iconify icon="eva:eye-fill" />
            Can view
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleChangePermission('edit');
            }}
            sx={{
              ...(permission === 'edit' && {
                bgcolor: 'action.selected',
              }),
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Can edit
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleDelete('delete');
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Remove
          </MenuItem>
        </>
      </MenuPopover>
    </>
  );
}
