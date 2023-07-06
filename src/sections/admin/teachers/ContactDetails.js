import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect } from 'react';

// material-ui
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Link,
  Stack,
  Tab,
  Tabs,
  Typography,
  FormControlLabel,
  TextField,
  Container,
  MenuItem,
  Divider,
} from '@mui/material';

// project imports
import { Upload } from '../../../components/upload';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// third-party
import * as yup from 'yup';
import { useIntl } from 'react-intl';

// components
import FormProvider, { RHFTextField, RHFCheckbox, RHFSelect } from '../../../components/hook-form';

// utils
import axios from '../../../utils/axios';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

const ContactDetails = ({ handleBack, handleNext, setErrorIndex, teacherData, setTeacherData }) => {
  const intl = useIntl();
  const [tab, setTab] = useState(0);
  const [file, setFile] = useState(null);

  const [countryList, setCountryList] = useState([]);
  const [timeZone, setTimeZone] = useState([]);

  const initialize = useCallback(async () => {
    try {
      const request1 = axios.get('/api/teachers/select/teacher_country');
      const request2 = axios.get('/api/teachers/select/teacher_time_zone');
      const [res1, res2] = await Promise.all([request1, request2]);
      setCountryList(res1.data);
      setTimeZone(res2.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [intl]);

  const accept = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/gif': ['.gif'],
  };

  const isDecimal = (val) => {
    let regex = /^[0-9]+(\.[0-9]{0,2})?$/;
    if (val != undefined) {
      return regex.test(val);
    }
    return true;
  };

  const updateUserSchema = yup.object().shape({
    location: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    addressDetails: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    timeZone: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    phoneNumber: yup
      .number()
      .typeError('This field must be numerical')
      .required(intl.formatMessage({ id: 'This field is required' })),
    countryCode: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    emailAddress: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    emergencyContactName: yup.string().nullable().optional(),
    emergencyContactPhone: yup
      .number()
      .typeError('This field must be numerical')
      .optional()
      .nullable()
      .transform((_, val) => (val !== '' ? Number(val) : null)),
    emergencyContactRelation: yup.string().nullable().optional(),
  });

  // const updateUserSchema = yup.object().shape({
  //   location: yup.string().nullable().optional(),
  //   addressDetails: yup.string().nullable().optional(),
  //   timeZone: yup.string().nullable().optional(),
  //   phoneNumber: yup.string().nullable().optional(),
  //   countryCode: yup.string().nullable().optional(),
  //   emailAddress: yup.string().nullable().optional(),
  //   emergencyContactName: yup.string().nullable().optional(),
  //   emergencyContactPhone: yup.string().nullable().optional(),
  //   emergencyContactRelation: yup.string().nullable().optional(),
  // });

  const values = {
    location: teacherData?.location || '',
    addressDetails: teacherData?.addressDetails || '',
    timeZone: teacherData?.timeZone || '',
    phoneNumber: teacherData?.phoneNumber || '',
    countryCode: teacherData?.countryCode || '',
    emailAddress: teacherData?.emailAddress || '',
    emergencyContactName: teacherData?.emergencyContactName || '',
    emergencyContactPhone: teacherData?.emergencyContactPhone || '',
    emergencyContactRelation: teacherData?.emergencyContactRelation || '',
  };

  const methods = useForm({
    resolver: yupResolver(updateUserSchema),
    values,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setTeacherData((prevState) => ({
        ...prevState,
        location: data.location,
        addressDetails: data.addressDetails,
        timeZone: data.timeZone,
        phoneNumber: data.phoneNumber,
        countryCode: data.countryCode,
        emailAddress: data.emailAddress,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        emergencyContactRelation: data.emergencyContactRelation,
      }));
      handleNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} lg={6}>
            <Stack spacing={2}>
              <Block>
                <RHFSelect
                  name="location"
                  label={intl.formatMessage({ id: 'location' })}
                  disabled={isSubmitting}
                >
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  {countryList.map((option, index) => (
                    <MenuItem key={index} value={option.country}>
                      {option.country}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Block>
              <Block>
                <RHFTextField
                  name="addressDetails"
                  label={intl.formatMessage({ id: 'address' })}
                  disabled={isSubmitting}
                />
              </Block>
              <Block>
                <RHFSelect
                  name="timeZone"
                  label={intl.formatMessage({ id: 'timezone' })}
                  disabled={isSubmitting}
                >
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  {timeZone.map((option, index) => (
                    <MenuItem key={index} value={option.time_zone}>
                      {option.time_zone}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Block>
              <Block>
                <RHFTextField
                  name="phoneNumber"
                  label={intl.formatMessage({ id: 'phone-number' })}
                  disabled={isSubmitting}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="countryCode"
                  label={intl.formatMessage({ id: 'country-code' })}
                  disabled={isSubmitting}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="emailAddress"
                  label={intl.formatMessage({ id: 'email-address' })}
                  disabled={isSubmitting}
                />
              </Block>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Block>
                <RHFTextField
                  name="emergencyContactName"
                  label={intl.formatMessage({ id: 'emergency-contact-name' })}
                  disabled={isSubmitting}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="emergencyContactPhone"
                  label={intl.formatMessage({ id: 'emergency-contact-phone' })}
                  disabled={isSubmitting}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="emergencyContactRelation"
                  label={intl.formatMessage({ id: 'emergency-contact-relation' })}
                  disabled={isSubmitting}
                />
              </Block>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                Back
              </Button>
              <Button
                variant="contained"
                sx={{ my: 3 }}
                type="submit"
                onClick={() => setErrorIndex(1)}
              >
                {intl.formatMessage({ id: 'next' })}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
};

ContactDetails.propTypes = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  setErrorIndex: PropTypes.func,
  teacherData: PropTypes.object,
  setTeacherData: PropTypes.func,
};

Block.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

function Block({ sx, children }) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      {children}
    </Stack>
  );
}

export default ContactDetails;
