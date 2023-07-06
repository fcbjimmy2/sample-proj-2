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
    const result = await userDb.allUser();
    return res.status(200).json(result);
}