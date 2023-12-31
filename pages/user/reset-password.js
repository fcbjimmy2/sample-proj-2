import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';
// layouts
import Layout from '../../src/layouts';
// auth
import GuestGuard from '../../src/auth/GuestGuard';
// components
import { Page, Image } from '../../src/components';
import { ResetPasswordForm } from '../../src/sections/user';
// config
import { BASE_URL } from '../../src/config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(15, 2.5),
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
  },
}));

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Page title="Reset Password">
      <RootStyle>
        <Box sx={{ maxWidth: 480 }}>
          {!sent ? (
            <>
              <Image
                alt="reset password"
                src={`${BASE_URL}/assets/icons/ic_lock_password.svg`}
                sx={{ mb: 5, width: 96, height: 96, mx: 'auto' }}
              />

              <Typography variant="h3" paragraph sx={{ color: 'text.primary' }}>
                Forgot Your Password?
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5 }}>
                Please enter the email address associated with your account and We will email you a
                link to reset your password.
              </Typography>

              <ResetPasswordForm
                onSent={() => setSent(true)}
                onGetEmail={(value) => setEmail(value)}
              />
            </>
          ) : (
            <>
              <Image
                alt="email sent"
                src={`${BASE_URL}/assets/icons/ic_email_sent.svg`}
                sx={{
                  mb: 5,
                  height: 160,
                  width: 138,
                  mx: 'auto',
                }}
              />

              <Typography variant="h3" paragraph>
                Request Sent Successfully
              </Typography>
              <Typography>
                We have sent a confirmation email to {''}
                <strong>{email}</strong>
                <br />
                Please check your email.
              </Typography>

              <Button 
                component={NextLink} 
                size="large" 
                variant="contained" 
                sx={{ mt: 5 }}
                href="/user/login">
                Back
              </Button>
            </>
          )}
        </Box>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ResetPasswordPage.getLayout = function getLayout(page) {
  return (
    <GuestGuard>
      <Layout disabledFooter>{page}</Layout>
    </GuestGuard>
  );
};
