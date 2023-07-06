import { useEffect, useState } from 'react';

import { useIntl, FormattedMessage, FormattedTime } from 'react-intl';
// @mui
import {
  Box,
  Divider,
  MenuItem,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
// _mock
import _mock from '../../_mock';
// components
import Iconify from '../../components/Iconify';
import DataTable from '../../components/extended/DataTable_OLD';
import FileThumbnail from '../../components/file-thumbnail';
import { FileNewFolderDialog } from '../file-manager';
import MenuPopover from '../../components/menu-popover';
import { fData } from '../../utils/formatNumber';
// utils
import axios from '../../utils/axios';
//
import ProfileLayout from '../../sections/account/layout';
//
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

const Documents = ({ id }) => {
  const intl = useIntl();

  const [user, setUser] = useState(null);

  const [row, setRow] = useState(null);

  const isDesktop = useResponsive('up', 'sm');

  const [openUploadFile, setOpenUploadFile] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const [reload, setReload] = useState(false);

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

  const handleOpenPopover = (event, row) => {
    setRow(row);
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleReload = () => {
    setReload(!reload);
  }

  const downloadFile = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const deleteFile = async (id) => {
    await axios.delete(`/api/files/${id}`);
  };

  useEffect(() => {
    axios.get(`/api/user/${id}/`).then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <ProfileLayout value={user}>
      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
      >
        <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
          <Typography variant="h5"><FormattedMessage id="documents"/></Typography>

          <IconButton
            size="small"
            color="success"
            onClick={handleOpenUploadFile}
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
        <DataTable
          isList
          hideHeader
          hidePagination
          url="/api/files/"
          reload={reload}
          renderRow={(row, index) => {
            return (
              <Stack
                spacing={isDesktop ? 1.5 : 2}
                direction={isDesktop ? 'row' : 'column'}
                alignItems={isDesktop ? 'center' : 'flex-start'}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  position: 'relative',
                  bgcolor: 'background.paper',
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                  '&:hover': {
                    boxShadow: (theme) => theme.customShadows.z20,
                  },
                  ...(isDesktop && {
                    p: 1.5,
                    borderRadius: 1.5,
                  }),
                }}
              >
                <FileThumbnail file={row?.name??''} />
        
                <Stack
                  sx={{
                    width: 1,
                    flexGrow: { sm: 1 },
                    minWidth: { sm: '1px' },
                  }}
                >
                  <Typography variant="subtitle2" noWrap>
                    {row.name}
                  </Typography>
        
                  <Stack
                    spacing={0.75}
                    direction="row"
                    alignItems="center"
                    sx={{ typography: 'caption', color: 'text.disabled', mt: 0.5 }}
                  >
                    <Box> {fData(row.size)} </Box>
        
                    <Box sx={{ width: 2, height: 2, borderRadius: '50%', bgcolor: 'currentColor' }} />
        
                    <Box> <FormattedTime value={new Date(row.dateModified)} day="numeric" month="long" year="numeric" /> </Box>
                  </Stack>
                </Stack>
        
                <Box
                  sx={{
                    top: 8,
                    right: 8,
                    flexShrink: 0,
                    position: 'absolute',
                    ...(isDesktop && {
                      position: 'unset',
                    }),
                  }}
                >
                  <IconButton color={openPopover ? 'inherit' : 'default'} onClick={(e) => handleOpenPopover(e, row)}>
                    <Iconify icon="eva:more-vertical-fill" />
                  </IconButton>
                </Box>
              </Stack>
            );
          }} />
      </Box>

      <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} onUpload={handleReload} title={intl.formatMessage({id: "upload-files"})} buttonText={intl.formatMessage({id: "upload"})} />

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            downloadFile(row.sharedLink);
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:download-outline" />
          <FormattedMessage id="download-file" />
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={async () => {
            await deleteFile(row.id);
            handleReload();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          <FormattedMessage id="delete-file" />
        </MenuItem>
      </MenuPopover>
    </ProfileLayout>
  );
}

export default Documents;