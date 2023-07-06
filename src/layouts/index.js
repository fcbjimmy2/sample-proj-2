import PropTypes from 'prop-types';
// next
import dynamic from 'next/dynamic';
//
const Header = dynamic(() => import('./header'), { ssr: false });
const Footer = dynamic(() => import('./footer'), { ssr: false });
// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node,
  disabledFooter: PropTypes.bool,
  disabledHeader: PropTypes.bool
};

export default function Layout({
  children,
  disabledHeader,
  disabledFooter,
}) {
  return (
    <>
      {disabledHeader ? null : (
        <Header />
      )}

      {children}

      {disabledFooter ? null : <Footer />}
    </>
  );
}
