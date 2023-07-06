'use client';

import React, { useCallback, useEffect } from 'react';

// material-ui
import { Step, Stepper, StepLabel, Card, Typography } from '@mui/material';

// layouts
import AdminLayout from '../../../src/layouts/admin';

// project imports
import {
  PersonalData,
  ContactDetails,
  EduAndOther,
  OtherInformation,
  TeacherAvailability,
  RegistrationSubmitted,
  TestingEduAndOther,
} from '../../../src/sections/admin/teachers';

// third-party
import { useIntl } from 'react-intl';

// utils
import axios from '../../../src/utils/axios';

const getStepContent = (
  step,
  handleNext,
  handleBack,
  setErrorIndex,
  teacherData,
  setTeacherData,
  publicExams,
  exams,
  setExams
) => {
  switch (step) {
    case 0:
      return (
        <PersonalData
          handleNext={handleNext}
          setErrorIndex={setErrorIndex}
          teacherData={teacherData}
          setTeacherData={setTeacherData}
        />
      );
    case 1:
      return (
        <ContactDetails
          handleNext={handleNext}
          setErrorIndex={setErrorIndex}
          teacherData={teacherData}
          setTeacherData={setTeacherData}
          handleBack={handleBack}
        />
      );
    case 2:
      return (
        <EduAndOther
          handleNext={handleNext}
          setErrorIndex={setErrorIndex}
          teacherData={teacherData}
          setTeacherData={setTeacherData}
          handleBack={handleBack}
          publicExams={publicExams}
          exams={exams}
          setExams={setExams}
        />
      );
    case 3:
      return (
        <OtherInformation
          handleNext={handleNext}
          setErrorIndex={setErrorIndex}
          teacherData={teacherData}
          setTeacherData={setTeacherData}
          handleBack={handleBack}
          exams={exams}
        />
      );
    case 4:
      return (
        <TeacherAvailability
          handleNext={handleNext}
          setErrorIndex={setErrorIndex}
          teacherData={teacherData}
          setTeacherData={setTeacherData}
          handleBack={handleBack}
        />
      );
    default:
      return <RegistrationSubmitted />;
    //throw new Error('Unknown step');
  }
};

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const Teacher_Registration = () => {
  const intl = useIntl();
  const [publicExams, setPublicExams] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [exams, setExams] = React.useState([]);
  const [teacherData, setTeacherData] = React.useState({
    teacherEdu: [
      {
        teacherSchool: '',
        teacherMajor: '',
        teacherCourse: '',
        schoolDateFrom: null,
        schoolDateTo: null,
      },
    ],
    teacherAward: [
      {
        teacherCompetition: '',
        teacherCompetitionYear: null,
        teacherCompetitionResult: '',
      },
    ],
    teacherQualification: [
      {
        teacherQual: '',
        teacherQualProgram: '',
        teacherQualOrganization: '',
        teacherQualDate: null,
      },
    ],
    teacherCertification: [
      {
        teacherCert: '',
        teacherCertProgram: '',
        teacherCertOrganization: '',
        teacherCertDate: null,
      },
    ],
    teachingExperience: [
      {
        teachingExpSchool: '',
        teachingExpYear: null,
        teachingExpSubj: '',
        teachingExpClassSize: '',
        teachingExpAgeGp: '',
      },
    ],
  });
  const [errorIndex, setErrorIndex] = React.useState(null);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setErrorIndex(null);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getPublicExams = useCallback(async () => {
    try {
      const response = await axios.get('/api/lookup/lookup/public-exam');
      setPublicExams(response.data.map((item) => item.value));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getPublicExams();
  }, []);

  // step options
  const steps = [
    intl.formatMessage({ id: 'personal-data' }),
    intl.formatMessage({ id: 'contact-details' }),
    intl.formatMessage({ id: 'education-and-other-qualifications' }),
    intl.formatMessage({ id: 'other-information' }),
    intl.formatMessage({ id: 'availability' }),
  ];

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        {intl.formatMessage({ id: 'teacher-registration' })}
      </Typography>

      <Card sx={{ p: 3 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const labelProps = {};

            if (index === errorIndex) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  Error
                </Typography>
              );

              labelProps.error = true;
            }

            return (
              <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {getStepContent(
          activeStep,
          handleNext,
          handleBack,
          setErrorIndex,
          teacherData,
          setTeacherData,
          publicExams,
          exams,
          setExams
        )}
      </Card>
    </AdminLayout>
  );
};

export default Teacher_Registration;
