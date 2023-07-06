import {
    filesDb,
} from '../../../database';

import {
    apiAuthGuard
} from '../../../src/utils/apiGuard';

export default async function handler(req, res) {
    apiAuthGuard(req, res, ['GET','POST'], async (i18n, loggedInUser) => {
        if (req.method === 'GET') {
            const result = await filesDb.getAllTags();
            return res.status(200).json(result);
        }
        if (req.method === 'POST') {
            try {
                const data = req.body;
                const {
                    id,
                    tags
                } = req.body;

                const result = await filesDb.updateFileTag(id, tags);

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