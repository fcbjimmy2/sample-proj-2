import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from '../../../src/utils/axios';

// material-ui
import {
  Button,
  Autocomplete,
  FormLabel,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// project imports
import MainCard from '../../../src/components/cards/MainCard';

// third-party
import { useIntl } from 'react-intl';

// layouts
import AdminLayout from '../../../src/layouts/admin';

export default function Students_Registration() {
  const intl = useIntl();
  const [channel, setChannel] = React.useState([]);
  const [proficiency, setProficiency] = React.useState([]);

  useEffect(() => {
    axios.get('/api/lookup/lookup/proficiency').then((response) => {
      setProficiency(response.data.map((item) => item.value));
    });
    axios.get('/api/lookup/lookup/channel').then((response) => {
      setChannel(response.data.map((item) => item.value));
    });
  }, []);

  const validationSchema = yup.object({
    english_school: yup.string().required(),
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'Enter a valid email' }))
      .required(intl.formatMessage({ id: 'This field is required' })),
    fullName: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    date_of_birth: yup.date().required(),
  });

  const formik = useFormik({
    initialValues: {
      guid: '',
      english_school: '',
      email: '',
      fullName: '',
      date_of_birth: null,
      mobile: '',
      proficiency_level_self: '',
      school: '',
      preferred_channel: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/student/registration', values);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <MainCard title={intl.formatMessage({ id: 'Students Registration' })}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel component="legend">{intl.formatMessage({ id: 'Student Code' })}</FormLabel>
              <TextField
                disabled
                sx={{ userSelect: 'none' }}
                label={`** ${intl.formatMessage({ id: 'System Generate' })} **`}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl
              component="fieldset"
              error={formik.touched.english_school && Boolean(formik.errors.english_school)}
            >
              <FormLabel component="legend">
                {intl.formatMessage({ id: 'English School' })}
              </FormLabel>
              <RadioGroup
                row
                aria-label="english_school"
                name="english_school"
                value={formik.values.english_school}
                onChange={formik.handleChange}
                error={formik.touched.english_school && Boolean(formik.errors.english_school)}
                helperText={formik.touched.english_school && formik.errors.english_school}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label={intl.formatMessage({ id: 'Yes' })}
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label={intl.formatMessage({ id: 'No' })}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            >
              <FormLabel component="legend">{intl.formatMessage({ id: 'Full Name' })}</FormLabel>
              <TextField
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel component="legend">
                {intl.formatMessage({ id: 'Date of Birth' })}
              </FormLabel>
              <DatePicker
                name="date_of_birth"
                value={formik.values.date_of_birth}
                onChange={(val) => {
                  formik.setFieldValue('date_of_birth', val);
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth error={formik.touched.email && Boolean(formik.errors.email)}>
              <FormLabel component="legend">{intl.formatMessage({ id: 'Email' })}</FormLabel>
              <TextField
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              fullWidth
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            >
              <FormLabel component="legend">{intl.formatMessage({ id: 'Mobile' })}</FormLabel>
              <TextField
                name="mobile"
                type="number"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              fullWidth
              error={
                formik.touched.proficiency_level_self &&
                Boolean(formik.errors.proficiency_level_self)
              }
            >
              <FormLabel component="legend">
                {intl.formatMessage({ id: 'Proficiency Level' })}
              </FormLabel>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Autocomplete
                    options={proficiency}
                    value={formik.values.proficiency_level_self}
                    onChange={(e, value) => formik.setFieldValue('proficiency_level_self', value)}
                    onBlur={formik.handleBlur}
                    renderInput={(params) => <TextField {...params} label="" />}
                  />
                </Grid>
              </Grid>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel component="legend">{intl.formatMessage({ id: 'School' })}</FormLabel>
              <TextField
                name="school"
                value={formik.values.school}
                onChange={formik.handleChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel component="legend">
                {intl.formatMessage({ id: 'Preferred Channel' })}
              </FormLabel>
              <Autocomplete
                options={channel}
                value={formik.values.preferred_channel}
                onChange={(e, value) => formik.setFieldValue('preferred_channel', value)}
                onBlur={formik.handleBlur}
                renderInput={(params) => <TextField {...params} label="" />}
              />
            </FormControl>
          </Grid>

          <Button color="primary" variant="contained" type="submit" sx={{ mt: 3, ml: 2 }}>
            {intl.formatMessage({ id: 'Save' })}
          </Button>
        </Grid>
      </MainCard>
    </form>
  );
}

// ----------------------------------------------------------------------

Students_Registration.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
