import PropTypes from 'prop-types';
import Head from 'next/head';
import { forwardRef } from 'react';
import { useIntl } from 'react-intl';
// config
import { SITE_TITLE } from '../../config';
// @mui
import { Container } from '@mui/material';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, meta, title }, ref) => {  
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>{`${title ? (title + ' | ') : ''}${intl.formatMessage({id: 'admin-panel'})} | ${SITE_TITLE}`}</title>
        {meta}
      </Head>
  
      <Container ref={ref} maxWidth="false">
          {children}
      </Container>
    </>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.node,
  title: PropTypes.string,
};

export default Page;
