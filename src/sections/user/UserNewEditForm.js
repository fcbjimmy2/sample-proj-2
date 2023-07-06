import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// assets
import { countries, timezones } from '../../assets/data';
// components
import Label from '../../components/Label';
import { useSnackbar } from '../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../components/hook-form';

// utils
import axios from '../../utils/axios';

// third-party
import { useIntl } from 'react-intl';

// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewEditForm({ isEdit = false, currentUser }) {
  const intl = useIntl();

  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [roles, setRoles] = useState([]);
  
  useEffect(() => {
    axios.get('/api/user/role/staff')
    .then((response) => { setRoles(response.data); })
    .catch((error) => { console.log(error); });
  }, [])

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required(intl.formatMessage({id: 'User Manager-Name Required'})),
    phone: Yup.string().required(intl.formatMessage({id: 'User Manager-Phone Required'})),
    // mobile: Yup.string().required(intl.formatMessage({id: 'User Manager-Mobile Required'})), 
    email: Yup.string().required(intl.formatMessage({id: 'User Manager-Email Required'})).email(intl.formatMessage({id: 'User Manager-Email Format'})),
    citizen_id: Yup.string().required(intl.formatMessage({id: 'User Manager-CitizenId Required'})),
    // full_name: Yup.string().required(intl.formatMessage({id: 'User Manager-FullName Required'})),
    // local_name: Yup.string().required(intl.formatMessage({id: 'User Manager-LocalName Required'})),
    gender: Yup.string().required(intl.formatMessage({id: 'User Manager-Gender Required'})),
    locale: Yup.string().required(intl.formatMessage({id: 'User Manager-Locale Required'})),
    role: Yup.string().required(intl.formatMessage({id: 'User Manager-Role Required'})),
    // remark: Yup.string().required(intl.formatMessage({id: 'User Manager-Remark Required'})),
    // center: Yup.string().required(intl.formatMessage({id: 'User Manager-Center Required'})),
    // salary: Yup.number().required(intl.formatMessage({id: 'User Manager-Salary Required'})),
    // photo: Yup.mixed().required(intl.formatMessage({id: 'User Manager-Photo Required'})),
    timezone: Yup.string().required(intl.formatMessage({id: 'User Manager-Timezone Required'})),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      phone: currentUser?.phone || '',
      mobile: currentUser?.mobile || '',
      email: currentUser?.email || '',
      citizen_id: currentUser?.citizen_id || '',
      full_name: currentUser?.full_name || '',
      local_name: currentUser?.local_name || '',
      gender: currentUser?.gender || '',
      locale: currentUser?.locale || '',
      role: currentUser?.role || '',
      remark: currentUser?.remark || '',
      center: currentUser?.center || '',
      salary: currentUser?.salary || '',
      photo: currentUser?.photo || 'https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg',
      timezone: currentUser?.timezone || '',
      region: currentUser?.region || '',
      enabled: currentUser?.enabled,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      
      var raw = JSON.stringify(data);

      var result = '';
      if(!isEdit )
      {
        await axios.post("/api/user/staff", raw, { headers: {'Content-Type': 'application/json'} })
        .then((response) => { result = response.data; })
        .catch((error) => { console.log(error); });
      }
      else
      {
        data.user_id = currentUser.user_id;
        data.user_guid = currentUser.user_guid;
        var raw = JSON.stringify(data);
        await axios.put("/api/user/staff/" + currentUser.user_id, raw, { headers: {'Content-Type': 'application/json'} })
        .then((response) => { result = response.data; })
        .catch((error) => { console.log(error); });
      }

      if(result)
      {
        enqueueSnackbar(!isEdit ? intl.formatMessage({id: 'User Manager-Create success'}) : intl.formatMessage({id: 'User Manager-Update success'}));
        push(PATH_DASHBOARD.user.list);
      }
      else
      {
        enqueueSnackbar( intl.formatMessage({id: 'User Manager-Create failed'}), { variant: 'error' });
      }
      // console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photo', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {/* {isEdit && (
              <Label
                color={values.enabled === 'true' || values.enabled === '1' ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.enabled}
              </Label>
            )} */}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="photo"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    {intl.formatMessage({id: 'User Manager-Allowed Format'})} *.jpeg, *.jpg, *.png, *.gif
                    <br /> {intl.formatMessage({id: 'User Manager-Max Size'})} {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="enabled"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={!!field.value}
                        onChange={(event) =>
                          {
                            field.onChange(event.target.checked ? true : false)
                          }
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      {intl.formatMessage({id: 'User Manager-Enabled'})}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {intl.formatMessage({id: 'User Manager-Enabled Message'})}
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            {/* <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            /> */}
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label={intl.formatMessage({id: 'User Manager-Name'})} />
              <RHFTextField name="full_name" label={intl.formatMessage({id: 'User Manager-FullName'})} />
              <RHFTextField name="local_name" label={intl.formatMessage({id: 'User Manager-LocalName'})}/>
              <RHFTextField name="email" label={intl.formatMessage({id: 'User Manager-Email'})} />
              <RHFTextField name="phone" label={intl.formatMessage({id: 'User Manager-Phone'})} />
              <RHFTextField name="mobile" label={intl.formatMessage({id: 'User Manager-Mobile'})} />

              {/* <RHFSelect native name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect> */}

              <RHFTextField name="citizen_id" label={intl.formatMessage({id: 'User Manager-CitizenId'})} />
              <RHFSelect native name="gender" label={intl.formatMessage({id: 'User Manager-Gender'})} placeholder={intl.formatMessage({id: 'User Manager-Gender'})}>
                <option value="" />
                <option key="Male" value="Male">Male</option>
                <option key="Female" value="Female">Female</option>
              </RHFSelect>
              <RHFSelect native name="locale" label={intl.formatMessage({id: 'User Manager-Locale'})} placeholder={intl.formatMessage({id: 'User Manager-Locale'})}>
                <option value="" />
                <option key="en" value="en">English</option>
                <option key="zh-Hant" value="zh-Hant">中文繁體</option>
                <option key="zh-Hans" value="zh-Hans">中文简体</option>
              </RHFSelect>
              <RHFSelect native name="role" label={intl.formatMessage({id: 'User Manager-Role'})} placeholder={intl.formatMessage({id: 'User Manager-Role'})}>
                <option value="" />
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {intl.locale === 'en' ? role.lang_en : intl.locale === 'zh-Hant' ? role.lang_zh_hant : role.lang_zh_hans} 
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="remark" label={intl.formatMessage({id: 'User Manager-Remark'})} />
              <RHFTextField name="region" label={intl.formatMessage({id: 'User Manager-Region'})} />
              <RHFTextField name="center" label={intl.formatMessage({id: 'User Manager-Center'})} />
              <RHFTextField name="salary" label={intl.formatMessage({id: 'User Manager-Salary'})} />
              <RHFSelect native name="timezone" label={intl.formatMessage({id: 'User Manager-Timezone'})} placeholder={intl.formatMessage({id: 'User Manager-Timezone'})}>
                <option value="" />
                {timezones.map((timezone) => (
                  <option key={timezone.id} value={timezone.value}>
                    {timezone.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? intl.formatMessage({id: 'User Manager-Create User'}) : intl.formatMessage({id: 'User Manager-Save Changes'})}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
