import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
// @mui
import {
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import { Upload } from '../../../components/upload';
import { ConstructionOutlined, PropaneSharp } from '@mui/icons-material';
// third-party
import { useIntl } from 'react-intl';
// utils
import axios from '../../../../src/utils/axios';
// ----------------------------------------------------------------------

FileNewFolderDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onUpload: PropTypes.func,
  folderName: PropTypes.string,
  onChangeFolderName: PropTypes.func,
  folderId: PropTypes.string,
  buttonText: PropTypes.string,
};

export default function FileNewFolderDialog({
  title = 'Upload Files',
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  onUpload,
  //
  folderName,
  folderId,
  buttonText = 'Upload',
  onChangeFolderName,
  ...other
}) {
  const intl = useIntl();

  const [files, setFiles] = useState([]);

  // const [targetFolderId, setTargetFolderId] = useState('');

  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);


  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
    [files]
  );


  const handleUpload = async () => {
    // console.log(files);

    var targetFolderId = folderId;
    targetFolderId = await handleNewFolder();

    if(files.length > 0 && targetFolderId !== 'ERROR')
    {
      var formdata = new FormData();
      files.forEach(file => {
        formdata.append("file", file);
      })

      var data = ''

      await axios.post("/api/files" + (targetFolderId ? `/${targetFolderId}` : ''), formdata, { headers: {'Content-Type': `multipart/form-data boundary=${formdata._boundary}`} })
      .then((response) => { data = response.data; })
      .catch((error) => { console.log(error); });
      // data = response.data;

      // var requestOptions = {
      //   method: 'POST',
      //   body: formdata,
      // };

      // const response = await fetch("/api/files" + (targetFolderId ? `/${targetFolderId}` : ''), requestOptions)
      //   .then(response => response.json())
      //   .then(result => console.log(result))
      //   .catch(error => console.log('error', error));
      onUpload && onUpload();
    }

    onClose();
  };

  const handleNewFolder = async () => {
    if(title === 'New Folder' || title === '新資料夾')
    {
      var raw = JSON.stringify({
        "folder_name": folderName,
      });

      var data = '';
      await axios.post("/api/folders" + (folderId ? `/${folderId}` : ''), raw, { headers: {'Content-Type': 'application/json'} })
      .then((response) => { data = response.data; })
      .catch((error) => { console.log(error); });
      // data = response.data;

      // var requestOptions = {
      //   method: 'POST',
      //   body: raw,
      // };

      // const response = await fetch("/api/folders" + (folderId ? `/${folderId}` : ''), requestOptions)
      //   .then(response => response.json())
      //   .then(result => data = result) //  setTargetFolderId(result.folder_id)
      //   .catch(error => console.log('error', error));
        
        if(data.id)
          return data.id.split("_")[0];
        else
          return 'ERROR'; 
    }
    else
    {
      return folderId;
    }
  }

  const handleRemoveFile = (inputFile) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        {(onCreate || onUpdate) && (
          <TextField
            fullWidth
            label={intl.formatMessage({id: 'File Manager-Folder name'})}
            value={folderName}
            onChange={onChangeFolderName}
            sx={{ mb: 3 }}
          />
        )}

        <Upload multiple files={files} onDrop={handleDrop} onRemove={handleRemoveFile} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          onClick={handleUpload}
        >
          {/* {buttonText} */}
          { intl.formatMessage({id: 'File Manager-Create'}) }
        </Button>

        {!!files.length && (
          <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
            {intl.formatMessage({id: 'remove-all'})}
          </Button>
        )}

        {/* {(onCreate || onUpdate) && (
          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Button variant="soft" onClick={onCreate || onUpdate}>
              {onUpdate ? intl.formatMessage({id: 'File Manager-Save'}) : intl.formatMessage({id: 'File Manager-Create'})}
            </Button>
          </Stack>
        )} */}
      </DialogActions>
    </Dialog>
  );
}
