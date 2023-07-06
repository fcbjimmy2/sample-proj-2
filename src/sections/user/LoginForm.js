import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
// third-party
import { useIntl } from 'react-intl';
// icons
import viewIcon from '@iconify/icons-carbon/view';
import viewOff from '@iconify/icons-carbon/view-off';
// next
import NextLink from 'next/link';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Stack, Link, TextField, IconButton, InputAdornment } from '@mui/material';
// components
import { Iconify } from '../../components';
// auth
import { useAuthContext } from '../../auth/useAuthContext';

// ----------------------------------------------------------------------
export default function LoginForm() {
  const intl = useIntl();

  const FormSchema = Yup.object().shape({
    email: Yup.string().required(intl.formatMessage({id: 'email-required'})).email(intl.formatMessage({id: 'email-format-incorrect'})),
    password: Yup.string().required(intl.formatMessage({id: 'password-required'})),
  });

  const { login } = useAuthContext();

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
      email: '',
      password: '',
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5} alignItems="flex-end">
        {!!errors.afterSubmit && <Alert variant="filled" severity="error" sx={{ width: '100%' }}>{errors.afterSubmit.message}</Alert>}        

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
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

        {/* <Link 
          component={NextLink}
          variant="body2" 
          underline="always" 
          color="text.secondary"
          href="/user/reset-password"
        >
          { intl.formatMessage({id: 'forgot-password'}) }
        </Link> */}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          { intl.formatMessage({id: 'login'}) }
        </LoadingButton>
      </Stack>
    </form>
  );
}
