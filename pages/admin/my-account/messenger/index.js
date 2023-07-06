import React from 'react';

// material-ui
import { Card, Stack, Typography } from '@mui/material';

// layouts
import AdminLayout from '../../../../src/layouts/admin';

// project imports
import MainCard from '../../../../src/components/cards/MainCard';
import { Chat } from '../../../../src/components/extended/chat';

// third-party
import { useIntl } from 'react-intl';

const Messenger = () => {
  const intl = useIntl();

  return (
    <Stack gap={3}>
      <Card sx={{p: 3}}>
        <Typography variant="h6">
        {intl.formatMessage({id: 'messenger'})}
        </Typography>
      </Card>
      <Chat path="/admin/my-account/messenger" />
    </Stack>
  );
};

export default Messenger;

// ----------------------------------------------------------------------

Messenger.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  );
};
