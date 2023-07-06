// data
import { teacherDb } from '../../../database';
// API Guard
import { apiAuthGuard } from '../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
  apiAuthGuard(req, res, ['POST'], async (i18n, loggedInUser) => {
    try {
      const { method, body } = req;
      const {
        action,
        positionAppliedFor,
        fullName,
        firstName,
        middleName,
        lastName,
        chineseName,
        userPhoto,
        nationality,
        dateOfBirth,
        placeOfBirth,
        teacherGender,
        location,
        addressDetails,
        timeZone,
        phoneNumber,
        countryCode,
        emailAddress,
        emergencyContactName,
        emergencyContactPhone,
        emergencyContactRelation,
        publicExam,
        examination,
        examYear,
        examResult,
        teacherEdu,
        teacherDebateClub,
        teacherDebateYear,
        teacherDebateDetails,
        teacherAward,
        teacherQualification,
        teacherCertification,
        teachingExperience,
        guilty,
        guiltyText,
        discharged,
        dischargedText,
        enquiry,
        enquiryFullName,
        enquiryTitle,
        enquiryCompany,
        enquiryPhone,
        enquiryEmail,
        aii,
        aiiName,
        aiiDept,
        aiiPosition,
        availableDate,
        contractType,
        jobHoursPerWeek,
        hourPayExpted,
        payCurrency,
      } = body;

      // console.log(
      //   '-----------------------sp_user_teacher_exam_action-----------------------'
      // );
      // console.log(examinationOne, publicExamOne, examYearOne, examResultOne);
      console.log('-----------------------sp_user_teacher_eductaion_action-----------------------');
      for (const education of teacherEdu) {
        console.log(education);
      }
      // console.log('-----------------------sp_user_teacher_debate_action-----------------------');
      // console.log(teacherDebateClub, teacherDebateYear, teacherDebateDetails);
      // console.log('-----------------------sp_user_teacher_award_action-----------------------');
      // console.log(teacherAward);
      // console.log('---------------------sp_user_teacher_qualification_action---------------------');
      // console.log(teacherQualification);
      // console.log('---------------------sp_user_teacher_certification_action---------------------');
      // console.log(teacherCertification);
      // console.log('-----------------------sp_user_teacher_exp_action-----------------------');
      // console.log(teachingExperience);

      let aiiNameValue = '';
      let aiiDeptValue = '';
      let aiiPositionValue = '';

      if (aii === 'Yes') {
        aiiNameValue = aiiName;
        aiiDeptValue = aiiDept;
        aiiPositionValue = aiiPosition;
      }
      // console.log('sp_user_teacher_additional_action');
      // console.log(
      //   guilty,
      //   guiltyText,
      //   discharged,
      //   dischargedText,
      //   enquiry,
      //   enquiryFullName,
      //   enquiryCompany,
      //   enquiryTitle,
      //   enquiryPhone,
      //   enquiryEmail,
      //   aii,
      //   aiiName,
      //   aiiDept,
      //   aiiPosition,
      //   aiiNameValue,
      //   aiiDeptValue,
      //   aiiPositionValue
      // );
      console.log(
        '----------------------------sp_user_teacher_avaliability_action----------------------------'
      );
      console.log(availableDate, contractType, jobHoursPerWeek, hourPayExpted, payCurrency);

      if (method === 'POST') {
        await teacherDb.createTeacher(
          action,
          positionAppliedFor,
          fullName,
          firstName,
          middleName,
          lastName,
          chineseName,
          userPhoto,
          nationality,
          dateOfBirth,
          placeOfBirth,
          teacherGender,
          location,
          addressDetails,
          timeZone,
          phoneNumber,
          countryCode,
          emailAddress,
          emergencyContactName,
          emergencyContactPhone,
          emergencyContactRelation,
          publicExam,
          examination,
          examYear,
          examResult,
          teacherEdu,
          teacherDebateClub,
          teacherDebateYear,
          teacherDebateDetails,
          teacherAward,
          teacherQualification,
          teacherCertification,
          teachingExperience,
          guilty,
          guiltyText,
          discharged,
          dischargedText,
          enquiry,
          enquiryFullName,
          enquiryTitle,
          enquiryCompany,
          enquiryPhone,
          enquiryEmail,
          aii,
          aiiNameValue,
          aiiDeptValue,
          aiiPositionValue,
          availableDate,
          contractType,
          jobHoursPerWeek,
          hourPayExpted,
          payCurrency
        );
      }

      return res.status(204).end();
    } catch (e) {
      return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
    }
  });
}
