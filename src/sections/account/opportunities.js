import { useEffect, useState } from 'react';

import { useIntl, FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl';
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
} from '@mui/material';
// _mock
import _mock from '../../_mock';
// components
import DataTable from '../../components/extended/DataTable_OLD';
// utils
import axios from '../../utils/axios';
//
import ProfileLayout from '../../sections/account/layout';

// ----------------------------------------------------------------------

const Opportunities = ({ id }) => {
  const intl = useIntl();

  const [user, setUser] = useState(null);

  const [reload, setReload] = useState(false);

  const [opportunities, setOpportunities] = useState([]);

  const linkOpportunity = (e) => {
    axios.put(`/api/opportunity/link/`, {
      contact: id,
      op_guid: e.target.value,
    }).then((response) => {
      setOpportunities(opportunities.filter((row) => row.op_guid != e.target.value));
      handleReload();
    });
  };

  const handleReload = () => {
    setReload(!reload);
  };

  useEffect(() => {
    axios.get(`/api/user/${id}/`).then((response) => {
      setUser(response.data);
    });
    axios.get(`/api/opportunity/`).then((response) => {
      setOpportunities(response.data.rows.filter((row) => row.contact != id));
    });
  }, []);

  return (
    <ProfileLayout value={user}>
      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
      >
        <Typography variant="h5"><FormattedMessage id="opportunities"/></Typography>
        <DataTable
          hideHeader
          url="/api/opportunity/"
          args={{contact: id}}
          reload={reload}
          before={
            <Stack sx={{ p: 3, flexDirection: "row", gap: 3 }}>
              <FormControl>
                <InputLabel><FormattedMessage id="select-opportunity" /></InputLabel>
                <Select
                  name="opportunity"
                  size="small"
                  sx={{minWidth: "150px", ml: "auto"}}
                  onChange={linkOpportunity}
                >
                  {opportunities.map((opportunity) => (
                  <MenuItem key={opportunity.op_guid} value={opportunity.op_guid}>{opportunity.op_title}</MenuItem>
                  ))}
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
                <Link href="#">{row.op_title??''}</Link>
                <div><FormattedMessage id="estimated-deal-due-date" /><FormattedDate value={new Date(row.due_date)} day="numeric" month="long" year="numeric" /></div>
              </TableCell>
              <TableCell>{row.status??''}</TableCell>
              <TableCell align="right">
                <FormattedNumber style="currency" currency="HKD" value={row.price??0} />
              </TableCell>
            </TableRow>
            );
          }} />
      </Box>
    </ProfileLayout>
  );
}

export default Opportunities;