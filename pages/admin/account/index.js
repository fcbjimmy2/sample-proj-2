import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === '/admin/account') {
      push('/admin/account/profile');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
