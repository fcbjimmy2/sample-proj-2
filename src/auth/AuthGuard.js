import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// components
import { LoadingScreen } from '../../src/components';
// auth
import { useAuthContext } from './useAuthContext';
// config
import { BASE_URL } from '../config';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
  isAdmin: PropTypes.bool,
};

export default function AuthGuard({ children, isAdmin }) {
  const { isAuthenticated, isInitialized, user } = useAuthContext();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    } else {
      push(BASE_URL);
    }
    return <LoadingScreen />;
  } else {
    if (isAdmin) {
      if (user?.role !== 'staff' && user?.role !== 'teacher') {
        push(BASE_URL);
        return <LoadingScreen />;
      }
    } else {
      if (user?.role !== 'student') {
        push(BASE_URL + '/admin');
        return <LoadingScreen />;
      }
    }
  }

  return <> {children} </>;
}
