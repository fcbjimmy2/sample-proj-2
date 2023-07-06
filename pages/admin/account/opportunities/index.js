// layouts
import AdminLayout from '../../../../src/layouts/admin';
//
import Section from '../../../../src/sections/account/opportunities';
// auth
import { useAuthContext } from '../../../../src/auth/useAuthContext';

// ----------------------------------------------------------------------

const Opportunities = () => {
  const { user } = useAuthContext();
  return (
    <Section id={user.id}/>
  );
}

export default Opportunities;

Opportunities.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  );
};