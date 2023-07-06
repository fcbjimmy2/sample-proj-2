// database
import { lookupDb } from '../../../../database';
// API Guard
import { apiAuthGuard } from '../../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default async function handler(req, res) {
  apiAuthGuard(req, res, ['GET'], async (i18n) => {
    try {
      const { method, body, query } = req;
      const { catergory, name } = query;
      if (method === 'GET') {
        let lookups = await lookupDb.getLookups(catergory, name);
        return res.status(200).json(lookups);
      }
    } catch (e) {
      return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
    }
  });
}


