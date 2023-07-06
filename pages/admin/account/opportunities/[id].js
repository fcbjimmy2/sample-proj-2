import { useRouter } from 'next/router';
// layouts
import AdminLayout from '../../../../src/layouts/admin';
//
import Section from '../../../../src/sections/account/opportunities';

// ----------------------------------------------------------------------

const Opportunities = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Section id={id} />
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