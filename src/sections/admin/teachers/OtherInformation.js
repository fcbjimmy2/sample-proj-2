import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
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

// project imports
import { Upload } from '../../../components/upload';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// third-party
import * as yup from 'yup';
import { useIntl } from 'react-intl';

// components
import FormProvider, {
  RHFTextField,
  RHFCheckbox,
  RHFRadioGroup,
} from '../../../components/hook-form';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

const OtherInformation = ({
  handleBack,
  handleNext,
  setErrorIndex,
  teacherData,
  setTeacherData,
  exams,
}) => {
  const intl = useIntl();
  const [tab, setTab] = React.useState(0);
  const [file, setFile] = React.useState(null);
  const [showQuestions, setShowQuestions] = React.useState('');

  useEffect(() => {
    if (teacherData?.aii !== undefined) {
      setShowQuestions(teacherData?.aii);
    }
  }, []);
  console.log('teacherData:');
  console.log(teacherData);
  console.log('exams:');
  console.log(exams);
  // useEffect(() => {
  //   console.log(showQuestions);
  // }, [showQuestions]);

  const isDecimal = (val) => {
    let regex = /^[0-9]+(\.[0-9]{0,2})?$/;
    if (val != undefined) {
      return regex.test(val);
    }
    return true;
  };

  const updateUserSchema = yup.object().shape({
    guilty: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    guiltyText: yup.string().nullable().optional(),
    discharged: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    dischargedText: yup.string().nullable().optional(),
    enquiry: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    enquiryFullName: yup.string().nullable().optional(),
    enquiryTitle: yup.string().nullable().optional(),
    enquiryCompany: yup.string().nullable().optional(),
    enquiryPhone: yup.string().nullable().optional(),
    enquiryEmail: yup.string().nullable().optional(),
    aii: yup.string().required(intl.formatMessage({ id: 'This field is required' })),
    aiiName: yup.string().nullable().optional(),
    aiiDept: yup.string().nullable().optional(),
    aiiPosition: yup.string().nullable().optional(),
  });

  //FOR DEVELOPMENT
  // const updateUserSchema = yup.object().shape({
  //   guilty: yup.string().nullable().optional(),
  //   guiltyText: yup.string().nullable().optional(),
  //   discharged: yup.string().nullable().optional(),
  //   dischargedText: yup.string().nullable().optional(),
  //   enquiry: yup.string().nullable().optional(),
  //   enquiryFullName: yup.string().nullable().optional(),
  //   enquiryTitle: yup.string().nullable().optional(),
  //   enquiryCompany: yup.string().nullable().optional(),
  //   enquiryPhone: yup.string().nullable().optional(),
  //   enquiryEmail: yup.string().nullable().optional(),
  //   aii: yup.string().nullable().optional(),
  //   aiiName: yup.string().nullable().optional(),
  //   aiiDept: yup.string().nullable().optional(),
  //   aiiPosition: yup.string().nullable().optional(),
  // });

  const values = {
    guilty: teacherData?.guilty || '',
    guiltyText: teacherData?.guiltyText || '',
    discharged: teacherData?.discharged || '',
    dischargedText: teacherData?.dischargedText || '',
    enquiry: teacherData?.enquiry || '',
    enquiryFullName: teacherData?.enquiryFullName || '',
    enquiryTitle: teacherData?.enquiryTitle || '',
    enquiryCompany: teacherData?.enquiryCompany || '',
    enquiryPhone: teacherData?.enquiryPhone || '',
    enquiryEmail: teacherData?.enquiryEmail || '',
    aii: teacherData?.aii || '',
    aiiName: teacherData?.aiiName || '',
    aiiDept: teacherData?.aiiDept || '',
    aiiPosition: teacherData?.aiiPosition || '',
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
        guilty: data.guilty,
        guiltyText: data.guiltyText,
        discharged: data.discharged,
        dischargedText: data.dischargedText,
        enquiry: data.enquiry,
        enquiryFullName: data.enquiryFullName,
        enquiryTitle: data.enquiryTitle,
        enquiryCompany: data.enquiryCompany,
        enquiryPhone: data.enquiryPhone,
        enquiryEmail: data.enquiryEmail,
        aii: showQuestions,
        aiiName: data.aiiName,
        aiiDept: data.aiiDept,
        aiiPosition: data.aiiPosition,
      }));
      handleNext();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowQuestions = (value) => {
    setShowQuestions(value);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} lg={6}>
            <Stack spacing={2}>
              <Block>
                <RHFRadioGroup
                  row
                  name="guilty"
                  label={intl.formatMessage({ id: 'other-information-q-one' })}
                  spacing={4}
                  options={[
                    { value: 'Yes', label: intl.formatMessage({ id: 'Yes' }) },
                    { value: 'No', label: intl.formatMessage({ id: 'No' }) },
                  ]}
                />
              </Block>
              <Block>
                <RHFTextField name="guiltyText" label={intl.formatMessage({ id: 'particulars' })} />
              </Block>
              <Block>
                <RHFRadioGroup
                  row
                  name="discharged"
                  label={intl.formatMessage({ id: 'other-information-q-two' })}
                  spacing={4}
                  options={[
                    { value: 'Yes', label: intl.formatMessage({ id: 'Yes' }) },
                    { value: 'No', label: intl.formatMessage({ id: 'No' }) },
                  ]}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="dischargedText"
                  label={intl.formatMessage({ id: 'particulars' })}
                />
              </Block>
              <Block>
                <RHFRadioGroup
                  row
                  name="enquiry"
                  label={intl.formatMessage({ id: 'other-information-q-three' })}
                  spacing={4}
                  options={[
                    { value: 'Yes', label: intl.formatMessage({ id: 'Yes' }) },
                    { value: 'No', label: intl.formatMessage({ id: 'No' }) },
                  ]}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="enquiryFullName"
                  label={intl.formatMessage({ id: 'full-name' })}
                />
              </Block>
              <Block>
                <RHFTextField name="enquiryCompany" label={intl.formatMessage({ id: 'company' })} />
              </Block>
              <Block>
                <RHFTextField name="enquiryTitle" label={intl.formatMessage({ id: 'job-title' })} />
              </Block>
              <Block>
                <RHFTextField
                  name="enquiryPhone"
                  label={intl.formatMessage({ id: 'phone-number' })}
                />
              </Block>
              <Block>
                <RHFTextField
                  name="enquiryEmail"
                  label={intl.formatMessage({ id: 'email-address' })}
                />
              </Block>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Block>
                <RHFRadioGroup
                  row
                  name="aii"
                  label={intl.formatMessage({ id: 'other-information-q-four' })}
                  spacing={4}
                  options={[
                    { value: 'Yes', label: intl.formatMessage({ id: 'Yes' }) },
                    { value: 'No', label: intl.formatMessage({ id: 'No' }) },
                  ]}
                  onClick={(e) => handleShowQuestions(e.target.value)}
                />
              </Block>
              {showQuestions === 'Yes' ? (
                <>
                  <Block>
                    <RHFTextField name="aiiName" label={intl.formatMessage({ id: 'full-name' })} />
                  </Block>
                  <Block>
                    <RHFTextField name="aiiDept" label={intl.formatMessage({ id: 'department' })} />
                  </Block>
                  <Block>
                    <RHFTextField
                      name="aiiPosition"
                      label={intl.formatMessage({ id: 'job-position' })}
                    />
                  </Block>
                </>
              ) : (
                <></>
              )}
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
                onClick={() => setErrorIndex(3)}
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

OtherInformation.propTypes = {
  handleNext: PropTypes.func,
  setErrorIndex: PropTypes.func,
  teacherData: PropTypes.object,
  setTeacherData: PropTypes.func,
  handleBack: PropTypes.func,
  exams: PropTypes.array,
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

export default OtherInformation;
