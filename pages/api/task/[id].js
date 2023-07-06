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
  apiAuthGuard(req, res, ['GET', 'POST', 'DELETE'], async (i18n) => {
    try {
      const { method, body } = req;
      const id = req.query.id;
      if (method === 'GET') {
        let task = await taskDb.getTask(id);
        return res.status(200).json(task);
      } else if (method === 'POST') {
        let task = await taskDb.updateTask(id, body);
        return res.status(204).send();
      } else if (method === 'DELETE') {
        await taskDb.deleteTask(id);
        return res.status(204).send();
      }
    } catch (e) {
        return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
    }
  });
}