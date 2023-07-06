// data
import { cmsCommonDb } from '../../database';
//
import { apiGuestGuard } from '../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
  apiGuestGuard(req, res, async (i18n)=>{
    const termsOfService = await cmsCommonDb.getTermsOfService();
    const data = termsOfService[i18n.getLocale().replace('-', '_')];
    return res.status(200).json(data);    
  })
}
