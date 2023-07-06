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
  apiAuthGuard(req, res, ['GET'], async (i18n) => {
    try {
      const { method, body, query } = req;
      if (method === 'GET') {
        let opportunities = await opportunityDb.getOpportunities(query);
        return res.status(200).json(opportunities);
      }
    } catch (e) {
        return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
    }
  });
}