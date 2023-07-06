// data
import { classDb } from '../../../../../database';
// API Guard
import { apiAuthGuard } from '../../../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET'], async (i18n, loggedInUser) => {        
        try{
            const {
                method,
                body,
                query
            } = req;
            console.log(query.startDate + ' ' + query.endDate);
            console.log(loggedInUser);
            let data = await classDb.getAllClasses(query.startDate, query.endDate, loggedInUser) ;
            return res.status(200).json(data);
        } catch(e) {
			return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
        }
    })
}
