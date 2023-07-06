import PropTypes from 'prop-types';
import Head from 'next/head';
import { forwardRef } from 'react';
// config
import { SITE_TITLE } from '../../src/config';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, meta, title, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title ? (title + ' | ') : ''}${SITE_TITLE}`}</title>
      {meta}
    </Head>

    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }} ref={ref} {...other}>
      {children}
    </Box>
  </>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.node,
  title: PropTypes.string,
};

export default Page;
