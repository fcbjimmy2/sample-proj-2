// data
import { lookupDb } from '../../../../database';
// API Guard
import { apiAuthGuard } from '../../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET'], async (i18n, loggedInUser) => {
        const { method, body } = req;
        try {
            const lookup_masters = (await lookupDb.getLookupMasters()).map(e => {
                return {
                    value: e['name'],
                    text: e['lang_' + i18n.getLocale().replace('-', '_').toLowerCase()]
                }
            });                
            return res.status(200).json(lookup_masters);
        } catch (e) {
            return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
        }
    });
}