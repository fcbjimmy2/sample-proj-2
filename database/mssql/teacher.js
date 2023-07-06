import { da } from 'date-fns/locale';
import { guidDb } from '..';

export default function (knex) {
  let center = 'CCBC-CC';
  let role = 'Admin';

  const getTeachers = async () => {
    const result = await knex.select('*').from('user_teacher');
    return result;
  };

  const createTeacher = async (
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
    teacherEdu = [],
    teacherDebateClub,
    teacherDebateYear,
    teacherDebateDetails,
    teacherAward = [],
    teacherQualification = [],
    teacherCertification = [],
    teachingExperience = [],
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
    payCurrency
  ) => {
    const guid = await guidDb.get_guid();
    console.log('GET GUID: ', guid);
    let trx = null;
    try {
      trx = await knex.transaction();

      //sp_user_teacher_action
      await trx.raw(
        'EXEC sp_user_teacher_action @action=?,@user_guid=?, @posistion=?, @full_name=?, @first_name=?, @middle_name=?, @last_name=?, @chinese_name=?, @user_photo=?, @nationality=?, @dob=?, @pob=?, @gender=?, @location=?, @address=?, @time_zone=?, @phone=?, @country_code=?, @email=?, @emergency_contact_name=?, @emergency_contact_no=?, @emergency_contact_relation=?,@center=?, @role=?',
        [
          action,
          guid,
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
          center,
          role,
        ]
      );

      //sp_user_teacher_exam_action
      await trx.raw(
        'EXEC sp_user_teacher_exam_action @action=?, @user_guid=?, @idx=?, @exam=?, @public_exam=?, @year=?, @result=?',
        [action, guid, 0, examination, publicExam, examYear, examResult]
      );

      const certificate = 'No certificate';

      //sp_user_teacher_eductaion_action

      for (const education of teacherEdu) {
        await trx.raw(
          'EXEC sp_user_teacher_eductaion_action @action=?, @user_guid=?, @idx=?, @school_name=?, @course=?, @datefrom=?, @dateto=?, @major=?, @certificate=?',
          [
            action,
            guid,
            0,
            education.teacherSchool,
            education.teacherCourse,
            education.schoolDateFrom,
            education.schoolDateTo,
            education.teacherMajor,
            certificate,
          ]
        );
      }

      // await trx.raw(
      //   'EXEC sp_user_teacher_eductaion_action @action=?, @user_guid=?, @idx=?, @school_name=?, @course=?, @datefrom=?, @dateto=?, @major=?, @certificate=?',
      //   [action, guid, 0, teacherSchool, teacherCourse, schoolDateFrom, schoolDateTo, teacherMajor, certificate]
      // );

      // sp_user_teacher_debate_action;
      await trx.raw(
        'EXEC sp_user_teacher_debate_action @action=?, @user_guid=?, @idx=?, @program=?, @year=?, @detail=?',
        [action, guid, 0, teacherDebateClub, teacherDebateYear, teacherDebateDetails]
      );

      //sp_user_teacher_award_action
      const upload = 'No upload';

      for (const award of teacherAward) {
        await trx.raw(
          'EXEC sp_user_teacher_award_action @action=?, @user_guid=?, @idx=?, @competition=?, @year=?, @result=?, @upload=?',
          [
            action,
            guid,
            0,
            award.teacherCompetition,
            award.teacherCompetitionYear,
            award.teacherCompetitionResult,
            upload,
          ]
        );
      }

      // await trx.raw(
      //   'EXEC sp_user_teacher_award_action @action=?, @user_guid=?, @idx=?, @competition=?, @year=?, @result=?, @upload=?',
      //   [
      //     action,
      //     guid,
      //     0,
      //     teacherCompetition,
      //     teacherCompetitionYear,
      //     teacherCompetitionResult,
      //     upload,
      //   ]
      // );

      //sp_user_teacher_qualification_action
      for (const qualification of teacherQualification) {
        await trx.raw(
          'EXEC sp_user_teacher_qualification_action @action=?, @user_guid=?, @idx=?, @qualification=?, @program=?, @organization=?, @date=?, @upload=?',
          [
            action,
            guid,
            0,
            qualification.teacherQual,
            qualification.teacherQualProgram,
            qualification.teacherQualOrganization,
            qualification.teacherQualDate,
            upload,
          ]
        );
      }

      // await trx.raw(
      //   'EXEC sp_user_teacher_qualification_action @action=?, @user_guid=?, @idx=?, @qualification=?, @program=?, @organization=?, @date=?, @upload=?',
      //   [
      //     action,
      //     guid,
      //     0,
      //     teacherQual,
      //     teacherQualProgram,
      //     teacherQualOrganization,
      //     teacherQualDate,
      //     upload,
      //   ]
      // );

      //sp_user_teacher_certification_action
      for (const certification of teacherCertification) {
        await trx.raw(
          'EXEC sp_user_teacher_certification_action @action=?, @user_guid=?, @idx=?, @certification=?, @program=?, @organization=?, @date=?, @upload=?',
          [
            action,
            guid,
            0,
            certification.teacherCert,
            certification.teacherCertProgram,
            certification.teacherCertOrganization,
            certification.teacherCertDate,
            upload,
          ]
        );
      }

      // await trx.raw(
      //   'EXEC sp_user_teacher_certification_action @action=?, @user_guid=?, @idx=?, @certification=?, @program=?, @organization=?, @date=?, @upload=?',
      //   [
      //     action,
      //     guid,
      //     0,
      //     teacherCert,
      //     teacherCertProgram,
      //     teacherCertOrganization,
      //     teacherCertDate,
      //     upload,
      //   ]
      // );

      //sp_user_teacher_exp_action
      for (const experience of teachingExperience) {
        await trx.raw(
          'EXEC sp_user_teacher_exp_action @action=?, @user_guid=?, @idx=?, @school=?, @year=?, @subject=?, @class_size=?, @age_group=?',
          [
            action,
            guid,
            0,
            experience.teachingExpSchool,
            experience.teachingExpYear,
            experience.teachingExpSubj,
            experience.teachingExpClassSize,
            experience.teachingExpAgeGp,
          ]
        );
      }

      // await trx.raw(
      //   'EXEC sp_user_teacher_exp_action @action=?, @user_guid=?, @idx=?, @school=?, @year=?, @subject=?, @class_size=?, @age_group=?',
      //   [
      //     action,
      //     guid,
      //     0,
      //     teachingExpSchool,
      //     teachingExpYear,
      //     teachingExpSubj,
      //     teachingExpClassSize,
      //     teachingExpAgeGp,
      //   ]
      // );

      //sp_user_teacher_additional_action
      const boolGuilty = guilty === 'Yes' ? true : false;
      const boolDischarged = discharged === 'Yes' ? true : false;
      const boolEnquiry = enquiry === 'Yes' ? true : false;
      const boolAii = aii === 'Yes' ? true : false;
      await trx.raw(
        'EXEC sp_user_teacher_additional_action @action=?, @user_guid=?, @idx=?, @guilty=?, @guilty_text=?, @discharged=?, @discharged_text=?, @enquiry=?, @enquiry_full_name=?, @enquiry_company=?, @enquiry_title=?, @enquiry_phone=?, @enquiry_email=?, @aii=?, @aii_name=?, @aii_dept=?, @aii_position=?',
        [
          action,
          guid,
          0,
          boolGuilty,
          guiltyText,
          boolDischarged,
          dischargedText,
          boolEnquiry,
          enquiryFullName,
          enquiryCompany,
          enquiryTitle,
          enquiryPhone,
          enquiryEmail,
          boolAii,
          aiiName,
          aiiDept,
          aiiPosition,
        ]
      );

      //sp_user_teacher_avaliability_action

      await trx.raw(
        'EXEC sp_user_teacher_avaliability_action @action=?, @user_guid=?, @idx=?, @avaliable_date=?,@classification=?,@avaliable_hours_week=?,@hour_pay=?,@currency=?',
        [action, guid, 1, availableDate, contractType, jobHoursPerWeek, hourPayExpted, payCurrency]
      );

      //sp_user_teacher_submit

      // await trx.raw('EXEC sp_user_teacher_submit @user_guid=?', [guid]);

      //sc_clear_user_teacher

      // await trx.raw('EXEC sc_clear_user_teacher'); when to use?

      await trx.commit();

      return {
        guid: guid,
      };
      // return { message: 'testing' };
    } catch (err) {
      console.log(err);
      if (trx && !trx.isCompleted()) {
        await trx.rollback();
      }
      throw err;
    }
  };

  return {
    getTeachers,
    createTeacher,
    // deleteTeacher,
  };
}
