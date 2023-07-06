import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../../src/routes/paths';
// _mock_
import { _userList } from '../../../../../src/_mock/arrays';
// layouts
import AdminLayout from '../../../../../src/layouts/admin';
// components
import CustomBreadcrumbs from '../../../../../src/components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../../../../src/sections/user/UserNewEditForm';
// utils
import axios from '../../../../../src/utils/axios';
// third-party
import { useIntl } from 'react-intl';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const intl = useIntl();

  const {
    query: { id },
  } = useRouter();

  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    axios.get('/api/user/staff/' + id)
    .then((response) => { setCurrentUser(response.data); })
    .catch((error) => { console.log(error); });
  }, [])

  // const currentUser = _userList.find((user) => paramCase(user.id) === id);

  return (
    <>
      <Head>
      </Head>

      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading={intl.formatMessage({id: 'User Manager-Edit user'})}
          links={[
            {
              name: intl.formatMessage({id: 'home'}),
              href: PATH_DASHBOARD.root,
            },
            {
              name: intl.formatMessage({id: 'User Manager-User'}),
              href: PATH_DASHBOARD.user.list,
            },
            { name: currentUser?.name },
          ]}
        />

        <UserNewEditForm isEdit currentUser={currentUser} />
      </Container>
    </>
  );
}
