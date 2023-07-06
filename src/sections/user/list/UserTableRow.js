import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';
import { fDate } from '../../../utils/formatTime';
// third-party
import { useIntl } from 'react-intl';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const intl = useIntl();
  // const { name, avatarUrl, company, role, isVerified, status } = row;
  const { user_guid,full_name,email,phone,mobile,company,photo,user_id,login,enabled,timezone,locale,social_media_id,social_media_provider,app,created_date } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

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

  return (
    <>
      <TableRow hover > 
      {/* selected={selected} */}
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={full_name} src={photo} />

            <Typography variant="subtitle2" noWrap>
              {full_name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{email}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {phone}
        </TableCell>

        <TableCell align="center">
          <Iconify
            icon={enabled ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
              ...(!enabled && { color: 'warning.main' }),
            }}
          />
        </TableCell>

        <TableCell
          align="left"
          sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
        >
          {fDate(created_date)}
        </TableCell>

        {/* <TableCell align="left">
          <Label
            variant="soft"
            color={(status === 'banned' && 'error') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {status}
          </Label>
        </TableCell> */}

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
          {intl.formatMessage({id: 'User Manager-Delete'})}
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          {intl.formatMessage({id: 'User Manager-Edit'})}
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={intl.formatMessage({id: 'User Manager-Delete'})}
        content={intl.formatMessage({id: 'User Manager-Delete-Message'})}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {intl.formatMessage({id: 'User Manager-Delete'})}
          </Button>
        }
      />
    </>
  );
}
