import { useRouter } from 'next/router';
// layouts
import AdminLayout from '../../../../src/layouts/admin';
//
import Section from '../../../../src/sections/account/profile';

// ----------------------------------------------------------------------

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Section id={id} />
  );
}

export default Profile;

Profile.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  );
};