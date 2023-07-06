import PropTypes from 'prop-types';
import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// config
import { BASE_URL } from '../config';
// components
import { LoadingScreen } from '../../src/components';
// auth
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { push } = useRouter();

  const { isAuthenticated, isInitialized, user } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'staff' || user?.role === 'teacher') {
        push(BASE_URL + '/admin');
      } else {
        push(BASE_URL);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  if (isInitialized === isAuthenticated) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
