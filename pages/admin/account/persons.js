import { useState } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';
// @mui
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TableCell,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
// _mock
import _mock from '../../../src/_mock';
// components
import Iconify from '../../../src/components/Iconify';
import DataTable from '../../../src/components/extended/DataTable_OLD';
import MenuPopover from '../../../src/components/menu-popover';
// layouts
import AdminLayout from '../../../src/layouts/admin';
//
import ProfileLayout from '../../../src/sections/account/layout';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = {
    opened: {
      icon: 'carbon:arrow-right',
      text: 'Opened',
    },
    closed: {
      icon: 'carbon:checkmark',
      text: 'Closed',
    },
  };

const CATEGORY_OPTIONS = {
  note: {
    icon: 'carbon:document',
    text: 'Note',
  },
  email: {
    icon: 'carbon:email',
    text: 'Email',
  },
  phone: {
    icon: 'carbon:phone',
    text: 'Phone call',
  },
  appointment: {
    icon: 'carbon:timer',
    text: 'Appointment',
  },
};

const ALERT_OPTIONS = {
  0: "never",
  5: "5 minutes",
  15: "15 minutes",
  30: "half an hour",
  60: "an hour",
  120: "2 hours",
  1440: "a day",
};

// ----------------------------------------------------------------------

const Persons = () => {
  const intl = useIntl();

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <ProfileLayout>
      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
      >
        <Typography variant="h5"><FormattedMessage id="persons"/></Typography>
        <DataTable
          hideHeader
          url=""
          before={
            <Stack sx={{ p: 3, flexDirection: "row", gap: 3 }}>
              <FormControl>
                <InputLabel><FormattedMessage id="select-person" /></InputLabel>
                <Select name="person" size="small" sx={{minWidth: "150px", ml: "auto"}} value={2}>
                  <MenuItem key="2" value="2">Hin</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          }
          renderRow={(row, index) => {
            return (
            <TableRow
              hover
              tabIndex={-1}
              key={index}
            >
              <TableCell>
                <Avatar src={_mock.image.avatar(row.avatar??0)} sx={{ width: 40, height: 40 }} />
              </TableCell>
              <TableCell>{row.name??''}</TableCell>
              <TableCell>
                <div>{row.phone??''}</div>
                <div>{row.email??''}</div>
              </TableCell>
              <TableCell align="right">
                <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </TableCell>
            </TableRow>
            );
          }} data={[
          {
            avatar: 1,
            name: "Ophe Chan",
            phone: "12345678",
            email: "ochan@apex.hk",
          },
          {
            avatar: 2,
            name: "LEE KA SHING",
            phone: "23456789",
            email: "singjai@ck.hkk",
          },
        ]} />
      </Box>

      <MenuPopover
      open={openPopover}
      onClose={handleClosePopover}
      arrow="right-top"
      >
        <MenuItem
          onClick={() => {
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="carbon:unlink" />
          <FormattedMessage id="unlink-contact" />
        </MenuItem>
        <MenuItem
          onClick={() => {
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="carbon:email" />
          <FormattedMessage id="write-message" />
        </MenuItem>
        <MenuItem
          onClick={() => {
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="carbon:time" />
          <FormattedMessage id="view-mailing-history" />
        </MenuItem>
      </MenuPopover>
    </ProfileLayout>
  );
}

export default Persons;

Persons.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
      </AdminLayout>
  );
};