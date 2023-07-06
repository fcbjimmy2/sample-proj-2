// data
import { teacherDb } from '../../../../../database';
// API Guard
import { apiAuthGuard } from '../../../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET'], async (i18n, loggedInUser) => {        
        try{
            let data = await teacherDb.getTeachers() ;
            return res.status(200).json(data);
        } catch(e) {
			return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
        }
    })
}
