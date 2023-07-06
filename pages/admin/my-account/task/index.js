import React from 'react';

// layouts
import AdminLayout from '../../../../src/layouts/admin';

// project imports
import MainCard from '../../../../src/components/cards/MainCard';
import Board from '../../../../src/components/extended/kanban';

// third-party
import { useIntl } from 'react-intl';

const Task = () => {
  const intl = useIntl();

  return (
    <MainCard title={intl.formatMessage({id: 'task'})} boxShadow>
      <Board />
    </MainCard>
  );
};

export default Task;

// ----------------------------------------------------------------------

Task.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  );
};
