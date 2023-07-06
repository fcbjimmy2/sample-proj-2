// layouts
import AdminLayout from '../../../../src/layouts/admin';
//
import Section from '../../../../src/sections/account/tasks';
// auth
import { useAuthContext } from '../../../../src/auth/useAuthContext';

// ----------------------------------------------------------------------

const Tasks = () => {
  const { user } = useAuthContext();
  return (
    <Section id={user.id}/>
  );
}

export default Tasks;

Tasks.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  );
};