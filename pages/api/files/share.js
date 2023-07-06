import {
    filesDb,
    userDb
} from '../../../database';

import {
    onlyofficeAuth,
    onlyofficeFile,
} from '../../../helper/onlyoffice';

import {
    apiAuthGuard
} from '../../../src/utils/apiGuard';


export default async function handler(req, res) {
    apiAuthGuard(req, res, ['POST'], async (i18n, loggedInUser) => {
        if (req.method === 'POST') {
            try {
                const data = req.body;
                const {
                    combined_id,
                    user_id,
                    access
                } = data;

                const combinedId = combined_id;
                const userId = user_id;

                const fileId = combinedId.split("_")[0];
                const onlyOfficeFileId = combinedId.split("_")[1];

                const result = await (access.toUpperCase() === "DELETE" ? filesDb.removeShareFile(fileId, userId) : filesDb.shareFile(fileId, userId, access));

                if (result.status === 'success') {

                    const userData = await userDb.getUserById(userId);
                    const onlyofficeUserId = userData.onlyoffice_id;
                    const onlyOfficeAccess = access.toUpperCase() === "EDIT" ? "1" : (access.toUpperCase() === "VIEW" ? 2 : 3);

                    const token = await onlyofficeAuth.getAuthToken();
                    const shared = await onlyofficeFile.shareFile(token, onlyOfficeFileId, onlyofficeUserId, onlyOfficeAccess, fileId);

                    const latestShared = await filesDb.getSharedByFileId(fileId, combinedId);

                    return res.status(200).json(latestShared);
                } else {
                    return res.status(500).json({
                        message: result.message
                    });
                }
            } catch (error) {
                console.log(error.message);
                return res.status(500).json({
                    message: error.message
                });
            }
        }
    })
}