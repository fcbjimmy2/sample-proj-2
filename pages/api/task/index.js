// database
import {
  taskDb
} from '../../../database'
// API Guard
import {
  apiAuthGuard
} from '../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default async function handler(req, res) {
  apiAuthGuard(req, res, ['GET'], async (i18n) => {
    try {
      const { method, body, query } = req;
      if (method === 'GET') {
        let tasks = await taskDb.getTasks(query);
        return res.status(200).json(tasks);
      }
    } catch (e) {
        return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
    }
  });
}