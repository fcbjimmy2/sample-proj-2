import { useState } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';
// @mui
import {
  Box,
  FormControl,
  InputLabel,
  Link,
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

const Projects = () => {
  const intl = useIntl();

  return (
    <ProfileLayout>
      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
      >
        <Typography variant="h5"><FormattedMessage id="projects"/></Typography>
        <DataTable
          hideHeader
          url=""
          before={
            <Stack sx={{ p: 3, flexDirection: "row", gap: 3 }}>
              <FormControl>
                <InputLabel><FormattedMessage id="select-project" /></InputLabel>
                <Select name="project" size="small" sx={{minWidth: "150px", ml: "auto"}} value={2}>
                  <MenuItem key="2" value="2">Tung Tai</MenuItem>
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
                <Link href="#">{row.name??''}</Link>
              </TableCell>
              <TableCell>{row.manager??''}</TableCell>
              <TableCell align="right">
                <IconButton aria-label={intl.formatMessage({id: "unlink-project"})}>
                  <Iconify icon="carbon:unlink" />
                </IconButton>
              </TableCell>
            </TableRow>
            );
          }} data={[
          {
            name: "CP World",
            manager: "brian fork",
          },
        ]} />
      </Box>
    </ProfileLayout>
  );
}

export default Projects;

Projects.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
      </AdminLayout>
  );
};