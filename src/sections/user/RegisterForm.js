import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
// third-party
import { useIntl } from 'react-intl';
// icons
import viewIcon from '@iconify/icons-carbon/view';
import viewOff from '@iconify/icons-carbon/view-off';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Typography, Stack, Link, TextField, IconButton, InputAdornment } from '@mui/material';
// components
import { Iconify } from '../../components';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
//
import PrivacyPolicyModal from './PrivacyPolicyModal';
import TermsOfServiceModal from './TermsOfServiceModal';

// ----------------------------------------------------------------------
export default function RegisterForm() {
  const [termsOfServiceOpen, setTermsOfServiceOpen] = useState(false);

  const handleTermsOfServiceOpen = () => {
    setTermsOfServiceOpen(true);
  };

  const handleTermsOfServiceClose = () => {
    setTermsOfServiceOpen(false);
  };

  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);

  const handlePrivacyPolicyOpen = () => {
    setPrivacyPolicyOpen(true);
  };

  const handlePrivacyPolicyClose = () => {
    setPrivacyPolicyOpen(false);
  };

  const intl = useIntl();

  const FormSchema = Yup.object().shape({
    fullName: Yup.string().required(intl.formatMessage({id: 'full-name-required'})),
    email: Yup.string().required(intl.formatMessage({id: 'email-required'})).email(intl.formatMessage({id: 'email-format-incorrect'})),
    password: Yup.string()
      .required(intl.formatMessage({id: 'password-required'}))
      .min(6, intl.formatMessage({id: 'password-min-6-char'})),
    confirmPassword: Yup.string()
      .required(intl.formatMessage({id: 'confirm-password-required'}))
      .oneOf([Yup.ref('password')], intl.formatMessage({id: 'passwords-not-match'})),
  });

  const { register } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      await register(data.email, data.password, data.fullName);
    } catch (error) {
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && <Alert variant="filled" severity="error" sx={{ width: '100%' }}>{errors.afterSubmit.message}</Alert>}        

        <Controller
          name="fullName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              disabled={isSubmitting}
              label={intl.formatMessage({id: 'full-name'})}
              error={Boolean(error)}
              helperText={error?.message} 
              inputProps={{ maxLength: 150 }}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              disabled={isSubmitting}
              label={intl.formatMessage({id: 'email-address'})}
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              disabled={isSubmitting}
              label={intl.formatMessage({id: 'password'})}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? viewIcon : viewOff} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              disabled={isSubmitting}
              label={intl.formatMessage({id: 'confirm-password'})}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? viewIcon : viewOff} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {intl.formatMessage({id: 'sign-up'})}
        </LoadingButton>

        <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
          {intl.formatMessage({id: 'i-agree-to'})}
          <Link component="button" type="button" onClick={() => { handleTermsOfServiceOpen(); }}>
            {intl.formatMessage({id: 'terms-of-service'})}
          </Link>
          <TermsOfServiceModal open={termsOfServiceOpen} handleCloseModal={handleTermsOfServiceClose} />
          {intl.formatMessage({id: 'and'})}
          <Link component="button" type="button" onClick={() => { handlePrivacyPolicyOpen(); }}>
            {intl.formatMessage({id: 'privacy-policy'})}
          </Link>
          <PrivacyPolicyModal open={privacyPolicyOpen} handleCloseModal={handlePrivacyPolicyClose} />
        </Typography>
      </Stack>
    </form>
  );
}
