// database
import { userDb } from '../../../../database'
// API Guard
import { apiAuthGuard } from '../../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET'], async (i18n) => {
        let users = await userDb.getUsersByRole(req.query.role);
        return res.status(200).json(users);
    });
}
