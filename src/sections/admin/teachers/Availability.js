import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

// material-ui
import { Button, Grid, Stack, Container, Divider, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// project imports
import { Upload } from '../../../components/upload';

// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// third-party
import * as yup from 'yup';
import { useIntl } from 'react-intl';

// components
import FormProvider, { RHFTextField, RHFSelect } from '../../../components/hook-form';

// utils
import axios from '../../../utils/axios';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

const TeacherAvailability = ({
  handleNext,
  setErrorIndex,
  teacherData,
  setTeacherData,
  handleBack,
}) => {
  const intl = useIntl();
  const [tab, setTab] = React.useState(0);
  const [file, setFile] = React.useState(null);
  const [currencies, setCurrencies] = useState([]);

  const secondHandleBack = (values) => {
    // console.log(values);
    // setTeacherData((prevState) => ({ ...prevState, ...values }));
    handleBack();
  };

  const isDecimal = (val) => {
    let regex = /^[0-9]+(\.[0-9]{0,2})?$/;
    if (val != undefined) {
      return regex.test(val);
    }
    return true;
  };

  const getCurrency = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/lookup/lookup/currency');
      setCurrencies(data.map((item) => item.value));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getCurrency();
  }, []);

  // const updateUserSchema = yup.object().shape({
  //   availableDate: yup.string().nullable().optional(),
  //   contractType: yup.string().nullable().optional(),
  //   jobHoursPerWeek: yup.string().nullable().optional(),
  //   hourPayExpted: yup.string().nullable().optional(),
  //   payCurrency: yup.string().nullable().optional(),
  // });

  const updateUserSchema = yup.object().shape({
    availableDate: yup.date().required('Date is required'),
    contractType: yup.string().nullable().optional(),
    jobHoursPerWeek: yup
      .number()
      .typeError('This field must be numerical')
      .required('This field is required'),
    hourPayExpted: yup
      .string()
      .required('This field is required')
      .test('is-decimal', 'Price is invalid', isDecimal),
    payCurrency: yup.string().nullable().optional(),
  });

  const values = {
    availableDate: teacherData?.availableDate || null,
    contractType: teacherData?.contractType || '',
    jobHoursPerWeek: teacherData?.jobHoursPerWeek || '',
    hourPayExpted: teacherData?.hourPayExpted || '',
    payCurrency: teacherData?.payCurrency || '',
  };

  const methods = useForm({
    resolver: yupResolver(updateUserSchema),
    values,
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(teacherData);
      const values = {
        ...teacherData,
        availableDate: data.availableDate,
        contractType: data.contractType,
        jobHoursPerWeek: data.jobHoursPerWeek,
        hourPayExpted: data.hourPayExpted,
        payCurrency: data.payCurrency,
        action: 'create',
      };
      const res = await axios.post('/api/teachers/registration', values);
      if (res.status === 204) handleNext();
      //reset form
      //reset teacherData
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Block>
                <Controller
                  name="availableDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label={intl.formatMessage({ id: 'available date' })}
                      inputFormat="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          variant: 'outlined',
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="contractType"
                  label={intl.formatMessage({ id: 'full-time/part-time' })}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="jobHoursPerWeek"
                  label={intl.formatMessage({ id: 'available hours per week' })}
                />
              </Block>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Block>
                <RHFTextField
                  name="hourPayExpted"
                  label={intl.formatMessage({ id: 'exp hourly pay with currency' })}
                />
              </Block>
              <Block>
                <RHFSelect name="payCurrency" label={intl.formatMessage({ id: 'currency' })}>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  {currencies.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Block>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button
                onClick={() => {
                  const values = getValues();
                  secondHandleBack(values);
                }}
                sx={{ my: 3, ml: 1 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                sx={{ my: 3 }}
                type="submit"
                onClick={() => setErrorIndex(null)}
              >
                {intl.formatMessage({ id: 'submit' })}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
};

TeacherAvailability.propTypes = {
  handleNext: PropTypes.func,
  setErrorIndex: PropTypes.func,
  teacherData: PropTypes.object,
  setTeacherData: PropTypes.func,
  handleBack: PropTypes.func,
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

export default TeacherAvailability;
