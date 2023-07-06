// database
import {
  opportunityDb
} from '../../../database'
// API Guard
import {
  apiAuthGuard
} from '../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default async function handler(req, res) {
  apiAuthGuard(req, res, ['PUT', 'DELETE'], async (i18n) => {
    try {
      const { method, body, query } = req;
      if (method === 'PUT') {
        await opportunityDb.linkOpportunity(body.contact, body.op_guid);
        return res.status(200).send();
      }
      if (method === 'DELETE') {
        await opportunityDb.unlinkOpportunity(body.contact, body.op_guid);
        return res.status(200).send();
      }
    } catch (e) {
        return res.status(500).json({ message: e.toString() });
    }
  });
}