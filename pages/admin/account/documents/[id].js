import { useRouter } from 'next/router';
// layouts
import AdminLayout from '../../../../src/layouts/admin';
//
import Section from '../../../../src/sections/account/documents';

// ----------------------------------------------------------------------

const Documents = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Section id={id} />
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