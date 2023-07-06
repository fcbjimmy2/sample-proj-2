import {
    filesDb,
} from '../../../database';

import {
    apiAuthGuard
} from '../../../src/utils/apiGuard';



export default async function handler(req, res) {
    apiAuthGuard(req, res, ['GET'], async (i18n, loggedInUser) => {
        if (req.method === 'GET') {
            try {
                const result = await filesDb.getPublicFolderId();

                return res.status(200).json(result);
            } catch (error) {
                console.log(error.message);
                return res.status(500).json({
                    message: error.message
                });
            }
        }
    })
}