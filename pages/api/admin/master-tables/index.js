// data
import { lookupDb } from '../../../../database';
// API Guard
import { apiAuthGuard } from '../../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET', 'POST'], async (i18n, loggedInUser) => {
        const { method, body } = req;
        try {
            if (method === 'GET') {
                const lookups = (await lookupDb.getLookupsByCatergory('lookup')).map(e => {
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
                return res.status(200).json(lookups);
            } else {
                const { name, value, en, zh_hant, zh_hans } = body;
                if (name && value, en, zh_hant, zh_hans) {
                    const foundLookup = (await lookupDb.getLookups('lookup', name)).find(element => element.value === value);
                    if (foundLookup) {
                        return res.status(400).json({ message: i18n.__('ID duplicated!') });
                    } else {
                        const insertId = await lookupDb.insertLookup('lookup', name, value, en, en, zh_hant, zh_hans);
                        return res.status(201).json({ idx: insertId });
                    }
                } else {
                    return res.status(400).json({ message: i18n.__('This field is required') });
                }
            } 
        } catch (e) {
            return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
        }
    });
}