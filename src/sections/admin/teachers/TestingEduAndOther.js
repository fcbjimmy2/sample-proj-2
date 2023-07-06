import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect, useMemo } from 'react';

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
  TextField,
  Container,
  MenuItem,
  Divider,
  FormLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// project imports
import { Upload } from '../../../components/upload';

// form
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// third-party
import * as yup from 'yup';
import { useIntl } from 'react-intl';

// components
import FormProvider, { RHFTextField, RHFSelect } from '../../../components/hook-form';

// utils
import axios from '../../../utils/axios';

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

const TestingEduAndOther = ({
  handleNext,
  setErrorIndex,
  teacherData,
  setTeacherData,
  handleBack,
}) => {
  const intl = useIntl();
  const [tab, setTab] = React.useState(0);
  const [file, setFile] = React.useState(null);

  const [publicExam, setPublicExam] = React.useState([]);
  const [examCountry, setExamCountry] = React.useState('');
  const [examCat, setExamCat] = React.useState([]);

  const getPublicExams = useCallback(async () => {
    try {
      const response = await axios.get('/api/lookup/lookup/public-exam');
      setPublicExam(response.data.map((item) => item.value));
      if (teacherData?.publicExamOne) {
        getCountriesExam(teacherData?.publicExamOne);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getCountriesExam = useCallback(
    async (country) => {
      try {
        const response = await axios.get(`/api/lookup/lookup/exam-${country}`);
        setExamCat(response.data.map((item) => item.value));
      } catch (error) {
        console.error(error);
      }
    },
    [examCountry]
  );

  useEffect(() => {
    getPublicExams();
  }, []);

  useEffect(() => {
    getCountriesExam(examCountry);
  }, [examCountry]);

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

  // const updateUserSchema = yup.object().shape({
  //   publicExamOne: yup.string().required('Public Examination is required'),
  //   examinationOne: yup.string().required('Required'),
  //   examYearOne: yup.string().required('Required'),
  //   examResultOne: yup.string().required('Required'),
  //   teacherSchool: yup.string().required('Required'),
  //   teacherMajor: yup.string().required('Required'),
  //   teacherCourse: yup.string().required('Required'),
  //   schoolDateFrom: yup.date().required('Date is required'),
  //   schoolDateTo: yup
  //     .date()
  //     .min(yup.ref('schoolDateFrom'), 'Date must be later than date joined')
  //     .required('Date is required'),
  //   teacherDebateClub: yup.string().required('Required'),
  //   teacherDebateYear: yup.date().required('Date is required'),
  //   teacherDebateDetails: yup.string().required('Required'),
  //   teacherCompetition: yup.string().required('Required'),
  //   teacherCompetitionYear: yup.date().required('Date is required'),
  //   teacherCompetitionResult: yup.string().required('Required'),
  //   teacherQual: yup.string().required('Required'),
  //   teacherQualProgram: yup.string().required('Required'),
  //   teacherQualOrganization: yup.string().required('Required'),
  //   teacherQualDate: yup.string().required('Required'),
  //   teacherCert: yup.string().required('Required'),
  //   teacherCertProgram: yup.string().required('Required'),
  //   teacherCertOrganization: yup.string().required('Required'),
  //   teacherCertDate: yup.string().required('Required'),
  //   teachingExpSchool: yup.string().required('Required'),
  //   teachingExpYear: yup.date().required('Date is required'),
  //   teachingExpSubj: yup.string().required('Required'),
  //   teachingExpClassSize: yup.string().required('Required'),
  //   teachingExpAgeGp: yup.string().required('Required'),
  // });

  const updateUserSchema = yup.object().shape({
    publicExamOne: yup.string().nullable().optional(),
    examinationOne: yup.string().nullable().optional(),
    examYearOne: yup.string().nullable().optional(),
    examResultOne: yup.string().nullable().optional(),
    teacherEdu: yup.array().of(
      yup.object().shape({
        teacherSchool: yup.string().required('Required'),
        teacherMajor: yup.string().required('Required'),
        teacherCourse: yup.string().required('Required'),
        schoolDateFrom: yup.lazy((value) => {
          if (value === '') {
            return yup.string().nullable().required('Required');
          }

          return yup.date().nullable().required('Required');
        }),
        schoolDateTo: yup.lazy((value) => {
          if (value === '') {
            return yup.string().nullable().required('Required');
          }

          return yup.date().nullable().required('Required');
        }),
      })
    ),
    teacherDebateClub: yup.string().nullable().optional(),
    teacherDebateYear: yup.date().nullable().optional(),
    teacherDebateDetails: yup.string().nullable().optional(),
    teacherAward: yup.array().of(
      yup.object().shape({
        teacherCompetition: yup.string().nullable().optional(),
        teacherCompetitionYear: yup.lazy((value) => {
          if (value === '') {
            return yup.string().nullable().required('Required');
          }

          return yup.date().nullable().required('Required');
        }),
        teacherCompetitionResult: yup.string().nullable().optional(),
      })
    ),
    teacherQualification: yup.array().of(
      yup.object().shape({
        teacherQual: yup.string().nullable().optional(),
        teacherQualProgram: yup.string().nullable().optional(),
        teacherQualOrganization: yup.string().nullable().optional(),
        teacherQualDate: yup.lazy((value) => {
          if (value === '') {
            return yup.string().nullable().required('Required');
          }

          return yup.date().nullable().required('Required');
        }),
      })
    ),
    teacherCertification: yup.array().of(
      yup.object().shape({
        teacherCert: yup.string().nullable().optional(),
        teacherCertProgram: yup.string().nullable().optional(),
        teacherCertOrganization: yup.string().nullable().optional(),
        teacherCertDate: yup.lazy((value) => {
          if (value === '') {
            return yup.string().nullable().required('Required');
          }

          return yup.date().nullable().required('Required');
        }),
      })
    ),
    teachingExperience: yup.array().of(
      yup.object().shape({
        teachingExpSchool: yup.string().nullable().optional(),
        teachingExpYear: yup.date().nullable().optional(),
        teachingExpSubj: yup.string().nullable().optional(),
        teachingExpClassSize: yup.string().nullable().optional(),
        teachingExpAgeGp: yup.string().nullable().optional(),
      })
    ),
  });

  const values = {
    publicExamOne: examCountry || teacherData?.publicExamOne || '',
    examinationOne: teacherData?.examinationOne || '',
    examYearOne: teacherData?.examYearOne || '',
    examResultOne: teacherData?.examResultOne || '',
    teacherSchool: teacherData?.teacherSchool || '',
    teacherMajor: teacherData?.teacherMajor || '',
    teacherCourse: teacherData?.teacherCourse || '',
    schoolDateFrom: teacherData?.schoolDateFrom || null,
    schoolDateTo: teacherData?.schoolDateTo || null,
    teacherEdu: teacherData?.teacherEdu,
    teacherDebateClub: teacherData?.teacherDebateClub || '',
    teacherDebateYear: teacherData?.teacherDebateYear || null,
    teacherDebateDetails: teacherData?.teacherDebateDetails || '',
    teacherAward: teacherData?.teacherAward,
    teacherQualification: teacherData?.teacherQualification,
    teacherCertification: teacherData?.teacherCertification,
    teachingExperience: teacherData?.teachingExperience,
    // teachingExpSchool: teacherData?.teachingExpSchool || '',
    // teachingExpYear: teacherData?.teachingExpYear || null,
    // teachingExpSubj: teacherData?.teachingExpSubj || '',
    // teachingExpClassSize: teacherData?.teachingExpClassSize || '',
    // teachingExpAgeGp: teacherData?.teachingExpAgeGp || '',
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

  const {
    fields: fieldsTeacherEdu,
    append: appendTeacherEdu,
    remove: removeTeacherEdu,
  } = useFieldArray({
    control,
    name: 'teacherEdu',
  });

  const {
    fields: fieldsTeacherAward,
    append: appendTeacherAward,
    remove: removeTeacherAward,
  } = useFieldArray({
    control,
    name: 'teacherAward',
  });

  const {
    fields: fieldsTeacherQualification,
    append: appendTeacherQualification,
    remove: removeTeacherQualification,
  } = useFieldArray({
    control,
    name: 'teacherQualification',
  });

  const {
    fields: fieldsTeacherCertification,
    append: appendTeacherCertification,
    remove: removeTeacherCertification,
  } = useFieldArray({
    control,
    name: 'teacherCertification',
  });

  const {
    fields: fieldsTeachingExperience,
    append: appendTeachingExperience,
    remove: removeTeachingExperience,
  } = useFieldArray({
    control,
    name: 'teachingExperience',
  });

  const onSubmit = async (data) => {
    console.log('-------------------HERE-------------------');
    console.log(data);
    try {
      setTeacherData((prevState) => ({
        ...prevState,
        publicExamOne: data.publicExamOne,
        examinationOne: data.examinationOne,
        examYearOne: data.examYearOne,
        examResultOne: data.examResultOne,
        teacherEdu: [...data.teacherEdu],
        teacherDebateClub: data.teacherDebateClub,
        teacherDebateYear: data.teacherDebateYear,
        teacherDebateDetails: data.teacherDebateDetails,
        teacherAward: [...data.teacherAward],
        teacherQualification: [...data.teacherQualification],
        teacherCertification: [...data.teacherCertification],
        teachingExperience: [...data.teachingExperience],
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
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Stack spacing={2}>
              <Block>
                <Grid container spacing={2} sx={{ ml: 0 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormLabel>
                      {intl.formatMessage({
                        id: 'Which of the following public examination(s) have you taken in the past?',
                      })}
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <RHFSelect
                      name="publicExamOne"
                      label={intl.formatMessage({ id: 'public-exam' })}
                      onChange={(e) => setExamCountry(e.target.value)}
                      disabled={isSubmitting}
                    >
                      <Divider sx={{ borderStyle: 'dashed' }} />
                      {publicExam.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <RHFSelect
                      name="examinationOne"
                      label={intl.formatMessage({ id: 'examination' })}
                      disabled={isSubmitting}
                    >
                      <Divider sx={{ borderStyle: 'dashed' }} />
                      {examCat.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <RHFTextField
                      name="examYearOne"
                      label={intl.formatMessage({ id: 'exam-year' })}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <RHFTextField
                      name="examResultOne"
                      label={intl.formatMessage({ id: 'exam-result' })}
                      disabled={isSubmitting}
                    />
                  </Grid>
                </Grid>
              </Block>
              <Block>
                {/* Education */}
                <Grid container spacing={2} sx={{ ml: 0 }}>
                  <Grid item xs={12} sm={12} md={12} sx={{ ml: 0, mb: 2 }}>
                    <FormLabel>
                      {intl.formatMessage({
                        id: 'Education',
                      })}
                    </FormLabel>
                  </Grid>
                  {fieldsTeacherEdu.map((field, index) => (
                    /* dynamic field  */
                    <Grid container spacing={2} sx={{ ml: 0 }} key={field.id}>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teacherEdu[${index}].teacherSchool`}
                          label={intl.formatMessage({ id: 'name of school' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teacherEdu[${index}].teacherMajor`}
                          label={intl.formatMessage({ id: 'major-course' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teacherEdu[${index}].teacherCourse`}
                          label={intl.formatMessage({ id: 'school-course' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <Block>
                          <Controller
                            name={`teacherEdu[${index}].schoolDateFrom`}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <DatePicker
                                {...field}
                                disabled={isSubmitting}
                                label={intl.formatMessage({ id: 'from' })}
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
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <Block>
                          <Controller
                            name={`teacherEdu[${index}.schoolDateTo`}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <DatePicker
                                {...field}
                                disabled={isSubmitting}
                                label={intl.formatMessage({ id: 'to' })}
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
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                          {fieldsTeacherEdu.length !== 1 && (
                            <Button
                              className="mr10"
                              onClick={() => removeTeacherEdu(index)}
                              sx={{ mb: 2 }}
                            >
                              Remove
                            </Button>
                          )}

                          {fieldsTeacherEdu.length - 1 === index && (
                            <Button
                              sx={{ mb: 2, ml: 3 }}
                              variant="contained"
                              onClick={() =>
                                appendTeacherEdu({
                                  teacherSchool: '',
                                  teacherMajor: '',
                                  teacherCourse: '',
                                  schoolDateFrom: null,
                                  schoolDateTo: null,
                                })
                              }
                            >
                              Add
                            </Button>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      {intl.formatMessage({ id: 'Upload photo' })}
                    </Typography>
                    <Upload
                      file={file}
                      onDrop={handleFileDrop}
                      accept={accept}
                      disabled={isSubmitting}
                    />
                  </Grid>
                </Grid>
                {/* Debate experience(s) */}
                <Grid container spacing={2} sx={{ ml: 0 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormLabel>
                      {intl.formatMessage({
                        id: 'debate experience(s)',
                      })}
                    </FormLabel>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <RHFTextField
                      name="teacherDebateClub"
                      label={intl.formatMessage({ id: 'program/club' })}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <Block>
                      <Controller
                        name="teacherDebateYear"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <DatePicker
                            {...field}
                            disabled={isSubmitting}
                            label={intl.formatMessage({ id: 'year' })}
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
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <RHFTextField
                      name="teacherDebateDetails"
                      label={intl.formatMessage({ id: 'details' })}
                      disabled={isSubmitting}
                    />
                  </Grid>
                </Grid>
                {/* Related Achievements/Award/Debate Competition Experience(s) */}
                <Grid container spacing={2} sx={{ ml: 0 }}>
                  <Grid item xs={12} sm={12} md={12} sx={{ ml: 0, mb: 2 }}>
                    <FormLabel>
                      {intl.formatMessage({
                        id: 'related achievements/award/debate competition experience(s)',
                      })}
                    </FormLabel>
                  </Grid>
                  {fieldsTeacherAward.map((field, index) => (
                    /* dynamic field  */
                    <Grid container spacing={2} sx={{ ml: 0 }} key={field.id}>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teacherAward[${index}].teacherCompetition`}
                          label={intl.formatMessage({ id: 'competition' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <Block>
                          <Controller
                            name={`teacherAward[${index}].teacherCompetitionYear`}
                            control={control}
                            disabled={isSubmitting}
                            render={({ field, fieldState: { error } }) => (
                              <DatePicker
                                {...field}
                                label={intl.formatMessage({ id: 'year' })}
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
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teacherAward[${index}].teacherCompetitionResult`}
                          label={intl.formatMessage({ id: 'result' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                          {fieldsTeacherAward.length !== 1 && (
                            <Button
                              className="mr10"
                              onClick={() => removeTeacherAward(index)}
                              sx={{ mb: 2 }}
                            >
                              Remove
                            </Button>
                          )}
                          {fieldsTeacherAward.length - 1 === index && (
                            <Button
                              sx={{ mb: 2, ml: 3 }}
                              variant="contained"
                              onClick={() =>
                                appendTeacherAward({
                                  teacherCompetition: '',
                                  teacherCompetitionYear: null,
                                  teacherCompetitionResult: '',
                                })
                              }
                            >
                              Add
                            </Button>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      {intl.formatMessage({ id: 'Upload photo' })}
                    </Typography>
                    <Upload
                      file={file}
                      onDrop={handleFileDrop}
                      accept={accept}
                      disabled={isSubmitting}
                    />
                  </Grid>
                </Grid>
                {/* Professional / Teaching Qualification(s) */}
                <Grid container spacing={2} sx={{ ml: 0 }}>
                  <Grid item xs={12} sm={12} md={12} sx={{ ml: 0, mb: 2 }}>
                    <FormLabel>
                      {intl.formatMessage({
                        id: 'professional/teaching qualification(s)',
                      })}
                    </FormLabel>
                  </Grid>
                  {fieldsTeacherQualification.map((field, index) => (
                    /* dynamic field  */
                    <Grid container spacing={2} sx={{ ml: 0 }} key={field.id}>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teacherQualification[${index}].teacherQual`}
                          label={intl.formatMessage({ id: 'qualification' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teacherQualification[${index}].teacherQualProgram`}
                          label={intl.formatMessage({ id: 'program' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teacherQualification[${index}].teacherQualOrganization`}
                          label={intl.formatMessage({ id: 'organization' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <Block>
                          <Controller
                            name={`teacherQualification[${index}].teacherQualDate`}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <DatePicker
                                {...field}
                                disabled={isSubmitting}
                                label={intl.formatMessage({ id: 'date' })}
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
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                          {fieldsTeacherQualification.length !== 1 && (
                            <Button
                              className="mr10"
                              onClick={() => removeTeacherQualification(index)}
                              sx={{ mb: 2 }}
                            >
                              Remove
                            </Button>
                          )}
                          {fieldsTeacherQualification.length - 1 === index && (
                            <Button
                              sx={{ mb: 2, ml: 3 }}
                              variant="contained"
                              onClick={() =>
                                appendTeacherQualification({
                                  teacherQual: '',
                                  teacherQualProgram: '',
                                  teacherQualOrganization: '',
                                  teacherQualDate: null,
                                })
                              }
                            >
                              Add
                            </Button>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      {intl.formatMessage({ id: 'Upload photo' })}
                    </Typography>
                    <Upload
                      file={file}
                      onDrop={handleFileDrop}
                      accept={accept}
                      disabled={isSubmitting}
                    />
                  </Grid>
                </Grid>
                {/* Certification (eg. TOEFL/TEFL) */}
                <Grid container spacing={2} sx={{ ml: 0 }}>
                  <Grid item xs={12} sm={12} md={12} sx={{ ml: 0, mb: 2 }}>
                    <FormLabel>
                      {intl.formatMessage({
                        id: 'certification (e.g. TOEFL/TEFL)',
                      })}
                    </FormLabel>
                  </Grid>
                  {fieldsTeacherCertification.map((field, index) => (
                    /* dynamic field  */
                    <Grid container spacing={2} sx={{ ml: 0 }} key={field.id}>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teacherCertification[${index}].teacherCert`}
                          label={intl.formatMessage({ id: 'certification' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teacherCertification[${index}].teacherCertProgram`}
                          label={intl.formatMessage({ id: 'program' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teacherCertification[${index}].teacherCertOrganization`}
                          label={intl.formatMessage({ id: 'organization' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <Block>
                          <Controller
                            name={`teacherCertification[${index}].teacherCertDate`}
                            control={control}
                            disabled={isSubmitting}
                            render={({ field, fieldState: { error } }) => (
                              <DatePicker
                                {...field}
                                label={intl.formatMessage({ id: 'date' })}
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
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                          {fieldsTeacherCertification.length !== 1 && (
                            <Button
                              className="mr10"
                              onClick={() => removeTeacherCertification(index)}
                              sx={{ mb: 2 }}
                            >
                              Remove
                            </Button>
                          )}
                          {fieldsTeacherCertification.length - 1 === index && (
                            <Button
                              sx={{ mb: 2, ml: 3 }}
                              variant="contained"
                              onClick={() =>
                                appendTeacherCertification({
                                  teacherQual: '',
                                  teacherQualProgram: '',
                                  teacherQualOrganization: '',
                                  teacherQualDate: null,
                                })
                              }
                            >
                              Add
                            </Button>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                      {intl.formatMessage({ id: 'Upload photo' })}
                    </Typography>
                    <Upload
                      file={file}
                      onDrop={handleFileDrop}
                      accept={accept}
                      disabled={isSubmitting}
                    />
                  </Grid>
                </Grid>
                {/* Teaching Experience(s) */}
                <Grid container spacing={2} sx={{ ml: 0 }}>
                  <Grid item xs={12} sm={12} md={12} sx={{ ml: 0, mb: 2 }}>
                    <FormLabel>
                      {intl.formatMessage({
                        id: 'teaching experience(s)',
                      })}
                    </FormLabel>
                  </Grid>
                  {fieldsTeachingExperience.map((field, index) => (
                    /* dynamic field  */
                    <Grid container spacing={2} sx={{ ml: 0 }} key={field.id}>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teachingExperience[${index}].teachingExpSchool`}
                          label={intl.formatMessage({ id: 'school/program' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <Block>
                          <Controller
                            name={`teachingExperience[${index}].teachingExpYear`}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <DatePicker
                                {...field}
                                disabled={isSubmitting}
                                label={intl.formatMessage({ id: 'year' })}
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
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teachingExperience[${index}].teachingExpSubj`}
                          label={intl.formatMessage({ id: 'subject' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teachingExperience[${index}].teachingExpClassSize`}
                          label={intl.formatMessage({ id: 'class size' })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} md={4}>
                        <RHFTextField
                          name={`teachingExperience[${index}].teachingExpAgeGp`}
                          label={intl.formatMessage({ id: `student's age group` })}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                          {fieldsTeachingExperience.length !== 1 && (
                            <Button
                              className="mr10"
                              onClick={() => removeTeachingExperience(index)}
                              sx={{ mb: 2 }}
                            >
                              Remove
                            </Button>
                          )}
                          {fieldsTeachingExperience.length - 1 === index && (
                            <Button
                              sx={{ mb: 2, ml: 3 }}
                              variant="contained"
                              onClick={() =>
                                appendTeachingExperience({
                                  teachingExpSchool: '',
                                  teachingExpYear: null,
                                  teachingExpSubj: '',
                                  teachingExpClassSize: '',
                                  teachingExpAgeGp: '',
                                })
                              }
                            >
                              Add
                            </Button>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Block>
            </Stack>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
              Back
            </Button>
            <Button
              variant="contained"
              sx={{ my: 3, mx: 1 }}
              type="submit"
              onClick={() => setErrorIndex(2)}
            >
              {intl.formatMessage({ id: 'next' })}
            </Button>
          </Stack>
        </Grid>
      </FormProvider>
    </Container>
  );
};

TestingEduAndOther.propTypes = {
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

export default TestingEduAndOther;
