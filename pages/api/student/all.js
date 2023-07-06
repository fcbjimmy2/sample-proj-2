// database
import { studentDb } from '../../../database';
// API Guard
import { apiAuthGuard } from '../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default async function handler(req, res) {
  apiAuthGuard(req, res, ['GET'], async () => {
    try {
      const { method } = req;
      if (method === 'GET') {
        const response = await studentDb.getStudents();
        return res.status(200).json(response);
      }
    } catch (e) {
      return res.status(500).json({ message: 'unexpected-error-occurred' });
    }
  });
}
