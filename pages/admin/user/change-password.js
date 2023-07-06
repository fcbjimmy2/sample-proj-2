import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';

// utils
import axios from '../../../src/utils/axios';
// material-ui
import { styled } from '@mui/material/styles';
import { 
    Alert, 
    Button,
    Box,
    Tab,
    Tabs,
    Typography,
    Stack
} from '@mui/material';

// layouts
import AdminLayout from '../../../src/layouts/admin';

// project imports
import { TermsOfService, PrivacyPolicy } from '../../../src/sections/admin/system/content-settings';

// third-party
import { useIntl } from 'react-intl';

// components
import { Image } from '../../../src/components';

// config
import { BASE_URL, HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: theme.spacing(0, 0),
}));
  
// ----------------------------------------------------------------------
  
const ContentSettings = () => {
    const intl = useIntl();

    return (
        <RootStyle>
            <Box sx={{ maxWidth: 480 }}>
                <Image
                    alt="reset password"
                    src={`${BASE_URL}/assets/icons/ic_lock_password.svg`}
                    sx={{ mb: 5, width: 96, height: 96, mx: 'auto' }}
                />

                <Typography variant="h3" paragraph>
                    Forgot Your Password?
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5 }}>
                    Please enter the email address associated with your account and We will email you a
                    link to reset your password.
                </Typography>
            </Box>
        </RootStyle>
    );
};

export default ContentSettings;

// ----------------------------------------------------------------------

ContentSettings.getLayout = function getLayout(page) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    );
};