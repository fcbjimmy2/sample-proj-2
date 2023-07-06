// data
import { teachingTeamDb, customerSaysDb } from '../../database';
//
import { apiGuestGuard } from '../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
  apiGuestGuard(req, res, (i18n)=>{
    const data = {
      teachingTeam: teachingTeamDb.getTeachingTeam(),
      customerSays: customerSaysDb.getCustomerSays()
    }
    return res.status(200).json(data);    
  })
}
