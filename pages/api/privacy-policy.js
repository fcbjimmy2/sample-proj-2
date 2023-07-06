// data
import { cmsCommonDb } from '../../database';
//
import { apiGuestGuard } from '../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
  apiGuestGuard(req, res, async (i18n)=>{  
    try {
      const privacyPolicy = await cmsCommonDb.getPrivacyPolicy();
      const data = privacyPolicy[i18n.getLocale().replace('-', '_')];
      return res.status(200).json(data);    
    } catch (e) {        
      return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
    }
  })
}
