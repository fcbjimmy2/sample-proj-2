import PropTypes from 'prop-types';
import { useState } from 'react';
// utils
import axios from '../../../../utils/axios';
// third-party
import { useIntl } from 'react-intl';
// @mui
import {
  Button,
  MenuItem,
  TableCell,
  TableRow,
  IconButton,
  Dialog, 
  DialogTitle, 
  DialogActions,
  DialogContent,
  LinearProgress,
} from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';

import MasterTableFormDialog from './MasterTableFormDialog'

// ----------------------------------------------------------------------

MasterTableRow.propTypes = {
  row: PropTypes.object,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function MasterTableRow({ row, onEditRow, onDeleteRow }) {
  const intl = useIntl();

  const { idx, value, lang_en, lang_zh_hant, lang_zh_hans, name, name_text } = row;

  const types = [
    { value: name, text: name_text}
  ];

  const [openConfirm, setOpenConfirm] = useState(false);
  
  const [openPopover, setOpenPopover] = useState(null);

  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleCreateUpdate = () => {
    setOpenForm(false);
    onEditRow();
  };

  const [isDeleting, setIsDeleting] = useState(false);

  const [deleteError, setDeleteError] = useState(null);

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

  const handleDeleteRow = async () => {
    setDeleteError(null);
    setIsDeleting(true);
    handleCloseConfirm();
    try {
      await axios.delete('/api/admin/master-tables/'+ idx);
      setDeleteError(null);
      setIsDeleting(false);
      onDeleteRow();
    } catch (error) {
      setDeleteError(error?.message??intl.formatMessage({id: 'unexpected-error-occurred'}))
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{value}</TableCell>

        <TableCell align="left">{lang_en}</TableCell>

        <TableCell align="left">{lang_zh_hant}</TableCell>

        <TableCell align="left">{lang_zh_hans}</TableCell>

        <TableCell align="right">
        <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          {intl.formatMessage({id: 'delete'})}
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleOpenForm();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          {intl.formatMessage({id: 'edit'})}
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={intl.formatMessage({id: 'Delete Master'})}
        content={intl.formatMessage({id: 'Are you sure want to delete?'})}
        action={
          <Button variant="contained" color="error" onClick={handleDeleteRow}>
            {intl.formatMessage({id: 'delete'})}
          </Button>
        }
      />
            
      <Dialog fullWidth maxWidth="xs" open={isDeleting}>
        <DialogTitle sx={{ pb: 2 }}>{intl.formatMessage({id: (!!deleteError ? 'error' : 'Delete Master')})}</DialogTitle>
        {!!deleteError && <DialogContent sx={{ typography: 'body2' }}> {deleteError} </DialogContent>}
        {!deleteError && <LinearProgress sx={{ width: 'auto', mx: 3 }} />} 
        <DialogActions>
          {!!deleteError && (
              <Button variant="outlined" color="inherit" onClick={() => { setIsDeleting(false) }}>
                {intl.formatMessage({id: 'ok'})}
              </Button>
            )}
        </DialogActions>
      </Dialog>

      <MasterTableFormDialog 
        types={types} 
        masterData={row} 
        open={openForm} 
        onCancel={handleCloseForm} 
        onCreateUpdateEvent={handleCreateUpdate} />
    </>
  );
}
