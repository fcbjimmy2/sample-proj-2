// data
import { lookupDb } from '../../../../database';
// API Guard
import { apiAuthGuard } from '../../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET', 'PUT', 'DELETE'], async (i18n, loggedInUser) => {
        const { method, body, query } = req;
        const { idx } = query;
        try {
            if (method === 'GET') {
                const lookup = (await lookupDb.getLookupByCatergory('lookup', idx)).map(e => {
                    return {
                        idx: e['idx'],
                        catergory: e['catergory'],
                        name: e['name'],
                        name_text: e['name_lang_' + i18n.getLocale().replace('-', '_').toLowerCase()],
                        value: e['value'],
                        text: e['text'],
                        lang_en: e['lang_en'],
                        lang_zh_hant: e['lang_zh_hant'],
                        lang_zh_hans: e['lang_zh_hans']
                    }
                }); 
                return res.status(200).json(lookup);
            } else if (method === 'PUT') {
                const { en, zh_hant, zh_hans } = body;
                await lookupDb.updateLookupByCatergory('lookup', idx, en, en, zh_hant, zh_hans);
                return res.status(204).send();
            } else if (method === 'DELETE') {
                await lookupDb.deleteLookupByCatergory('lookup', idx);
                return res.status(204).send();
            } 
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
        }
    });
}
