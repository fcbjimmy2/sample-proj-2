import { guidDb } from '../';

export default function (knex) {
  const getStudents = async () => {
    const result = await knex.select('*').from('student');
    return result;
  };

  const createStudent = async (
    english_school,
    email,
    fullName,
    date_of_birth,
    mobile,
    proficiency_level_self,
    school,
    preferred_channel
  ) => {
    const guid = await guidDb.get_guid();

    const result = await knex.raw(
      'EXEC sp_user_student_registration @user_guid=?, @full_name=?, @dob=?, @school=?, @english_school=?, @proficiency_level_self=?, @preferred_channel=?, @student_phone=?, @email=?',
      [
        guid,
        fullName,
        date_of_birth,
        school,
        english_school,
        proficiency_level_self,
        preferred_channel,
        mobile,
        email,
      ]
    );

    return result;
  };

  return {
    getStudents,
    createStudent,
    // deleteStudent,
  };
}
