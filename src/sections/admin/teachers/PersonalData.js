import PropTypes from 'prop-types';
import React from 'react';
import dynamic from 'next/dynamic';

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
} from '@mui/material';
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
import FormProvider, { RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

const PersonalData = ({ handleNext, setErrorIndex, teacherData, setTeacherData }) => {
  const intl = useIntl();
  const [tab, setTab] = React.useState(0);
  const [file, setFile] = React.useState(null);

  const handleFileDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      try {
        console.log(acceptedFiles[0].type);
        var formdata = new FormData();
        formdata.append('file', acceptedFiles[0]);

        var requestOptions = {
          method: 'POST',
          body: formdata,
        };

        await fetch('/api/files', requestOptions);
        setFile({
          preview: URL.createObjectURL(acceptedFiles[0]),
        });
      } catch (error) {
        console.log('error', error);
      }
    }
  };

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
    positionAppliedFor: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    fullName: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    firstName: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    middleName: yup.string().nullable().optional(),
    lastName: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    chineseName: yup.string().nullable().optional(),
    nationality: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    dateOfBirth: yup.date().required(intl.formatMessage({ id: 'This field is required' })),
    placeOfBirth: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    teacherGender: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
  });



  // const updateUserSchema = yup.object().shape({
  //   positionAppliedFor: yup.string().nullable().optional(),
  //   fullName: yup.string().nullable().optional(),
  //   firstName: yup.string().nullable().optional(),
  //   middleName: yup.string().nullable().optional(),
  //   lastName: yup.string().nullable().optional(),
  //   chineseName: yup.string().nullable().optional(),
  //   nationality: yup.string().nullable().optional(),
  //   dateOfBirth: yup.date().nullable().optional(),
  //   placeOfBirth: yup.string().nullable().optional(),
  //   teacherGender: yup.string().nullable().optional(),
  // });

  const values = {
    positionAppliedFor: teacherData?.positionAppliedFor || '',
    fullName: teacherData?.fullName || '',
    firstName: teacherData?.firstName || '',
    middleName: teacherData?.middleName || '',
    lastName: teacherData?.lastName || '',
    chineseName: teacherData?.chineseName || '',
    nationality: teacherData?.nationality || '',
    dateOfBirth: teacherData?.dateOfBirth || null,
    placeOfBirth: teacherData?.placeOfBirth || '',
    teacherGender: teacherData?.teacherGender || '',
    userPhoto: teacherData?.userPhoto || '',
  };

  const methods = useForm({
    resolver: yupResolver(updateUserSchema),
    values,
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setTeacherData((prevState) => ({
        ...prevState,
        positionAppliedFor: data.positionAppliedFor,
        fullName: data.fullName,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        chineseName: data.chineseName,
        nationality: data.nationality,
        dateOfBirth: data.dateOfBirth,
        placeOfBirth: data.placeOfBirth,
        teacherGender: data.teacherGender,
        userPhoto: data.userPhoto,
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
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Stack spacing={2}>
              <Block>
                <RHFTextField
                  name="teacherCode"
                  disabled
                  value={`** ${intl.formatMessage({ id: 'System Generate' })} **`}
                  label={intl.formatMessage({ id: 'teacher-code' })}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="positionAppliedFor"
                  label={intl.formatMessage({ id: 'position-applied' })}
                  disabled={isSubmitting}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="fullName"
                  label={intl.formatMessage({ id: 'full-name' })}
                  disabled={isSubmitting}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="firstName"
                  label={intl.formatMessage({ id: 'first-name' })}
                  disabled={isSubmitting}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="middleName"
                  label={intl.formatMessage({ id: 'middle-name' })}
                  disabled={isSubmitting}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="lastName"
                  label={intl.formatMessage({ id: 'last-name' })}
                  disabled={isSubmitting}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="chineseName"
                  label={intl.formatMessage({ id: 'chinese-name' })}
                  disabled={isSubmitting}
                />
              </Block>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Block>
                <RHFTextField
                  name="nationality"
                  label={intl.formatMessage({ id: 'nationality' })}
                  disabled={isSubmitting}
                />
              </Block>
              <Block>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      disabled={isSubmitting}
                      {...field}
                      label={intl.formatMessage({ id: 'date of birth' })}
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
                  name="placeOfBirth"
                  label={intl.formatMessage({ id: 'place of birth' })}
                  disabled={isSubmitting}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="teacherGender"
                  label={intl.formatMessage({ id: 'Gender' })}
                  disabled={isSubmitting}
                />
              </Block>
              <Block>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  {intl.formatMessage({ id: 'Upload photo' })}
                </Typography>
                <Upload
                  file={file}
                  onDrop={handleFileDrop}
                  accept={accept}
                  disabled={isSubmitting}
                />
              </Block>
            </Stack>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="flex-end" alignContent="flex-end" sx={{ my: 2 }}>
          <Button variant="contained" sx={{ mx: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
            {intl.formatMessage({ id: 'next' })}
          </Button>
        </Stack>
      </FormProvider>
    </Container>
  );
};

PersonalData.propTypes = {
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

export default PersonalData;
