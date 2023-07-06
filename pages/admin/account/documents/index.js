// layouts
import AdminLayout from '../../../../src/layouts/admin';
//
import Section from '../../../../src/sections/account/documents';
// auth
import { useAuthContext } from '../../../../src/auth/useAuthContext';

// ----------------------------------------------------------------------

const Documents = () => {
  const { user } = useAuthContext();
  return (
    <Section id={user.id}/>
  );
}

export default Documents;

Documents.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  );
};