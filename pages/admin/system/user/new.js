// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../src/routes/paths';
// layouts
import AdminLayout from '../../../../src/layouts/admin';
// components
import CustomBreadcrumbs from '../../../../src/components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../../../src/sections/user/UserNewEditForm';
// third-party
import { useIntl } from 'react-intl';

// ----------------------------------------------------------------------

UserCreatePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  const intl = useIntl();

  return (
    <>
      <Head>
      </Head>

      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading={intl.formatMessage({id: 'User Manager-Create a new user'})}
          links={[
            {
              name: intl.formatMessage({id: 'home'}),
              href: PATH_DASHBOARD.root,
            },
            {
              name: intl.formatMessage({id: 'User Manager-User'}),
              href: PATH_DASHBOARD.user.list,
            },
            { name: intl.formatMessage({id: 'User Manager-New user'}) },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </>
  );
}
