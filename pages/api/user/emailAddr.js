// database
import {
    userDb
} from '../../../database'
// API Guard
import {
    apiAuthGuard
} from '../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default async function handler(req, res) {
    apiAuthGuard(req, res, ['GET'], async (i18n) => {
        const result = await userDb.allUser();
        var users = [];
        result.forEach((user) => {
            users.push({
                name: user.full_name,
                email: user.email,
                avatar: null
            })
        })
        return res.status(200).json(users);
    })
}