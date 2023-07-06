import { studentDb } from '../../../../database';

import { apiAuthGuard } from '../../../../src/utils/apiGuard';

export default async function handler(req, res) {
  apiAuthGuard(req, res, ['POST'], async () => {
    try {
      const { method, body } = req;
      const {
        english_school,
        email,
        fullName,
        date_of_birth,
        mobile,
        proficiency_level_self,
        school,
        preferred_channel,
      } = body;

      if (method === 'POST') {
        await studentDb.createStudent(
          english_school,
          email,
          fullName,
          date_of_birth,
          mobile,
          proficiency_level_self,
          school,
          preferred_channel
        );
      }

      return res.status(204).json({ message: 'successfully created student' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        message: error.message,
      });
    }
  });
}
