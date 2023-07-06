import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
// @mui
import {
  List,
  Stack,
  Dialog,
  Button,
  TextField,
  Select,
  MenuItem,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
//
import FileInvitedItem from '../FileInvitedItem';
// third-party
import { useIntl } from 'react-intl';
// utils
import axios from '../../../../src/utils/axios';

// ----------------------------------------------------------------------

FileShareDialog.propTypes = {
  id: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  sharedList: PropTypes.array,
  setSharedList: PropTypes.func,
  onCopyLink: PropTypes.func,
  shareto: PropTypes.string,
  onChangeShare: PropTypes.func,
  userData: PropTypes.array,
  isMultipleItems: PropTypes.bool,
  selectedItems: PropTypes.array,
};

export default function FileShareDialog({
  id,
  sharedList,
  setSharedList,
  onCopyLink,
  onChangeInvite,
  //
  open,
  onClose,
  userData,
  isMultipleItems,
  selectedItems,
  ...other
}) {
  const intl = useIntl();

  const hasShared = sharedList && !!sharedList.length;
  
  const [shareto, setShareto] = useState('');

  const handleSharetoChange = (event) => {
    setShareto(
      event.target.value
    );
  };
  
  const handleShare = async (itemId) => {
    const isFolder = itemId.includes("folder");
    var raw = JSON.stringify({
      "combined_id": itemId,
      "user_id": shareto,
      "access": "view",
    });

    var newShared = '{}';
    
    await axios.post("/api/" + (isFolder ? "folders" : "files") + "/share", raw, { headers: {'Content-Type': 'application/json'} })
    .then((response) => { console.log(response.status); newShared = response.data; })
    .catch((error) => { console.log(error); });

    // var requestOptions = {
    //   method: 'POST',
    //   body: raw,
    // };

    // const response = await fetch("/api/" + (isFolder ? "folders" : "files") + "/share", requestOptions)
    //   .then(response => response.json())
    //   .then(result => newShared = result) // console.log(result)
    //   .catch(error => console.log('error', error));
      
    return newShared;
  }
  
  const handleSendInvite = async () => {
    
    var newShared = '';

    if(isMultipleItems)
    {
      selectedItems.forEach(async (item) => {
        newShared = await handleShare(item);
      })
      if(newShared)
        setSharedList(newShared);
      onClose();
    }
    else
    {
      newShared = await handleShare(id);
      if(newShared)
        setSharedList(newShared);
      onClose();
    }

    // setOpenConfirm(true);
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle> {intl.formatMessage({id: 'File Manager-Share To'})} </DialogTitle>

      <DialogContent sx={{ overflow: 'unset' }}>
        {onChangeInvite && (
          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            
              <Select
                fullWidth
                value={shareto}
                onChange={handleSharetoChange}
                label="shareto"
                placeholder={intl.formatMessage({id: 'File Manager-Share To'})}
                inputProps={{
                  name: 'shareto-user',
                  id: 'shareto-user',
                }}
              >
                {
                  userData.map((data) => {
                    // return(<MenuItem key={data.id} value={data.id}>{data.email}</MenuItem>)
                    return(<MenuItem key={data.user_id} value={data.user_id}>{data.email}</MenuItem>)
                  })
                }
              </Select>
              
            <Button disabled={!shareto} onClick={handleSendInvite} variant="contained" sx={{ flexShrink: 0 }}>
              {intl.formatMessage({id: 'Confirm'})}
            </Button>
          </Stack>
        )}

        {hasShared && (
          <Scrollbar sx={{ maxHeight: 60 * 6 }}>
            <List disablePadding>
              {sharedList.map((person) => (
                <FileInvitedItem key={person.user_id} person={person} setSharedList={setSharedList} />
              ))}
            </List>
          </Scrollbar>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between' }}>
        {/* {onCopyLink && (
          <Button startIcon={<Iconify icon="eva:link-2-fill" />} onClick={onCopyLink}>
            Copy link
          </Button>
        )} */}

        {onClose && (
          <Button variant="outlined" color="inherit" onClick={onClose}>
            {intl.formatMessage({id: 'Close'})}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
