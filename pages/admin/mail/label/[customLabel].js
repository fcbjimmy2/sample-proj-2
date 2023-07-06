// next
import Head from 'next/head';
// layouts
import AdminLayout from '../../../../src/layouts/admin';
// sections
import { Mail } from '../../../../src/sections/mail';

// ----------------------------------------------------------------------

MailPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

// ----------------------------------------------------------------------

export default function MailPage() {
  return (
    <>
      <Head>
        {/* <title> Mail | Minimal UI</title> */}
      </Head>

      <Mail />
    </>
  );
}
