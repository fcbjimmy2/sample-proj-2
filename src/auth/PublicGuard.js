import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
// config
import { BASE_URL } from '../config';
// components
import { LoadingScreen } from '../../src/components';
// auth
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

PublicGuard.propTypes = {
  children: PropTypes.node,
};

export default function PublicGuard({ children }) {
  const { push } = useRouter();

  const { isAuthenticated, isInitialized, user } = useAuthContext();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {    
    if (user?.role === 'staff' || user?.role === 'teacher') {
      push(BASE_URL + '/admin');
      return <LoadingScreen />;
    }
  }

  return <> {children} </>;
}
