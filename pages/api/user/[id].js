// database
import { userDb } from '../../../database'
// API Guard
import { apiAuthGuard } from '../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET'], async (i18n) => {
        let user = await userDb.getUserById(req.query.id);
        return res.status(200).json(user);
    });
}
