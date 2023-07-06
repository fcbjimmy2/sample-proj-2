// data
import { cmsCommonDb } from '../../../database';
// API Guard
import { apiAuthGuard } from '../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET', 'PUT'], async (i18n, loggedInUser) => {        
        try{
            const { method, body } = req;
            if (method === 'GET') {
                const allCms = await cmsCommonDb.getAllCms();
                const termsOfService = allCms.find(element => element.cms_name === 'Terms of Service');
                const privacyPolicy = allCms.find(element => element.cms_name === 'Privacy Policy');
                return res.status(200).json({ 
                    termsOfService: {
                        en: termsOfService.en,
                        zh_Hant: termsOfService.zh_Hant,
                        zh_Hans: termsOfService.zh_Hans
                    },
                    privacyPolicy: {
                        en: privacyPolicy.en,
                        zh_Hant: privacyPolicy.zh_Hant,
                        zh_Hans: privacyPolicy.zh_Hans
                    }
                }); 
            } else if (method === 'PUT') {
                await cmsCommonDb.updateAllCms(body.termsOfService, body.privacyPolicy);
                return res.status(204).send();
            }  
        } catch(e) {
			return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
        }
    })
}
