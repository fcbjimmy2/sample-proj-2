// data
import { lookupDb } from '../../../../database';
// API Guard
import { apiAuthGuard } from '../../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET'], async (i18n, loggedInUser) => {        
        try{
            let timeZones = await lookupDb.getLookupTimeZone();
            return res.status(200).json(timeZones);
        } catch(e) {
			return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
        }
    })
}