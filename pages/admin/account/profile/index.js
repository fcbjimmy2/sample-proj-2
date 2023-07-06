// layouts
import AdminLayout from '../../../../src/layouts/admin';
//
import Section from '../../../../src/sections/account/profile';
// auth
import { useAuthContext } from '../../../../src/auth/useAuthContext';

// ----------------------------------------------------------------------

const Profile = () => {
  const { user } = useAuthContext();
  return (
    <Section id={user.id}/>
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