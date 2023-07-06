import * as React from 'react';
import PropTypes from 'prop-types';
// project imports
import DataTable from '../../../../../src/components/extended/DataTable_OLD';

// third-party
import { useIntl } from 'react-intl';
import {
  Stack,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { Icon } from '@iconify/react';
import SearchIcon from '@iconify/icons-carbon/search';

//imports
import PendingTab from './Pending';
import CompletedTab from './CompletedTab';
import VoidTab from './VoidTab';

OperationTabs.propTypes = {
  status: PropTypes.string,
};

export default function OperationTabs({ status }) {
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
    <Box>
      {status === 'pending' && <PendingTab />}
      {status === 'completed' && <CompletedTab />}
      {status === 'void' && <VoidTab />}
    </Box>
  );
}
