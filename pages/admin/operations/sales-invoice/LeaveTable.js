import * as React from 'react';

// project imports
import DataTable from '../../../../src/components/extended/DataTable_OLD';

// third-party
import { useIntl } from 'react-intl';
import { Stack, TextField, InputAdornment } from '@mui/material';
import { Icon } from '@iconify/react';
import SearchIcon from '@iconify/icons-carbon/search';

export default function LeaveTable({ status }) {
  const intl = useIntl();
  console.log('status', status);
  // table header
  let headers = {};
  [
    'invoice no',
    'invoice date',
    'branch code',
    'student',
    'total',
    'status',
    'payment method',
    'reprint',
  ].forEach((header) => {
    headers[header] = intl.formatMessage({ id: header });
  });

  return (
    <DataTable
      headers={headers}
      url=""
      args={{ status: status }}
      renderRow={() => {}}
      before={
        <Stack sx={{ p: 3 }}>
          <TextField
            id="q"
            name="q"
            placeholder={intl.formatMessage({ id: 'search' })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon={SearchIcon} sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
            size="small"
            sx={{ marginLeft: 'auto' }}
          />
        </Stack>
      }
    />
  );
}
